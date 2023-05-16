const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/TASK_Office_Solution")
.then(()=>{
    console.log("Connected To the Database");
})
.catch((err)=>{console.log(err);})
   


const user = require("./routes/user");
app.use(user)

app.listen(8000,()=>{
    console.log("Server is running at port no 8000");
})