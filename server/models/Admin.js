const mongoose=require("mongoose")
const {Schema}=mongoose;

let AdminSchema=new Schema({
    name:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    mySale:[{ type : mongoose.Types.ObjectId, ref: 'Caritem' }]
})

module.exports=mongoose.model("admin",AdminSchema);