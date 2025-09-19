import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // For now, we'll assume user is authenticated
  // You can implement proper authentication logic here
  const isAuthenticated = true; // This should check actual auth state
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;