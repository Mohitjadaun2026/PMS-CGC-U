import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import './AdminManagement.css';
import { getAllAdmins, inviteAdmin, toggleAdminStatus, deleteAdmin } from '../../api/admin';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    role: 'admin'
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const data = await getAllAdmins();
      setAdmins(data || []);
    } catch (err) {
      setError(err.error || 'Error fetching admins');
    } finally {
      setLoading(false);
    }
  };

  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const result = await inviteAdmin(inviteForm);
      setSuccess(`Admin invitation sent successfully! Temporary password: ${result.user.tempPassword}`);
      setInviteForm({ name: '', email: '', role: 'admin' });
      setShowInviteForm(false);
      fetchAdmins(); // Refresh the list
    } catch (err) {
      setError(err.error || 'Error sending invitation');
    }
  };

  const handleToggleStatus = async (adminId, currentStatus) => {
    try {
      await toggleAdminStatus(adminId, currentStatus);
      setSuccess('Admin status updated successfully!');
      fetchAdmins(); // Refresh the list
    } catch (err) {
      setError(err.error || 'Error updating admin status');
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) {
      return;
    }

    try {
      await deleteAdmin(adminId);
      setSuccess('Admin deleted successfully!');
      fetchAdmins(); // Refresh the list
    } catch (err) {
      setError(err.error || 'Error deleting admin');
    }
  };

  const handleInputChange = (e) => {
    setInviteForm({
      ...inviteForm,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="admin-management-container">
        <AdminHeader />
        <div className="admin-management-loading">Loading admins...</div>
      </div>
    );
  }

  return (
    <div className="admin-management-container">
      <AdminHeader />
      
      <div className="admin-management-header">
        <h1>🔧 Admin Management</h1>
        <button 
          className="invite-admin-btn"
          onClick={() => setShowInviteForm(!showInviteForm)}
        >
          {showInviteForm ? '❌ Cancel' : '➕ Invite New Admin'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {showInviteForm && (
        <div className="invite-form-container">
          <h2>📧 Invite New Admin</h2>
          <form className="invite-form" onSubmit={handleInviteSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={inviteForm.name}
                onChange={handleInputChange}
                required
                placeholder="Enter admin name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={inviteForm.email}
                onChange={handleInputChange}
                required
                placeholder="Enter admin email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={inviteForm.role}
                onChange={handleInputChange}
                required
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                📤 Send Invitation
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setShowInviteForm(false)}
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admins-list">
        <h2>👥 Current Admins</h2>
        
        {admins.length === 0 ? (
          <div className="no-admins">
            No admins found. Invite your first admin to get started!
          </div>
        ) : (
          <div className="admins-grid">
            {admins.map((admin) => (
              <div key={admin._id} className="admin-card">
                <div className="admin-info">
                  <h3>{admin.name}</h3>
                  <p className="admin-email">{admin.email}</p>
                  <span className={`admin-role ${admin.role}`}>
                    {admin.role === 'super_admin' ? '👑 Super Admin' : '🔑 Admin'}
                  </span>
                  <p className="admin-status">
                    Status: {admin.isActive ? '✅ Active' : '❌ Inactive'}
                  </p>
                </div>
                
                <div className="admin-actions">
                  <button
                    className="toggle-status-btn"
                    onClick={() => handleToggleStatus(admin._id, admin.isActive)}
                  >
                    {admin.isActive ? '❌ Deactivate' : '✅ Activate'}
                  </button>
                  <button
                    className="delete-admin-btn"
                    onClick={() => handleDeleteAdmin(admin._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManagement;
