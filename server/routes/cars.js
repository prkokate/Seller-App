const express=require("express")
const router=express.Router();
const jwt=require("jsonwebtoken")
require("dotenv").config();
JWT_SECRET=process.env.JWT_SECRET
const bcrypt=require("bcryptjs")
let User = require('../models/User');
let Admin=require("../models/Admin")
let Cars=require("../models/Caritem")
const fetchuser=require("../middleware/fetchuser");
const Caritem = require("../models/Caritem");

let success=false;

router.get("/all-cars",async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', 'https://seller-app-ebon.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    try{
        const carArr=await Cars.find();
        //console.log(carArr)
        res.json(carArr)
    }
    catch(err){
        res.status(500).send("bad request");
    }
})

router.get("/my-favorites",fetchuser,async(req,res)=>{
    try{
    let curuser=await User.findById(req.user.id)
    let carFav=curuser.myFav;
    let carArr=[]
    for(i=0;i<carFav.length;i++){
        var item= await Cars.findById(carFav[i])
        carArr.push(item);
    }
    res.json(carArr);
}catch(err){
    console.log(err)
    res.status(500).send("Baddest request!")
}
})


router.get("/getFavList",fetchuser,async(req,res)=>{
    try{
        const curuser=await User.findById(req.user.id);
        let arr=curuser.myFav?curuser.myFav:[];

        res.json(arr);
        
    }
    catch(err){
        console.log(err);
        return  res.status(400).send("Bad Request!");
    }
})

router.put("/add-favorite/:id",fetchuser,async(req,res)=>{
    try{
        let curuser=await User.findById(req.user.id)
    //console.log(req.params.id);
    if(!curuser.myFav || !curuser.myFav.includes(req.params.id)){
        await User.findByIdAndUpdate(req.user.id,{"myFav":[...curuser.myFav,req.params.id]})
        success=true;
        res.json(success);
    }
    else{
        success=false;
        res.json(success)
    }}
    catch(err){
        console.log("ERROR-Ahe-re:",err);
        success=false
        res.status(400).json(success)
    }
})


router.put("/remove-favorite/:id",fetchuser,async(req,res)=>{
    try{
        let curuser=await User.findById(req.user.id)
    //console.log(req.params.id);
    if(curuser.myFav && curuser.myFav.includes(req.params.id)){
        const ind=curuser.myFav.indexOf(req.params.id);
        if(ind>-1){
            curuser.myFav.splice(ind,1);
        }
        await User.findByIdAndUpdate(req.user.id,{$set:{"myFav":curuser.myFav}})
        success=true;
        res.json(success);
    }
    else{
        success=false;
        res.json(success)
    }}
    catch(err){
        console.log("ERROR-Ahe-re:",err);
        success=false
        res.status(400).json(success)
    }
})

router.post("/rent-car/:id",fetchuser,async(req,res)=>{
    let thecar=await Cars.findById(req.params.id);
    let curuser=await User.findById(req.user.id)
    
   try{
        if(thecar.available===true){

            if(thecar.owner===curuser._id){
                success=false
                let message="Cannot rent own car!";
                console.log(message)
                res.json(success,message)
            }

        var curdate=new Date();
        var end=new Date();
        //console.log("days=",req.body.days)
        end.setDate(curdate.getDate()+req.body.days)
        //console.log("end=",end)

        thecar=await Cars.findByIdAndUpdate(req.params.id,{$set:{available:false,curUser:req.user.id,startDate:curdate,endDate:end}},{upsert:false,multi:false})
        thecar.available=false;

     

        curuser=await User.findByIdAndUpdate(req.user.id,{$set:{"myPurchase":[...curuser.myPurchase,req.params.id]}})
        if(curuser.myFav.includes(req.params.id)){
            //Logic to remove the req.params.id from myFav list...
            await User.findByIdAndUpdate(req.user.id,{"myFav":curuser.myFav.remove(req.params.id)})
        }
        console.log("rented")
        success=true
        res.json(success)
    }
    else{
        success=false
        res.json(success)
    }
}catch(err){
    console.log("ERROR!:",err);
    success=false
    res.status(500).json(success);
}
})


//list-car
router.post("/list-car",fetchuser,async(req,res)=>{
    const {brand,year,price,passenger,type,gear,image}=req.body;
   try{

    let curuser=await User.findById(req.user.id);

   
    const listCar=await Caritem.create({
        id:101,
        brand:brand,
        year:year,
        price:price,
        passenger:passenger,
        type:type,
        gear:gear,
        image:image,
        owner:req.user.id,
        curUser:null,
        available:true
    })

    //console.log(listCar._id)
    await User.findByIdAndUpdate(req.user.id,{"mySale":[...curuser.mySale,listCar._id]});

    res.json(listCar)


}catch(err){
    console.log(err);
    return res.status(400).json({error:"Internal server error!"});
}
})


// function removeElem()

router.put("/make-available",async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', 'https://seller-app-ebon.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    try{
        let rented=await Caritem.find({available:false})

        
        let curdate=new Date()
        for(i=0;i<rented.length;i++){
            if(rented[i].endDate<=curdate){
                console.log(rented[i].brand);
                await Caritem.findByIdAndUpdate(rented[i]._id,{$set:{available:true,startDate:null,endDate:null,curUser:null}})
                let curuser=await User.findOne({myPurchase:rented[i]._id});
                let ind=curuser.myPurchase.indexOf(rented[i]._id);
                curuser.myPurchase.splice(ind,1);
                
                await User.findOneAndUpdate({myPurchase:rented[i]._id},{$set:{myPurchase:curuser.myPurchase}})
            }
        }

        res.json({success:"make available succesfull!"})
    }
    catch(err){
        console.log(err);
        res.status(400).send("Internal server error!")
    }
})




module.exports=router