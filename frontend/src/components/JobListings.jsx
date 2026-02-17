import React, { useState, useEffect } from 'react';
import './JobListings.css';
import { getAllJobs } from '../../api/jobs';
import DynamicApplicationForm from './DynamicApplicationForm';
import { toast } from 'react-hot-toast';

const JobListings = ({ onClose }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  useEffect(() => {
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
    fetchJobs();

    return () => {
      // Re-enable scrolling when modal closes
      document.body.style.overflow = 'unset';
    };
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAllJobs();
      console.log('📋 Jobs fetched from API:', data);
      console.log('📋 First job sample:',  data && data[0] ? {
        position: data[0].position,
        jobApplicationType: data[0].jobApplicationType,
        hasFormFields: !!data[0].applicationFormFields,
        fieldsCount: data[0].applicationFormFields?.length || 0
      } : 'No jobs');
      setJobs(data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch jobs');
      console.error('❌ Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Separate jobs by application type
  const onCampusJobs = jobs.filter(job => job.jobApplicationType !== 'off-campus');
  const offCampusJobs = jobs.filter(job => job.jobApplicationType === 'off-campus');

  // Function to strip HTML tags and clean text
  const cleanDescription = (html) => {
    if (!html) return '';
    
    // Remove HTML tags
    const text = html.replace(/<[^>]*>/g, '');
    
    // Decode HTML entities
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    const decoded = textarea.value;
    
    // Truncate to 150 characters
    return decoded.length > 150 
      ? decoded.substring(0, 150) + '...'
      : decoded;
  };

  const handleApplyOnCampus = (job) => {
    console.group('🎯 APPLY ON-CAMPUS CLICKED');
    console.log('Job:', job);
    console.log('Job ID:', job._id);
    console.log('Has applicationFormFields:', !!job.applicationFormFields);
    console.log('Number of fields:', job.applicationFormFields?.length || 0);
    
    if (!job.applicationFormFields || job.applicationFormFields.length === 0) {
      console.warn('⚠️ WARNING: No application form fields found for this job!');
      console.log('Will show form anyway to allow manual entry');
    } else {
      console.log('✅ Form fields found:');
      console.table(job.applicationFormFields);
    }
    console.groupEnd();
    
    console.log('📌 Setting selectedJob and showing modal...');
    setSelectedJob(job);
    setShowApplicationModal(true);
    console.log('📌 Modal should now be visible');
  };

  const handleApplyOffCampus = (job) => {
    if (job.externalApplicationLink) {
      window.open(job.externalApplicationLink, '_blank');
    } else {
      toast.error('External link not available');
    }
  };

  const handleApplicationSuccess = () => {
    console.log('✅ handleApplicationSuccess called');
    setShowApplicationModal(false);
    setSelectedJob(null);
    toast.success('Application submitted successfully!');
  };

  const handleApplicationClose = () => {
    console.log('❌ handleApplicationClose called');
    setShowApplicationModal(false);
    setSelectedJob(null);
  };

  const renderJobCard = (job) => {
    const isOffCampus = job.jobApplicationType === 'off-campus';
    
    return (
      <div key={job._id} className="job-card">
        <div className="job-header">
          {job.companyLogo && (
            <img 
              src={job.companyLogo.startsWith('http') ? job.companyLogo : `/uploads/${job.companyLogo}`}
              alt={`${job.companyName} logo`}
              className="company-logo"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
          <div className="job-title-section">
            <h3>{job.position}</h3>
            <p className="company-name">{job.companyName}</p>
          </div>
          <span className={`job-type-badge ${isOffCampus ? 'off-campus' : 'on-campus'}`}>
            {isOffCampus ? 'Off-Campus' : 'On-Campus'}
          </span>
        </div>

        <div className="job-tags">
          <span className="tag location">
            📍 {job.location || 'Not specified'}
          </span>
          <span className="tag job-type">
            💼 {job.jobType || 'Full-time'}
          </span>
          {job.salaryPackage && (
            <span className="tag salary">💰 {job.salaryPackage}</span>
          )}
        </div>

        <p className="job-description">
          {cleanDescription(job.jobDescription)}
        </p>

        <div className="job-footer">
          <span className="posted-date">
            Deadline: {job.applicationDeadline 
              ? new Date(job.applicationDeadline).toLocaleDateString() 
              : 'Not specified'}
          </span>
          <button 
            className={`apply-btn ${isOffCampus ? 'off-campus' : 'on-campus'}`}
            onClick={() => isOffCampus ? handleApplyOffCampus(job) : handleApplyOnCampus(job)}
          >
            {isOffCampus ? 'Apply (External) →' : 'Apply Now →'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="job-listings-overlay" onClick={onClose}>
      <div 
        className="job-listings-container" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="job-listings-header">
          <h2>🚀 Job Listings</h2>
          <div className="header-actions">
            <button 
              className="refresh-btn" 
              onClick={fetchJobs}
              disabled={loading}
              aria-label="Refresh jobs"
            >
              <span className={loading ? 'spinning' : ''}>🔄</span>
              Refresh
            </button>
            <button 
              className="close-btn" 
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>

        <div className="job-listings-content">
          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading amazing opportunities...</p>
            </div>
          )}

          {error && (
            <div className="error-container">
              <p>❌ {error}</p>
              <button className="retry-btn" onClick={fetchJobs}>
                🔄 Retry
              </button>
            </div>
          )}

          {!loading && !error && jobs.length > 0 ? (
            <div className="job-sections">
              {/* On-Campus Jobs Section */}
              {onCampusJobs.length > 0 && (
                <div className="job-section on-campus-section">
                  <div className="section-header">
                    <h3>🎓 On-Campus Opportunities</h3>
                    <span className="job-count">{onCampusJobs.length}</span>
                  </div>
                  <div className="jobs-grid">
                    {onCampusJobs.map(renderJobCard)}
                  </div>
                </div>
              )}

              {/* Off-Campus Jobs Section */}
              {offCampusJobs.length > 0 && (
                <div className="job-section off-campus-section">
                  <div className="section-header">
                    <h3>🌐 Off-Campus Opportunities</h3>
                    <span className="job-count">{offCampusJobs.length}</span>
                  </div>
                  <div className="jobs-grid">
                    {offCampusJobs.map(renderJobCard)}
                  </div>
                </div>
              )}
            </div>
          ) : (
            !loading && !error && (
              <div className="no-jobs">
                <p>😕 No jobs available at the moment.</p>
                <button className="retry-btn" onClick={fetchJobs}>
                  🔄 Refresh
                </button>
              </div>
            )
          )}
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <div className="application-modal-overlay" onClick={handleApplicationClose}>
          <div className="application-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>Apply for {selectedJob.position}</h2>
                <p className="company-name">{selectedJob.companyName}</p>
              </div>
              <button className="modal-close-btn" onClick={handleApplicationClose}>×</button>
            </div>
            <div className="modal-body">
              <DynamicApplicationForm 
                job={selectedJob}
                onSuccess={handleApplicationSuccess}
                onClose={handleApplicationClose}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListings;