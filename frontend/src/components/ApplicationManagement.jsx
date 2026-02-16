import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import './ApplicationManagement.css';

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedJob, setSelectedJob] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    statusBreakdown: []
  });

  // Fetch all applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const url = selectedJob === 'all' 
        ? '/api/applications/all' 
        : `/api/applications/job/${selectedJob}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setApplications(data);
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch applications');
      }
    } catch (err) {
      setError('Error fetching applications');
      console.error('Fetch applications error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs for filter dropdown
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/jobs', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        console.error('Failed to fetch jobs');
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/applications/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats({
          totalApplications: data.totalApplications || 0,
          statusBreakdown: data.statusBreakdown || []
        });
      } else {
        console.error('Failed to fetch stats');
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // Update application status
  const updateApplicationStatus = async (applicationId, status, adminNotes) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status, adminNotes })
      });

      if (response.ok) {
        setSuccess('Application status updated successfully!');
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
        fetchApplications();
        fetchStats();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update status');
      }
    } catch (err) {
      setError('Error updating application status');
      console.error('Update status error:', err);
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      pending: '#f39c12',
      shortlisted: '#3498db',
      interviewed: '#9b59b6',
      selected: '#27ae60',
      rejected: '#e74c3c'
    };
    return colors[status?.toLowerCase()] || '#95a5a6';
  };

  // Get status icon
  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      shortlisted: '📋',
      interviewed: '👥',
      selected: '✅',
      rejected: '❌'
    };
    return icons[status?.toLowerCase()] || '❓';
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle admin notes change
  const handleAdminNotesChange = (applicationId, notes) => {
    const updatedApplications = applications.map(app => 
      app._id === applicationId 
        ? { ...app, adminNotes: notes }
        : app
    );
    setApplications(updatedApplications);
  };

  // Clear messages
  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  // Initial data fetch
  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, []);

  // Fetch applications when selectedJob changes
  useEffect(() => {
    fetchApplications();
  }, [selectedJob]);

  // Clear messages when they exist
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(clearMessages, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  if (loading) {
    return (
      <div className="application-management-container">
        <AdminHeader />
        <div className="loading">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="application-management-container">
      <AdminHeader />
      
      <div className="application-management-header">
        <h1>📋 Application Management</h1>
        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-number">{stats.totalApplications}</div>
            <div className="stat-label">Total Applications</div>
          </div>
          {stats.statusBreakdown && stats.statusBreakdown.map((status) => (
            <div key={status._id} className="stat-card">
              <div className="stat-number">{status.count}</div>
              <div className="stat-label">{status._id}</div>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={clearMessages} className="close-btn">×</button>
        </div>
      )}
      {success && (
        <div className="success-message">
          {success}
          <button onClick={clearMessages} className="close-btn">×</button>
        </div>
      )}

      <div className="filter-section">
        <label htmlFor="job-filter">Filter by Job:</label>
        <select
          id="job-filter"
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
        >
          <option value="all">All Jobs</option>
          {jobs.map((job) => (
            <option key={job._id} value={job._id}>
              {job.position} - {job.companyName}
            </option>
          ))}
        </select>
      </div>

      <div className="applications-list">
        <h2>Applications ({applications.length})</h2>
        
        {applications.length === 0 ? (
          <div className="no-applications">
            <p>No applications found for the selected criteria.</p>
          </div>
        ) : (
          <div className="applications-grid">
            {applications.map((application) => (
              <div key={application._id} className="application-card">
                <div className="application-header">
                  <div className="applicant-info">
                    <h3>{application.applicantName || 'N/A'}</h3>
                    <p className="applicant-email">{application.applicantEmail || 'N/A'}</p>
                    <p className="applicant-phone">{application.applicantPhone || 'N/A'}</p>
                  </div>
                  <div className="application-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(application.status) }}
                    >
                      {getStatusIcon(application.status)} {application.status || 'pending'}
                    </span>
                  </div>
                </div>
                
                <div className="application-details">
                  <div className="detail-row">
                    <span className="detail-label">Course:</span>
                    <span className="detail-value">{application.applicantCourse || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Year:</span>
                    <span className="detail-value">{application.applicantYear || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Branch:</span>
                    <span className="detail-value">{application.applicantBranch || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Applied:</span>
                    <span className="detail-value">{formatDate(application.appliedAt)}</span>
                  </div>
                </div>
                
                {application.jobId && (
                  <div className="job-info">
                    <h4>Job Details</h4>
                    <p><strong>Position:</strong> {application.jobId.position || 'N/A'}</p>
                    <p><strong>Company:</strong> {application.jobId.companyName || 'N/A'}</p>
                    <p><strong>Type:</strong> {application.jobId.campusType || 'N/A'}</p>
                  </div>
                )}
                
                {application.formResponses && application.formResponses.length > 0 && (
                  <div className="form-responses">
                    <h4>Additional Information</h4>
                    {application.formResponses.map((response, index) => (
                      <div key={index} className="form-response">
                        <strong>{response.fieldLabel}:</strong>
                        <span className="response-value">
                          {response.fieldType === 'checkbox' && Array.isArray(response.response)
                            ? response.response.join(', ')
                            : response.response || 'Not provided'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="application-actions">
                  <div className="status-update">
                    <select
                      value={application.status || 'pending'}
                      onChange={(e) => updateApplicationStatus(
                        application._id, 
                        e.target.value, 
                        application.adminNotes || ''
                      )}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="interviewed">Interviewed</option>
                      <option value="selected">Selected</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  
                  <div className="admin-notes">
                    <textarea
                      placeholder="Add admin notes..."
                      value={application.adminNotes || ''}
                      onChange={(e) => handleAdminNotesChange(application._id, e.target.value)}
                      onBlur={() => updateApplicationStatus(
                        application._id, 
                        application.status || 'pending', 
                        application.adminNotes || ''
                      )}
                      rows="2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationManagement;