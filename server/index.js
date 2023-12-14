const express=require("express")
const app=express();

const cors=require("cors")

app.use(cors());
app.use(express.json())

const MongoConnect=require("./db")
MongoConnect();

const port=8000


app.use("/api/auth/",require("./routes/auth"));
app.use("/api/cars/",require("./routes/cars"));

app.listen(port,()=>{
  console.log("Server started at port",port);
})