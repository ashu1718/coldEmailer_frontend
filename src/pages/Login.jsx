import React, { useState, useContext } from "react";
import { Input, Button, Card } from "antd";
import { LockOutlined, MailOutlined, LoginOutlined } from "@ant-design/icons";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAuth} from "../contexts/AuthProvider";
import msg from "../utils/toast";
const Login = () => {
  const navigate= useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {refreshStatus} = useAuth();
  async function handleLogin(){
    try{
      const data= await login(email, password);
      await refreshStatus();
      msg.success("Logged In Successfully!")
      navigate("/google-auth");
    }
    catch(err){
      if(err?.response?.status===401){
        msg.error("Invalid Credentials.")
      }
      else{
        msg.error("Login Failed. Please Try Again.")
      }
      console.log(err);
      
    }
  }
  return (
    <div id="login-page">
      <Card className="login-card" bordered={false}>
        <h1 className="login-heading">Welcome Back 👋</h1>
        <p className="login-subheading">Please sign in to continue</p>

        <div className="input-field-div">
          <Input
            prefix={<MailOutlined />}
            className="input-field"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-field-div">
          <Input.Password
            prefix={<LockOutlined />}
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          type="primary"
          icon={<LoginOutlined />}
          className="login-button"
          block
          onClick={handleLogin}
        >
          Login
        </Button>

        <p className="login-footer">
          Don’t have an account? <a href="#" onClick={()=> navigate("/signup")}>Sign up</a>
        </p>
      </Card>
    </div>
  );
};

export default Login;
