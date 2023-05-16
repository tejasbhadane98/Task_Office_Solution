const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

if(process.env.NODE_ENV !== "production"){
    require("dotenv").config({path:"config.env"})
}
mongoose.connect(
    process.env.MONGO_URI
).then(() => console.log('Connected To the Database'));
// .catch((err)=>{console.log(err);})
   


const user = require("./routes/user");
app.use(user)

app.listen(8000,()=>{
    console.log("Server is running at port no 8000");
})