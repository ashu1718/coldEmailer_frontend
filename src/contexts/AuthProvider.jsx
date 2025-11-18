import React, { createContext, useState, useEffect } from "react";
import {  clearTokens } from "../utils/token";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Optionally, fetch current user if token exists
    const init = async () => {
      const access = localStorage.getItem("access");
      if (access) {
        try {
          const resp = await api.get("/api/user/me/"); // provide endpoint in backend
          setUser(resp.data);
        } catch (err) {
          // token invalid/expired — rely on interceptor to refresh if possible
          setUser(null);
        }
      }
      setReady(true);
    };
    // init();
  }, []);

  const signout = () => {
    clearTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signout, ready }}>
      {children}
    </AuthContext.Provider>
  );
}
