import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the token exists in localStorage
  const token = localStorage.getItem('token');
  
  if (!token) {
    // If no token, redirect to Login page
    return <Navigate to="/login" replace />;
  }

  // If token exists, allow access to the page
  return children;
};

export default ProtectedRoute;