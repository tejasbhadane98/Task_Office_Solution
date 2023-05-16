import React, { useState } from "react";
import {  Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./home.css"

export default function Home(){
    let user = JSON.parse(localStorage.getItem("user"));
    // console.log(user.email);
    const userName= user.email.split("@")[0]
    console.log(userName);
    const navigate = useNavigate();

    const logOutHandler=()=>{
        console.log("Logout Called");
        localStorage.clear()
        navigate("/")
    }
    return(
        <>
        <div className="dashboard">
            
            <nav className="middle">
            <span className="head">Dashboard</span>
                <section>
                
                    <img id="img-2" src={require("../../Images/person.png")} alt="logo"/>
                    <select className="username" onChange={()=>logOutHandler()}>
                        <option className="username" select >{userName}</option>
                        <option>Logout</option>
                    </select>
                </section>
            </nav>
            
        </div>
        </>
    )
}