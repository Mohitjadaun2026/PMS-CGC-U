import React, { useState, useEffect } from 'react';
import './StudentApplicationsDashboard.css';
import { getStudentApplications, downloadResume } from '../../api/jobs';
import { toast } from 'react-hot-toast';

const StudentApplicationsDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const data = await getStudentApplications(userId);
      setApplications(data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch applications');
      console.error('Error:', err);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadResume = async (applicationId) => {
    try {
      setDownloadingId(applicationId);
      await downloadResume(applicationId);
      toast.success('Resume downloaded successfully');
    } catch (err) {
      console.error('Error downloading resume:', err);
      toast.error('Failed to download resume');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedApplication(null);
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'selected':
        return 'status-selected';
      case 'interviewed':
        return 'status-interviewed';
      case 'shortlisted':
        return 'status-shortlisted';
      case 'rejected':
        return 'status-rejected';
      case 'pending':
      default:
        return 'status-pending';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'selected':
        return '✅';
      case 'interviewed':
        return '📞';
      case 'shortlisted':
        return '⭐';
      case 'rejected':
        return '❌';
      case 'pending':
      default:
        return '⏳';
    }
  };

  // Filter applications
  const filteredApplications = filterStatus === 'all'
    ? applications
    : applications.filter(app => app.status?.toLowerCase() === filterStatus.toLowerCase());

  // Group by status for stats
  const stats = {
    total: applications.length,
    pending: applications.filter(a => !a.status || a.status.toLowerCase() === 'pending').length,
    shortlisted: applications.filter(a => a.status?.toLowerCase() === 'shortlisted').length,
    interviewed: applications.filter(a => a.status?.toLowerCase() === 'interviewed').length,
    selected: applications.filter(a => a.status?.toLowerCase() === 'selected').length,
    rejected: applications.filter(a => a.status?.toLowerCase() === 'rejected').length,
  };

  return (
    <div className="student-dashboard-container">
      <div className="dashboard-header">
        <h1>📊 My Applications</h1>
        <button className="refresh-btn" onClick={fetchApplications} disabled={loading}>
          🔄 Refresh
        </button>
      </div>

      {/* Statistics Cards */}
      {!loading && !error && applications.length > 0 && (
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Applications</div>
          </div>
          <div className="stat-card pending">
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card shortlisted">
            <div className="stat-number">{stats.shortlisted}</div>
            <div className="stat-label">Shortlisted</div>
          </div>
          <div className="stat-card interviewed">
            <div className="stat-number">{stats.interviewed}</div>
            <div className="stat-label">Interviewed</div>
          </div>
          <div className="stat-card selected">
            <div className="stat-number">{stats.selected}</div>
            <div className="stat-label">Selected</div>
          </div>
          <div className="stat-card rejected">
            <div className="stat-number">{stats.rejected}</div>
            <div className="stat-label">Rejected</div>
          </div>
        </div>
      )}

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your applications...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <p>❌ {error}</p>
          <button className="retry-btn" onClick={fetchApplications}>
            🔄 Retry
          </button>
        </div>
      )}

      {!loading && !error && applications.length === 0 && (
        <div className="empty-container">
          <p>📭 You haven't applied to any jobs yet.</p>
          <p className="empty-hint">Start applying to opportunities to see them here.</p>
        </div>
      )}

      {!loading && !error && applications.length > 0 && (
        <div className="applications-section">
          {/* Filter Section */}
          <div className="filter-section">
            <h3>Filter by Status</h3>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                All ({stats.total})
              </button>
              <button
                className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
                onClick={() => setFilterStatus('pending')}
              >
                ⏳ Pending ({stats.pending})
              </button>
              <button
                className={`filter-btn ${filterStatus === 'shortlisted' ? 'active' : ''}`}
                onClick={() => setFilterStatus('shortlisted')}
              >
                ⭐ Shortlisted ({stats.shortlisted})
              </button>
              <button
                className={`filter-btn ${filterStatus === 'interviewed' ? 'active' : ''}`}
                onClick={() => setFilterStatus('interviewed')}
              >
                📞 Interviewed ({stats.interviewed})
              </button>
              <button
                className={`filter-btn ${filterStatus === 'selected' ? 'active' : ''}`}
                onClick={() => setFilterStatus('selected')}
              >
                ✅ Selected ({stats.selected})
              </button>
              <button
                className={`filter-btn ${filterStatus === 'rejected' ? 'active' : ''}`}
                onClick={() => setFilterStatus('rejected')}
              >
                ❌ Rejected ({stats.rejected})
              </button>
            </div>
          </div>

          {/* Applications List */}
          <div className="applications-list">
            {filteredApplications.map((application) => (
              <div key={application._id} className="application-card">
                <div className="card-header">
                  <div className="header-content">
                    <h3 className="position-title">{application.job?.position || 'Position'}</h3>
                    <p className="company-name">{application.job?.companyName || 'Company'}</p>
                  </div>
                  <span className={`status-badge ${getStatusBadgeClass(application.status)}`}>
                    {getStatusIcon(application.status)} {application.status || 'Pending'}
                  </span>
                </div>

                <div className="card-meta">
                  <div className="meta-item">
                    <span className="meta-label">📅 Applied On:</span>
                    <span className="meta-value">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">⏰ Deadline:</span>
                    <span className="meta-value">
                      {application.job?.applicationDeadline
                        ? new Date(application.job.applicationDeadline).toLocaleDateString()
                        : 'Not specified'}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">💼 Position Type:</span>
                    <span className="meta-value">
                      {application.job?.jobApplicationType === 'off-campus' ? '🌐 Off-Campus' : '🎓 On-Campus'}
                    </span>
                  </div>
                </div>

                <div className="card-description">
                  <p>{application.job?.position ? `Applied for ${application.job.position} role` : 'Job application'}</p>
                  {application.notes && (
                    <p className="admin-notes">
                      <strong>Admin Notes:</strong> {application.notes}
                    </p>
                  )}
                </div>

                <div className="card-actions">
                  <button
                    className="view-details-btn"
                    onClick={() => handleViewDetails(application)}
                  >
                    📋 View Details
                  </button>
                  {application.resumePath && (
                    <button
                      className="download-btn"
                      onClick={() => handleDownloadResume(application._id)}
                      disabled={downloadingId === application._id}
                    >
                      {downloadingId === application._id ? '⏳ Downloading...' : '📥 Download Resume'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredApplications.length === 0 && (
            <div className="no-results">
              <p>No applications found with the selected filter.</p>
            </div>
          )}
        </div>
      )}

      {/* Details Modal */}
      {showDetails && selectedApplication && (
        <div className="details-modal-overlay" onClick={handleCloseDetails}>
          <div className="details-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Application Details</h2>
              <button className="modal-close-btn" onClick={handleCloseDetails}>×</button>
            </div>

            <div className="modal-body">
              <div className="details-section">
                <h3>Job Information</h3>
                <div className="detail-row">
                  <span className="detail-label">Position:</span>
                  <span className="detail-value">{selectedApplication.job?.position}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Company:</span>
                  <span className="detail-value">{selectedApplication.job?.companyName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{selectedApplication.job?.location || 'Not specified'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Salary:</span>
                  <span className="detail-value">{selectedApplication.job?.salaryPackage || 'Not specified'}</span>
                </div>
              </div>

              <div className="details-section">
                <h3>Application Status</h3>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`detail-value status ${getStatusBadgeClass(selectedApplication.status)}`}>
                    {getStatusIcon(selectedApplication.status)} {selectedApplication.status || 'Pending'}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Applied On:</span>
                  <span className="detail-value">
                    {new Date(selectedApplication.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {selectedApplication.updatedAt && selectedApplication.updatedAt !== selectedApplication.createdAt && (
                  <div className="detail-row">
                    <span className="detail-label">Last Updated:</span>
                    <span className="detail-value">
                      {new Date(selectedApplication.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {selectedApplication.notes && (
                <div className="details-section">
                  <h3>Admin Notes</h3>
                  <p className="admin-notes-text">{selectedApplication.notes}</p>
                </div>
              )}

              {selectedApplication.formResponses && selectedApplication.formResponses.length > 0 && (
                <div className="details-section">
                  <h3>Your Responses</h3>
                  <div className="form-responses">
                    {selectedApplication.formResponses.map((response, index) => (
                      <div key={index} className="response-item">
                        <span className="response-label">{response.fieldLabel}:</span>
                        <span className="response-value">
                          {Array.isArray(response.response)
                            ? response.response.join(', ')
                            : response.response}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              {selectedApplication.resumePath && (
                <button
                  className="download-btn-modal"
                  onClick={() => {
                    handleDownloadResume(selectedApplication._id);
                  }}
                  disabled={downloadingId === selectedApplication._id}
                >
                  {downloadingId === selectedApplication._id ? '⏳ Downloading...' : '📥 Download Resume'}
                </button>
              )}
              <button className="close-modal-btn" onClick={handleCloseDetails}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentApplicationsDashboard;
