import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin = false }) => {  // Check if admin is authenticated or user is authenticated
  if (requireAdmin) {
    const adminToken = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');

    console.log('ProtectedRoute - adminToken:', !!adminToken);
    console.log('ProtectedRoute - adminUser:', adminUser);

    if (!adminToken || !adminUser) {
      console.log('ProtectedRoute - No token or user, redirecting to login');
      // Redirect to admin login if not authenticated
      return <Navigate to="/signin" replace />;
    }
    try {
      const user = JSON.parse(adminUser);
      console.log('ProtectedRoute - User role:', user.role);
      if (user.role !== 'admin' && user.role !== 'super_admin') {
        console.log('ProtectedRoute - Invalid role, redirecting to login');
        // Redirect to admin login if not admin or super admin
        return <Navigate to="/signin" replace />;
      }
    } catch (error) {
      console.error('ProtectedRoute - Error parsing user:', error);
      // Invalid user data, redirect to login
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      return <Navigate to="/signin" replace />;
    }
  }
  else {
    // check if user is authenticated
    const user = localStorage.getItem('user');
    const userToken = localStorage.getItem('token');

    if (!userToken || !user) {
      console.log("ProtectedRoute - No token or user, redirecting to user signin");
      // Redirect to user signin if not authenticated
      return <Navigate to="/signin" replace />;
    }
  }
  console.log('ProtectedRoute - Access granted');
  return children;
};

export default ProtectedRoute;
