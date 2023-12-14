const mongoose=require("mongoose")
const {Schema}=mongoose;

let UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },

    username:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    mySale:[{ type : mongoose.Types.ObjectId, ref: 'Caritem' }],

    myFav:[{type : mongoose.Types.ObjectId, ref: 'Caritem'}],

    myPurchase:[{type : mongoose.Types.ObjectId, ref: 'Caritem'}]

})

module.exports=mongoose.model("user",UserSchema);