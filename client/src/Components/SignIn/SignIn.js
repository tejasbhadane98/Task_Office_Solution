import React, { useState } from "react";
import {  Link } from "react-router-dom";
import "./signin.css"
import { useNavigate } from "react-router-dom";


export default function Signin()
{
  const navigate =useNavigate()
  const [email,setEmail] = useState("")
  const [password,SetPassword] = useState("")
  const SignInHandler = (e) => {
    e.preventDefault()
    // console.log(email, password)
    fetch("http://localhost:3000/signIn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email, password
        })
    }).then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error)
            }
            else {
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                alert(data.message)
                navigate("/home")
            }
        })
}

    return (
        <>
         <div  className='container'>
        <div className='main'>
      <section className='logo'>
        {/* <img  id="log" src={require("../../Images/logo.jpg")} alt='logo'/> */}
       <h1>Office Solution</h1>
        </section> 
        <h2>Enter your credentials to access your account</h2> 

        <div className='email'>
            <input id="em" type="email"  placeholder='User Id' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>  
            <div className='pwd'>
            <input  id="pw" type="Password"  placeholder="Password"  name='password' value={password} onChange={(e)=>SetPassword(e.target.value)}/>
            </div> 
          
            <div className='btn'>
               <button className="bt" onClick={(e)=>SignInHandler(e)}>Sign in</button>
               <button className="bt"> <Link to="/Signup"  className="a1">Sign Up</Link> </button>
            </div>
            
          </div>
         
         </div>
        </>
    )
}