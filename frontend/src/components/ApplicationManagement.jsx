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

  useEffect(() => {
    fetchApplications();
    fetchJobs();
    fetchStats();
  }, [selectedJob]);

  const fetchApplications = async () => {
    try {
      const url = selectedJob === 'all' 
        ? '/api/applications/all' 
        : `/api/applications/job/${selectedJob}`;
      
      const response = await fetch(url, {
        headers: {
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
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const jobsData = await response.json();
        setJobs(jobsData);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

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
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

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
        fetchApplications();
        fetchStats();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update status');
      }
    } catch (err) {
      setError('Error updating application status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f39c12',
      shortlisted: '#3498db',
      interviewed: '#9b59b6',
      selected: '#27ae60',
      rejected: '#e74c3c'
    };
    return colors[status] || '#95a5a6';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      shortlisted: '📋',
      interviewed: '👥',
      selected: '✅',
      rejected: '❌'
    };
    return icons[status] || '❓';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
          {stats.statusBreakdown.map((status) => (
            <div key={status._id} className="stat-card">
              <div className="stat-number">{status.count}</div>
              <div className="stat-label">{status._id}</div>
            </div>
          ))}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

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
                    <h3>{application.applicantName}</h3>
                    <p className="applicant-email">{application.applicantEmail}</p>
                    <p className="applicant-phone">{application.applicantPhone}</p>
                  </div>
                  <div className="application-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(application.status) }}
                    >
                      {getStatusIcon(application.status)} {application.status}
                    </span>
                  </div>
                </div>
                
                <div className="application-details">
                  <div className="detail-row">
                    <span className="detail-label">Course:</span>
                    <span className="detail-value">{application.applicantCourse}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Year:</span>
                    <span className="detail-value">{application.applicantYear}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Branch:</span>
                    <span className="detail-value">{application.applicantBranch}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Applied:</span>
                    <span className="detail-value">{formatDate(application.appliedAt)}</span>
                  </div>
                </div>
                
                {application.jobId && (
                  <div className="job-info">
                    <h4>Job Details</h4>
                    <p><strong>Position:</strong> {application.jobId.position}</p>
                    <p><strong>Company:</strong> {application.jobId.companyName}</p>
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
                      value={application.status}
                      onChange={(e) => updateApplicationStatus(application._id, e.target.value, application.adminNotes || '')}
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
                      onChange={(e) => {
                        const updatedApplications = applications.map(app => 
                          app._id === application._id 
                            ? { ...app, adminNotes: e.target.value }
                            : app
                        );
                        setApplications(updatedApplications);
                      }}
                      onBlur={() => updateApplicationStatus(application._id, application.status, application.adminNotes || '')}
                      rows="2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
>>>>>>> origin/job-fetching-fix
    </div>
  );
};

export default ApplicationManagement;
