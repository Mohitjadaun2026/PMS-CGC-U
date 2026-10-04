import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AdminHeader.css';
import './superAdminTheme.css';
import ConfirmAlert from './ConfirmAlert';
import collegeLogo from '../assets/cgc logo.png';

const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
  const isSuperAdmin = adminUser.role === 'super_admin';

  const handleLogout = () => {
    setShowAlert(true); 
  };

  const confirmLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin-login');
    setShowAlert(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <header className={`admin-header ${isSuperAdmin ? 'super-admin-header' : ''}`}>
      {showAlert && <ConfirmAlert
        isOpen={showAlert}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmText="Yes, Logout"
        cancelText="Cancel"
        onConfirm={() => {
          confirmLogout();
          setShowAlert(false);
        }}
        onCancel={() => setShowAlert(false)}
      />}
      <div className="admin-header-content">
        <div className="admin-header-left">
          {isSuperAdmin && <img className="admin-brand-logo" src={collegeLogo} alt="CGC University" />}
          <div className="admin-brand-copy">
          <h1>PMS Admin Panel</h1>
          <span className="admin-subtitle">Placement Management System</span>
          </div>
        </div>
        
        <div className="admin-header-center">
          <nav className="admin-nav">
            <button
              className={`nav-btn ${location.pathname === '/admin-dashboard' ? 'is-active' : ''}`}
              onClick={() => handleNavigation('/admin-dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={`nav-btn ${location.pathname === '/admin-job-posting' ? 'is-active' : ''}`}
              onClick={() => handleNavigation('/admin-job-posting')}
            >
              Job Management
            </button>
            <button
              className={`nav-btn ${location.pathname === '/application-management' ? 'is-active' : ''}`}
              onClick={() => handleNavigation('/application-management')}
            >
              Application Management
            </button>
            {isSuperAdmin && (
              <>
                <button 
                  className={`nav-btn ${location.pathname === '/admin-management' ? 'is-active' : ''}`}
                  onClick={() => handleNavigation('/admin-management')}
                >
                  Admin Management
                </button>
              </>
            )}
          </nav>
        </div>
        
        <div className="admin-header-right">
          <div className="admin-user-info">
            <span className="admin-name">{adminUser.name || 'Admin'}</span>
            <span className="admin-role-info">
              {isSuperAdmin ? 'SUPER ADMIN' : 'ADMIN'}
            </span>
          </div>
          <button onClick={handleLogout} className="admin-logout-btn">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
