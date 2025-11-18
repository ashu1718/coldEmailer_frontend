import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

export default function ProtectedRoute({ children }) {
   const token = localStorage.getItem("access");

   if (!token) {
     return <Navigate to="/login" replace />;
   }

   return children;
}
