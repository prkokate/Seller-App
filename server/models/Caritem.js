const mongoose=require("mongoose")
const {Schema}=mongoose;

let CarSchema=new Schema({
    brand:{
        type:String,
        required:[true,"Brand is required"]
    },

    year:{
        type:Number,
        minlength:4,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    passenger:{
        type:Number,
        required:true
    },

    type:{
        type:String,
        required:true
    },

    gear:{
        type:String,
        required:true
    },

    image:{
        type:String,
        required:true
    },
    available:{
        type:Boolean,
        required:true,
        default:true
    },

    owner:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },

    curUser:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },

    startDate:{
        type:Date,
    },
    endDate:{
        type:Date
    }
})

// {
//     "id": 1,
//     "brand": "Cadillac",
//     "year": 2018,
//     "price": 489,
//     "passenger": 2,
//     "type": "gasoline",
//     "gear" : "manual",
//     "image" : "https://images.unsplash.com/photo-1589148938909-4d241c91ee52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FkaWxsYWN8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
//   }

module.exports=mongoose.model("car",CarSchema);