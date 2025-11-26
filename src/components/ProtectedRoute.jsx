import React from 'react';
import { Navigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useMockData();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
