import React, { useState, useEffect } from 'react';
import './AdminJobPosting.css';
import { API_ENDPOINTS } from '../config/api';
import AdminHeader from './AdminHeader';
import { getAllJobs, createJob, updateJob, deleteJob } from '../../api/jobs';

const initialForm = {
  companyName: '',
  companyLogo: '',
  companyWebsite: '',
  position: '',
  jobType: 'Full-time',
  salaryPackage: '',
  location: '',
  applicationDeadline: '',
  jobDescription: '',
  skillsRequired: '',
  selectionProcess: '',
  bondDetails: '',
  benefits: '',
  contactPerson: '',
  contactEmail: '',
  contactPhone: '',
  driveDate: '',
  additionalInfo: '',
  eligibleCourses: [],
  eligibleBranches: [],
  eligibleYears: []
};

// Add these arrays for dropdown options
const COURSES = ['BTech', 'BSc', 'BBA', 'MBA', 'MTech', 'MCA', 'PhD'];
const BRANCHES = ['CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE', 'AIML', 'DS', 'CSIT'];
const YEARS = [ '2023', '2024', '2025', '2026', '2027'];

const AdminJobPosting = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [logoPreview, setLogoPreview] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [activeTab, setActiveTab] = useState('create');

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await getAllJobs();
        setJobPostings(jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        alert('Error loading job postings');
      }
    };
    fetchJobs();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  // Handle checkbox change for multiple selections
  const handleCheckboxChange = (field, value) => {
    const currentValues = formData[field] || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    setFormData({
      ...formData,
      [field]: updatedValues
    });
  };

  // Handle select all/clear all for multiple selections
  const handleSelectAll = (field, options) => {
    const currentValues = formData[field] || [];
    const allSelected = options.every(option => currentValues.includes(option));
    
    setFormData({
      ...formData,
      [field]: allSelected ? [] : options
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setLogoFile(file);
    }
  };  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submit - editId:', editId);
    console.log('Form submit - formData:', formData);
    
    // Validate required fields
    if (formData.eligibleCourses.length === 0) {
      alert('Please select at least one eligible course.');
      return;
    }
    if (formData.eligibleYears.length === 0) {
      alert('Please select at least one eligible year.');
      return;
    }
    
    try {
      let job;
      
      if (editId) {
        job = await updateJob(editId, formData);
        setJobPostings(jobPostings.map(j => j._id === editId ? job : j));
        alert('Job updated successfully!');
        setActiveTab('manage');
      } else {
        job = await createJob(formData);
        setJobPostings([...jobPostings, job]);
        alert('Job created successfully!');
      }
      
      setEditId(null);
      setFormData(initialForm);
      setLogoPreview('');
      setLogoFile(null);
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Error saving job. Please try again.');
    }
  };
  const handleSuccess = (job) => {
    console.log('handleSuccess called with:', job); // Debug log
    
    if (editId) {
      setJobPostings(jobPostings.map(j => j._id === editId ? job : j));
      alert('Job updated successfully!');
      setActiveTab('manage'); // Switch back to manage tab after edit
    } else {
      setJobPostings([...jobPostings, job]);
      alert('Job created successfully!');
    }
    
    setEditId(null);
    setFormData(initialForm);
    setLogoPreview('');
    setLogoFile(null);
  };

  const handleError = (err) => {
    console.error('Error saving job:', err);
    alert('Error saving job. Please try again.');
  };
  const handleEdit = (job) => {
    console.log('Editing job:', job); // Debug log
    
    // Ensure arrays are properly handled
    const editFormData = {
      ...job,
      eligibleCourses: Array.isArray(job.eligibleCourses) ? job.eligibleCourses : [],
      eligibleBranches: Array.isArray(job.eligibleBranches) ? job.eligibleBranches : [],
      eligibleYears: Array.isArray(job.eligibleYears) ? job.eligibleYears : [],
    };
    
    console.log('Form data for edit:', editFormData); // Debug log
    
    setFormData(editFormData);
    setEditId(job._id);
    setActiveTab('create');
    
    // Handle logo preview
    if (job.companyLogo) {
      setLogoPreview(`${API_ENDPOINTS.UPLOADS}${job.companyLogo}`);
    } else {
      setLogoPreview('');
    }
    setLogoFile(null);
  };

  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobPostings(jobPostings.filter(job => job._id !== jobId));
      alert('Job deleted successfully!');
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Error deleting job. Please try again.');
    }
  };
  const handleCancel = () => {
    console.log('Cancel button clicked'); // Debug log
    setEditId(null);
    setFormData(initialForm);
    setLogoPreview('');
    setLogoFile(null);
    setActiveTab('manage');
  };
  // Handle tab changes
  const handleTabChange = (tab) => {
    if (tab === 'manage' && editId) {
      // If switching to manage tab while editing, reset edit state
      setEditId(null);
      setFormData(initialForm);
      setLogoPreview('');
      setLogoFile(null);
    }
    setActiveTab(tab);
  };

  return (
    <div className="admin-job-posting-container">
      <AdminHeader />
      <div className="admin-content">
        <h1>Job Posting Management</h1>
        <div className="admin-tabs">
          <button
            className={activeTab === 'create' ? 'active' : ''}
            onClick={() => handleTabChange('create')}
          >
            {editId ? 'Edit Job Posting' : 'Create New Job Posting'}
          </button>
          <button
            className={activeTab === 'manage' ? 'active' : ''}
            onClick={() => handleTabChange('manage')}
          >
            Manage Job Postings
          </button>
        </div>

        {activeTab === 'create' ? (
          <form onSubmit={handleSubmit} className="job-posting-form" encType="multipart/form-data">


            <div className="form-section">
              <h2>Company Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Company Name*</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Company Logo</label>
                  <div className="logo-upload">
                    {logoPreview && (
                      <img src={logoPreview} alt="Company Logo Preview" className="logo-preview" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </div>              </div>
                <div className="form-group">
                  <label>Company Website</label>
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleInputChange}
                    placeholder="https://www.company.com"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Contact Person*</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contact Email*</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contact Phone</label>
                  <input
                    type="text"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-section">
              <h2>Job Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Position Title*</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Job Type*</label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Salary Package*</label>
                  <input
                    type="text"
                    name="salaryPackage"
                    value={formData.salaryPackage}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location*</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Drive Date</label>
                  <input
                    type="date"
                    name="driveDate"
                    value={formData.driveDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Application Deadline*</label>
                  <input
                    type="date"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-section">
              <h2>Job Requirements</h2>
              <div className="form-group">
                <label>Job Description*</label>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  required
                  rows="5"
                />
              </div>

<div className="form-section">
  <h2>Eligibility Details</h2>
  <div className="form-row">    <div className="form-group">
      <label>Eligible Courses*</label>
      <div className="selection-controls">
        <button 
          type="button" 
          className="select-all-btn"
          onClick={() => handleSelectAll('eligibleCourses', COURSES)}
        >
          {formData.eligibleCourses.length === COURSES.length ? 'Clear All' : 'Select All'}
        </button>
      </div>
      <div className="checkbox-grid">
        {COURSES.map(course => (
          <label key={course} className="checkbox-item">
            <input
              type="checkbox"
              checked={formData.eligibleCourses.includes(course)}
              onChange={() => handleCheckboxChange('eligibleCourses', course)}
            />
            <span className="checkbox-label">{course}</span>
          </label>
        ))}
      </div>
      {formData.eligibleCourses.length > 0 && (
        <div className="selected-items">
          <span className="selected-label">Selected: </span>
          {formData.eligibleCourses.join(', ')}
        </div>
      )}
    </div>
  </div>
  
  <div className="form-row">    <div className="form-group">
      <label>Eligible Branches (for technical courses)</label>
      <div className="selection-controls">
        <button 
          type="button" 
          className="select-all-btn"
          onClick={() => handleSelectAll('eligibleBranches', BRANCHES)}
        >
          {formData.eligibleBranches.length === BRANCHES.length ? 'Clear All' : 'Select All'}
        </button>
      </div>
      <div className="checkbox-grid">
        {BRANCHES.map(branch => (
          <label key={branch} className="checkbox-item">
            <input
              type="checkbox"
              checked={formData.eligibleBranches.includes(branch)}
              onChange={() => handleCheckboxChange('eligibleBranches', branch)}
            />
            <span className="checkbox-label">{branch}</span>
          </label>
        ))}
      </div>
      {formData.eligibleBranches.length > 0 && (
        <div className="selected-items">
          <span className="selected-label">Selected: </span>
          {formData.eligibleBranches.join(', ')}
        </div>
      )}
    </div>
  </div>
  
  <div className="form-row">    <div className="form-group">
      <label>Eligible Years*</label>
      <div className="selection-controls">
        <button 
          type="button" 
          className="select-all-btn"
          onClick={() => handleSelectAll('eligibleYears', YEARS)}
        >
          {formData.eligibleYears.length === YEARS.length ? 'Clear All' : 'Select All'}
        </button>
      </div>
      <div className="checkbox-grid">
        {YEARS.map(year => (
          <label key={year} className="checkbox-item">
            <input
              type="checkbox"
              checked={formData.eligibleYears.includes(year)}
              onChange={() => handleCheckboxChange('eligibleYears', year)}
            />
            <span className="checkbox-label">{year}</span>
          </label>
        ))}
      </div>
      {formData.eligibleYears.length > 0 && (
        <div className="selected-items">
          <span className="selected-label">Selected: </span>
          {formData.eligibleYears.join(', ')}
        </div>
      )}
    </div>
  </div>
</div>

            <div className="form-group">
              <label>Skills Required*</label>
              <textarea
                name="skillsRequired"
                value={formData.skillsRequired}
                onChange={handleInputChange}
                required
                rows="3"
                placeholder="Enter skills separated by commas"
              />
            </div>
          </div>
          <div className="form-section">
            <h2>Additional Information</h2>
            <div className="form-group">
              <label>Selection Process</label>
              <textarea
                name="selectionProcess"
                value={formData.selectionProcess}
                onChange={handleInputChange}
                rows="3"
                placeholder="e.g., Written Test, Technical Interview, HR Round"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Bond Details (if any)</label>
                <input
                  type="text"
                  name="bondDetails"
                  value={formData.bondDetails}
                  onChange={handleInputChange}
                  placeholder="e.g., 1 year bond with Rs. 50,000 penalty"
                />
              </div>
              <div className="form-group">
                <label>Benefits</label>
                <input
                  type="text"
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  placeholder="e.g., Health insurance, PF, etc."
                />
              </div>
            </div>
            <div className="form-group">
              <label>Additional Information</label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows="3"
              />
            </div>
          </div>



          <div className="form-actions">
    <button type="submit" className="submit-btn-job">
      {editId ? 'Update Job Posting' : 'Create Job Posting'}
    </button>
    {editId && (
      <button
        type="button"
        className="cancel-btn"
        onClick={handleCancel}
      >
        Cancel
      </button>
    )}
  </div>
</form>
) : (
<div className="job-postings-list">
  <h2>Manage Job Postings ({jobPostings.length})</h2>
  {jobPostings.length === 0 ? (
    <div className="no-postings">
      <p>No job postings created yet.</p>
    </div>
  ) : (
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Position</th>
          <th>Job Type</th>
          <th>Package</th>
          <th>Eligible Courses</th>
          <th>Eligible Years</th>
          <th>Deadline</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {jobPostings.map((posting) => (
          <tr key={posting._id}>
            <td>
              <div className="company-cell">
                {posting.companyLogo && (
                  <img 
                    src={
                      posting.companyLogo.startsWith('http') 
                        ? posting.companyLogo 
                        : `${API_ENDPOINTS.UPLOADS}${posting.companyLogo}`
                    }
                    alt={posting.companyName}
                    className="company-logo-small"
                    onError={(e) => {
                      e.target.src = '/default-logo.png';
                      e.target.onerror = null;
                    }}
                  />
                )}
                {posting.companyName}
              </div>
            </td>
            <td>{posting.position || '-'}</td>
            <td>{posting.jobType || '-'}</td>
            <td>{posting.salaryPackage || '-'}</td>
            <td>
              {(posting.eligibleCourses?.join(', ') || 'None')}
              {posting.eligibleBranches?.length > 0 && (
                <span> ({posting.eligibleBranches.join(', ')})</span>
              )}
            </td>
            <td>{posting.eligibleYears?.join(', ') || '-'}</td>
            <td>
              {posting.applicationDeadline 
                ? new Date(posting.applicationDeadline).toLocaleDateString() 
                : '-'}
            </td>
            <td>
              <button
                onClick={() => handleEdit(posting)}
                className="edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this job posting?')) {
                    handleDelete(posting._id);
                  }
                }}
                className="delete-btn"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
)}
</div>
</div>
);
};

export default AdminJobPosting;