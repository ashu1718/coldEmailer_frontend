import React from "react";
// import axios from "axios";
import { Button } from "antd";
import api from "../api/axios";
const GoogleAuthPage=()=>{
    const token = localStorage.getItem("access");
    const handleGmailConnect= async ()=>{
      try{
        const res = await api.get("/api/v1/cold-emailer/google/login/");
        
        window.location.href= res.data.auth_url;
      }
      catch(err){
        console.log("Error Loggin in GOOGLE", err);
        
      }
    }
    return (
      <>
      
      <Button
        type="primary"
        onClick={handleGmailConnect}
        >
        Connect Gmail
      </Button>
      </>
    );
}
export default GoogleAuthPage;