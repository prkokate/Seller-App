const express=require("express")
const app=express();

const cors=require("cors")

app.use(cors({
  origin:["https://seller-app-ebon.vercel.app/"],
  methods:["POST","GET","PUT"],
  credentials:true
}));
app.use(express.json())

const MongoConnect=require("./db")
MongoConnect();

const port=8000
app.get("/",(req,res)=>{
  res.json("hello")
})

app.use("/api/auth/",require("./routes/auth"));
app.use("/api/cars/",require("./routes/cars"));

app.listen(port,()=>{
  console.log("Server started at port",port);
})