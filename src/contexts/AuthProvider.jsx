import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [gmailConnected, setGmailConnected] = useState(false);

  // Read token from localStorage at startup
  const token = localStorage.getItem("access");

  const refreshAuthStatus = async () => {
    const access = localStorage.getItem("access");

    if (!access) {
      setIsLoggedIn(false);
      setGmailConnected(false);
      setLoading(false);
      return;
    }

    setIsLoggedIn(true);

    try {
      const res = await api.get("/api/v1/cold-emailer/gmail-connection-status");
      setGmailConnected(res.data.gmail_connected);
    } catch (e) {
      setGmailConnected(false);
    }

    setLoading(false);
  };

  // Run once at startup
  useEffect(() => {
    refreshAuthStatus();
  }, []);

  const refreshStatus= async ()=>{
    await refreshAuthStatus();
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        gmailConnected,
        loading,
        refreshStatus,
        refreshAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
