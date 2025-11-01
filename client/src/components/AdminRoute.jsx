import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Added a comment to force re-compilation


const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner/loader component
  }

  if (user && user.role === 'admin') {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;