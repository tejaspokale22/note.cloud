// src/components/PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  // Fetch user data and authentication status from Redux state
  const user = useSelector((state) => state.auth.userData);
  
  // Fetch the authToken directly from localStorage
  const token = localStorage.getItem('authToken');

  // If no user is authenticated or if the token is missing, redirect to the login page
  if (!user || !token) {
    return <Navigate to="/login" />;
  }

  // If authenticated and token exists, render the protected route components
  return children;
}

export default PrivateRoute;
