import React, { useState, useEffect } from 'react';
import './JobListings.css';

const JobListings = ({ onClose }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      const response = await fetch(
        // Add API key after getting expired...
        // IN this by setting limit =#number, u can fetch the jobs u want from api
        // ranginh from 10 to 150 to 300, based on requirements
        'https://remotive.com/api/remote-jobs?limit=15&category=software-dev'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

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

          {!loading && !error && jobs.length > 0 && (
            <div className="jobs-grid">
              {jobs.map((job) => (
                <div key={job.id} className="job-card">
                  <div className="job-header">
                    {job.company_logo && (
                      <img 
                        src={job.company_logo} 
                        alt={`${job.company_name} logo`}
                        className="company-logo"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <div className="job-title-section">
                      <h3>{job.title}</h3>
                      <p className="company-name">{job.company_name}</p>
                    </div>
                  </div>

                  <div className="job-tags">
                    <span className="tag location">
                      📍 {job.candidate_required_location || 'Worldwide'}
                    </span>
                    <span className="tag job-type">
                      💼 {job.job_type || 'Full-time'}
                    </span>
                    {job.salary && (
                      <span className="tag salary">💰 {job.salary}</span>
                    )}
                  </div>

                  <p className="job-description">
                    {cleanDescription(job.description)}
                  </p>

                  <div className="job-footer">
                    <span className="posted-date">
                      {new Date(job.publication_date).toLocaleDateString()}
                    </span>
                    <a 
                      href={job.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="apply-btn"
                    >
                      Apply Now →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && jobs.length === 0 && (
            <div className="no-jobs">
              <p>😕 No jobs available at the moment.</p>
              <button className="retry-btn" onClick={fetchJobs}>
                🔄 Refresh
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListings;