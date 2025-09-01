<<<<<<< HEAD
=======
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ApplicationManagement.css';

const ApplicationManagement = ({ jobId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`/api/applications/job/${jobId}`);
        setApplications(res.data);
      } catch (err) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [jobId]);

  const handleStatusChange = async (applicationId, status, notes) => {
    try {
      await axios.put(`/api/applications/${applicationId}/status`, { status, notes });
      setApplications(applications.map(app => app._id === applicationId ? { ...app, status, notes } : app));
    } catch (err) {
      // handle error
    }
  };

  if (loading) return <div>Loading applications...</div>;

  return (
    <div className="application-management">
      <h2>Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app._id}>
              <td>{app.student?.name || app.student?.email}</td>
              <td>{app.status}</td>
              <td>{app.notes}</td>
              <td>
                <button onClick={() => handleStatusChange(app._id, 'Shortlisted')}>Shortlist</button>
                <button onClick={() => handleStatusChange(app._id, 'Selected')}>Select</button>
                <button onClick={() => handleStatusChange(app._id, 'Rejected')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
=======
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
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

<<<<<<< HEAD
  // Fetch all applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const url = selectedJob === 'all' 
        ? '/api/applications' 
=======
  useEffect(() => {
    fetchApplications();
    fetchJobs();
    fetchStats();
  }, [selectedJob]);

  const fetchApplications = async () => {
    try {
      const url = selectedJob === 'all' 
        ? '/api/applications/all' 
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
        : `/api/applications/job/${selectedJob}`;
      
      const response = await fetch(url, {
        headers: {
<<<<<<< HEAD
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
=======
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      
      const data = await response.json();
      setApplications(data);
    } catch (err) {
      setError(err.message);
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  // Fetch jobs for filter dropdown
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
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
=======
  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const jobsData = await response.json();
        setJobs(jobsData);
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

<<<<<<< HEAD
  // Fetch statistics
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
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
=======
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/applications/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const statsData = await response.json();
        setStats(statsData);
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

<<<<<<< HEAD
  // Update application status
=======
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
  const updateApplicationStatus = async (applicationId, status, adminNotes) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status, adminNotes })
      });

      if (response.ok) {
        setSuccess('Application status updated successfully!');
<<<<<<< HEAD
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
=======
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
        fetchApplications();
        fetchStats();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update status');
      }
    } catch (err) {
      setError('Error updating application status');
<<<<<<< HEAD
      console.error('Update status error:', err);
    }
  };

  // Get status color
=======
    }
  };

>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
  const getStatusColor = (status) => {
    const colors = {
      pending: '#f39c12',
      shortlisted: '#3498db',
      interviewed: '#9b59b6',
      selected: '#27ae60',
      rejected: '#e74c3c'
    };
<<<<<<< HEAD
    return colors[status?.toLowerCase()] || '#95a5a6';
  };

  // Get status icon
=======
    return colors[status] || '#95a5a6';
  };

>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      shortlisted: '📋',
      interviewed: '👥',
      selected: '✅',
      rejected: '❌'
    };
<<<<<<< HEAD
    return icons[status?.toLowerCase()] || '❓';
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
=======
    return icons[status] || '❓';
  };

  const formatDate = (dateString) => {
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

<<<<<<< HEAD
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

=======
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
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
<<<<<<< HEAD
          {stats.statusBreakdown && stats.statusBreakdown.map((status) => (
=======
          {stats.statusBreakdown.map((status) => (
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
            <div key={status._id} className="stat-card">
              <div className="stat-number">{status.count}</div>
              <div className="stat-label">{status._id}</div>
            </div>
          ))}
        </div>
      </div>

<<<<<<< HEAD
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
=======
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc

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
<<<<<<< HEAD
                    <h3>{application.applicantName || 'N/A'}</h3>
                    <p className="applicant-email">{application.applicantEmail || 'N/A'}</p>
                    <p className="applicant-phone">{application.applicantPhone || 'N/A'}</p>
=======
                    <h3>{application.applicantName}</h3>
                    <p className="applicant-email">{application.applicantEmail}</p>
                    <p className="applicant-phone">{application.applicantPhone}</p>
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
                  </div>
                  <div className="application-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(application.status) }}
                    >
<<<<<<< HEAD
                      {getStatusIcon(application.status)} {application.status || 'pending'}
=======
                      {getStatusIcon(application.status)} {application.status}
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
                    </span>
                  </div>
                </div>
                
                <div className="application-details">
                  <div className="detail-row">
                    <span className="detail-label">Course:</span>
<<<<<<< HEAD
                    <span className="detail-value">{application.applicantCourse || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Year:</span>
                    <span className="detail-value">{application.applicantYear || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Branch:</span>
                    <span className="detail-value">{application.applicantBranch || 'N/A'}</span>
=======
                    <span className="detail-value">{application.applicantCourse}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Year:</span>
                    <span className="detail-value">{application.applicantYear}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Branch:</span>
                    <span className="detail-value">{application.applicantBranch}</span>
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Applied:</span>
                    <span className="detail-value">{formatDate(application.appliedAt)}</span>
                  </div>
                </div>
                
                {application.jobId && (
                  <div className="job-info">
                    <h4>Job Details</h4>
<<<<<<< HEAD
                    <p><strong>Position:</strong> {application.jobId.position || 'N/A'}</p>
                    <p><strong>Company:</strong> {application.jobId.companyName || 'N/A'}</p>
=======
                    <p><strong>Position:</strong> {application.jobId.position}</p>
                    <p><strong>Company:</strong> {application.jobId.companyName}</p>
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
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
<<<<<<< HEAD
                      value={application.status || 'pending'}
                      onChange={(e) => updateApplicationStatus(
                        application._id, 
                        e.target.value, 
                        application.adminNotes || ''
                      )}
=======
                      value={application.status}
                      onChange={(e) => updateApplicationStatus(application._id, e.target.value, application.adminNotes || '')}
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
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
<<<<<<< HEAD
                      onChange={(e) => handleAdminNotesChange(application._id, e.target.value)}
                      onBlur={() => updateApplicationStatus(
                        application._id, 
                        application.status || 'pending', 
                        application.adminNotes || ''
                      )}
=======
                      onChange={(e) => {
                        const updatedApplications = applications.map(app => 
                          app._id === application._id 
                            ? { ...app, adminNotes: e.target.value }
                            : app
                        );
                        setApplications(updatedApplications);
                      }}
                      onBlur={() => updateApplicationStatus(application._id, application.status, application.adminNotes || '')}
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
                      rows="2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
<<<<<<< HEAD
=======
>>>>>>> origin/job-fetching-fix
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
    </div>
  );
};

<<<<<<< HEAD
export default ApplicationManagement;
=======
export default ApplicationManagement;
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
