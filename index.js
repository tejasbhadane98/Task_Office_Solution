const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV !== "production"){
    require("dotenv").config({path:"config.env"})
}
mongoose.connect(
    process.env.MONGO_URI
).then(() => console.log('Connected To the Database'));
// .catch((err)=>{console.log(err);})
   


const user = require("./routes/user");
app.use(user)

app.listen(3000,()=>{
    console.log("Server is running at port no 3000");
})