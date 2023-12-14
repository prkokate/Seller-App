require("dotenv").config()
const JWT_SECRET=process.env.JWT_SECRET
const jwt =require('jsonwebtoken')


const fetchuser=(req,res,next)=>{
    const token=req.header("auth-token")
    if(!token){
        res.status(401).send("Authentication failed!")
    }

    try{
        const decoded= jwt.verify(token,JWT_SECRET);
        req.user=decoded.user;
        console.log(decoded)
        next()

    }
    catch(err){
        res.status(400).send({error:"Invalid Token!"})
    }
}

module.exports=fetchuser