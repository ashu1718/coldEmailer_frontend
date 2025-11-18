import React from "react";
import { Button } from "antd";
const LandingPage=()=>{
    const token = localStorage.getItem("access");
    return (
      <>
      <h1>hiii</h1>
      <Button
        type="primary"
        onClick={() => {
          window.location.href = `http://localhost:8000/api/v1/cold-emailer/google/login/?token=${token}`;
        }}
        >
        Connect Gmail
      </Button>
      </>
    );
}
export default LandingPage;