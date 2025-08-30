import React from 'react';
import { Navigate } from 'react-router-dom';

const StudentProtectedRoute = ({ children }) => {
  // Check if student is authenticated
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userToken = localStorage.getItem('userToken'); // For more robust auth
  
  console.log('StudentProtectedRoute - isLoggedIn:', isLoggedIn);
  
  if (!isLoggedIn) {
    console.log('StudentProtectedRoute - Not logged in, redirecting to signin');
    // Redirect to signin if not authenticated
    return <Navigate to="/signin" replace />;
  }

  console.log('StudentProtectedRoute - Access granted');
  return children;
};

export default StudentProtectedRoute;
