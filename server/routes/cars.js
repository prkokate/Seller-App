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
    try{
        const carArr=await Cars.find();
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

router.put("/add-favorite/:id",fetchuser,async(req,res)=>{
    let curuser=await User.findById(req.user.id)
    //console.log(curuser);
    if(!curuser.myFav || !curuser.myFav.includes(req.params.id)){
        curuser=await User.findByIdAndUpdate(req.user.id,{"myFav":[...curuser.myFav,req.params.id]})
        res.json(curuser.myFav);
    }
    else{
        res.json({error:"Already in favorites"});
    }
})

router.post("/rent-car/:id",fetchuser,async(req,res)=>{
    let thecar=await Cars.findById(req.params.id);
    let curuser=await User.findById(req.user.id)
    
   try{
        if(thecar.available===true){
        thecar=await Cars.findByIdAndUpdate(req.params.id,{$set:{available:false,curUser:req.user.id}},{upsert:false,multi:false})
        thecar.available=false;
        
        var curdate=new Date();
        var end=new Date();
        end.setDate(curdate.getDate()+req.body.days)

        curuser=await User.findByIdAndUpdate(req.user.id,{$set:{"myPurchase":[...curuser.myPurchase,req.params.id],startDate:curdate,endDate:end}})
        if(curuser.myFav.includes(req.params.id)){
            //Logic to remove the req.params.id from myFav list...
            await User.findByIdAndUpdate(req.user.id,{"myFav":curuser.myFav.remove(req.params.id)})
        }

        res.json({success:"Booked successfully!"})
    }
    else{
        res.json({faliure:"Car not available!"})
    }
}catch(err){
    console.log(err);
    res.status(500).send("Baddest request!");
}
})


//list-car
router.post("/list-car",fetchuser,async(req,res)=>{
    const {brand,year,price,passenger,type,gear,image}=req.body;
   try{

    let curuser=await User.findById(req.user.id);

   
    const listCar=await Caritem.create({
        brand:brand,
        year:year,
        price:price,
        passenger:passenger,
        type:type,
        gear:gear,
        image:image,
        owner:req.user.id,
        available:true
    })

    console.log(listCar._id)
    await User.findByIdAndUpdate(req.user.id,{"mySale":[...curuser.mySale,listCar._id]});

    res.json(listCar)


}catch(err){
    console.log(err);
    return res.status(400).json({error:"Internal server error!"});
}
})



module.exports=router