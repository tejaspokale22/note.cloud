// src/components/PrivateRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const isJwtExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

function PrivateRoute({ children }) {
  const user = useSelector((state) => state.auth.userData);
  const token = localStorage.getItem("authToken");

  if (!token || isJwtExpired(token)) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
