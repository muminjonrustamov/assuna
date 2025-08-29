import React from 'react';
import { Navigate } from 'react-router-dom';
import SHA256 from 'crypto-js/sha256';

const ProtectedRoute = ({ children }) => {
  const expectedToken = SHA256('adminassuna01').toString();
  const token = localStorage.getItem('token');

  return token === expectedToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;