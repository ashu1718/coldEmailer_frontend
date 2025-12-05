import React, { useState  } from "react";
import { Input, Button, Card } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import "../styles/Signup.css";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
// import { AuthContext } from "../contexts/AuthProvider";
import msg from "../utils/toast";
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate= useNavigate();
  
  async function handleSignUp(){
    if(password!==confirmPassword){
      msg.error("Pay Attention!! Passwords Doesn't match.")
      return ;
    }
    try{
      const data = await signup({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        username: email,
      });
      msg.success("Sign Up Success!! Welcome to ColdEmailer")
      navigate("/login");
    }
    catch(e){
      msg.error("Sign Up Failed.")
      const msg= e?.response?.data || "signup failed";
      alert(msg);
    }
  }

  return (
    <div id="signup-page">
      <Card className="signup-card" bordered={false}>
        <h1 className="signup-heading">Create Account </h1>
        <p className="signup-subheading">Join us and get started today</p>

        <div className="input-field-div">
          <Input
            prefix={<UserOutlined />}
            className="input-field"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="input-field-div">
          <Input
            prefix={<UserOutlined />}
            className="input-field"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="input-field-div">
          <Input
            prefix={<MailOutlined />}
            className="input-field"
            placeholder="Email Address"
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

        <div className="input-field-div">
          <Input.Password
            prefix={<LockOutlined />}
            className="input-field"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <Button
          type="primary"
          icon={<LoginOutlined />}
          className="signup-button"
          block
          onClick={handleSignUp}
        >
          Sign Up
        </Button>

        <p className="signup-footer">
          Already have an account?{" "}
          <a href="#" onClick={() => navigate("/login")}>
            Login
          </a>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
