import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHeader.css';
import ConfirmAlert from './ConfirmAlert';

const AdminHeader = () => {
  const navigate = useNavigate();
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
    <header className="admin-header">
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
          <h1>🎓 PMS Admin Panel</h1>
          <span className="admin-subtitle">Placement Management System</span>
        </div>
        
        <div className="admin-header-center">
          <nav className="admin-nav">
            <button 
              className="nav-btn"
              onClick={() => handleNavigation('/admin-job-posting')}
            >
              📝 Job Management
            </button>
            {isSuperAdmin && (
              <>
                <button 
                  className="nav-btn"
                  onClick={() => handleNavigation('/application-management')}
                >
                  📋 Application Management
                </button>
                <button 
                  className="nav-btn"
                  onClick={() => handleNavigation('/admin-management')}
                >
                  🔧 Admin Management
                </button>
              </>
            )}
          </nav>
        </div>
        
        <div className="admin-header-right">
          <div className="admin-user-info">
            <span className="admin-name">👤 {adminUser.name || 'Admin'}</span>
            <span className="admin-role-info">
              {isSuperAdmin ? '👑 Super Admin' : '🔑 Admin'}
            </span>
          </div>
          <button onClick={handleLogout} className="admin-logout-btn">
            🚪 Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
