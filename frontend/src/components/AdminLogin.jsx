import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../../api/auth';
import './AdminLogin.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', formData);
      const response = await signin(formData);
      console.log('Login response:', response);
      
      // Check if user has admin role
      if (response.user && (response.user.role === 'admin' || response.user.role === 'super_admin')) {
        console.log('Admin login successful, redirecting to:', '/admin-job-posting');
        console.log('User role:', response.user.role);
        // Token and user info are already stored in auth.js
        // Redirect to admin dashboard
        navigate('/admin-job-posting');
        
        // Fallback navigation if React Router doesn't work
        setTimeout(() => {
          if (window.location.pathname !== '/admin-job-posting') {
            console.log('React Router navigation failed, using window.location');
            window.location.href = '/admin-job-posting';
          }
        }, 1000);
      } else {
        console.log('Access denied - user role:', response.user?.role);
        setError('Access denied. Admin privileges required.');
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err?.response?.data?.error || 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>🔐 Admin Login</h1>
          <p>Access the Placement Management System</p>
        </div>
        
        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="admin@cgcu.edu"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <button 
            type="submit" 
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="admin-login-footer">
          <p>🔒 Secure access for authorized personnel only</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
