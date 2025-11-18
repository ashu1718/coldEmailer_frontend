import React  from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
   const token = localStorage.getItem("access");

   if (token) {
     return <Navigate to="/google-auth" replace />;
   }

   return children;
}
