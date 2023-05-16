const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/signUp", async(req,res)=>{
    try{
        const {email, password, confirmPassword}=req.body;
        let user = await User.findOne({email});
        if(user){
            return res.json({error:"User Alredy Exists"})
        }
        if(password!==confirmPassword){
            return res.json({
                error:" Password and Confirm Password Does not match!"
            })
        }
        user = await User.create({
            email:email,
            password:password
        })
        res.json({user, message:"Account Created Successfully"})
    }
    catch(error){
        res.json({
            message:error.message
        })
    }
   
});

router.post("/signIn", async(req, res)=>{
    try{
        let {email, password} = req.body
        let user = await User.findOne({email});
        if(!user){
            return res.json({
                error: "User Does Not Exists"
            })
        }
        if(password!==user.password){
            return res.json({
                error:"Incorrect Password"
            })
        }
        let token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
        res.json({user,token, message:"Logged In Successfully"})
    }
    catch(error){
        res.json({
            message:error.message
        })
    }
})

module.exports = router;