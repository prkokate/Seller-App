const express=require("express")
const app=express();

const cors=require("cors")

app.use(cors({
  origin:["https://seller-app-ebon.vercel.app"],
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

// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'https://seller-app-ebon.vercel.app/');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

app.use("/api/auth/",require("./routes/auth"));
app.use("/api/cars/",require("./routes/cars"));

app.listen(port,()=>{
  console.log("Server started at port",port);
})