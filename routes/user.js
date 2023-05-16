const express= require("express")
const User= require("../models/User")

const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const bodyparser = require("body-parser");

const router= express.Router();
const jwt = require("jsonwebtoken")

router.post("/signUp",
    body('email').isEmail(),
    body('password').isLength({ min: 8, max: 16 }),
    body('confirmpassword').isLength({ min: 8, max: 16 }),async (req, res) => {
    try {
        // console.log(req.body)
        let {email, password, confirmpassword} = req.body
        let user = await User.findOne({email})
        if(user){
            return res.json({error:"User already exits"})
        };
        if(password !== confirmpassword){
            return res.json({
                error:"Password and confirm password does not match"
            })
        }
        const error = validationResult(req);
        if (!error.isEmpty()) {
            // console.log("sign up error called",errors,req.body.confirmpassword)
            return res.status(400).json({ error: "Minimum length of password should be 8" });
        }
        bcrypt.hash(password, 10, async function(err, hash){ 
            if (err) {
                return res.status(500).json({
                    status: "Failed",
                    message: err.message
                })
            }

            user= await User.create({
                
                email: email,                        // It will return the user value in these format
                password: hash
            })
            res.json({user, message:"Account created Successfully"})


        })

       
    } catch (error) {
        res.json({
            messgae:error.message
        })
    }

})

router.post("/signIn",
body('email').isEmail(),
async (req,res)=>{

    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "Email is not valid" });
        }


        let {email, password} = req.body
        let user = await User.findOne({email})
        if(!user){
           return res.json({
                error:"User does not exists"
            })
        } 

  

        bcrypt.compare(password, user.password, function(err, result){
            if(err){
                return res.status(500).json({
                    status:"Failed",
                    message:err.message
                })
            }
            if(result){
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
                res.json({user,token, message:"LoggedIn Succesfully"})
            }
            else if(password!=user.password){
                return res.status(405).json({
                    error:"Incorrect Password"
                })
            }
        })
        

    } catch (error) {
        res.json({
            messgae:error.message
        })
    }

})


module.exports = router