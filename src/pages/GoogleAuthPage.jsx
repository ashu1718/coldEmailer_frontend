import React from "react";
import { Button } from "antd";
import api from "../api/axios";
import "../styles/GoogleAuthPage.css";
const GoogleAuthPage = () => {
  const handleGmailConnect = async () => {
    try {
      const res = await api.get("/api/v1/cold-emailer/google/login/");
      window.location.href = res.data.auth_url;
    } catch (err) {
      console.log("Error Logging in GOOGLE", err);
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-card-modern">
        <h2 className="auth-title">Connect Your Gmail</h2>
        <p className="auth-description">
          Authorize your Google account to start sending emails instantly.
        </p>

        <Button
          type="primary"
          className="connect-btn"
          onClick={handleGmailConnect}
        >
          Connect Gmail
        </Button>
      </div>
    </div>
  );
};

export default GoogleAuthPage;
