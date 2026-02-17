import React, { useState, useEffect } from 'react';
import './AdminJobPosting.css';
import { API_ENDPOINTS } from '../config/api';
import AdminHeader from './AdminHeader';
import { getAllJobs, createJob, updateJob, deleteJob } from '../../api/jobs';
import DynamicFormFieldBuilder from './DynamicFormFieldBuilder';

const initialForm = {
  companyName: '',
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
  eligibleYears: [],
  jobApplicationType: 'on-campus',
  externalApplicationLink: '',
  applicationFormFields: []
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
    console.log('Form submit - applicationFormFields:', formData.applicationFormFields);
    console.log('Form submit - logoFile:', logoFile);
    console.log('Form submit - jobApplicationType:', formData.jobApplicationType);
    
    // Validate: if on-campus, must have form fields
    if (formData.jobApplicationType === 'on-campus' && (!formData.applicationFormFields || formData.applicationFormFields.length === 0)) {
      alert('⚠️ On-Campus jobs must have at least one application form field');
      return;
    }
    
    // Show what we're about to send
    console.group('🚀 SUBMITTING JOB');
    console.log('Job Type:', formData.jobApplicationType);
    console.log('Position:', formData.position);
    console.log('applicationFormFields count:', formData.applicationFormFields?.length || 0);
    if (formData.applicationFormFields && formData.applicationFormFields.length > 0) {
      console.log('Fields being sent:');
      formData.applicationFormFields.forEach((f, i) => {
        console.log(`  ${i+1}. ${f.fieldName} (${f.fieldType}) - Required: ${f.isRequired}`);
      });
    } else {
      console.warn('⚠️ WARNING: No custom form fields will be sent!');
    }
    console.groupEnd();
    
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
      // Create FormData to handle file uploads
      const submitData = new FormData();
      
      // Create a clean copy of formData without companyLogo field
      const cleanFormData = { ...formData };
      delete cleanFormData.companyLogo; // Explicitly remove companyLogo from form data
      
      console.log('Clean form data (without companyLogo):', cleanFormData);
      
      // Add all form fields to FormData (excluding companyLogo)
      Object.keys(cleanFormData).forEach(key => {
        const value = cleanFormData[key];
        
        // Skip empty or undefined values
        if (value === undefined || value === null || value === '') {
          return;
        }
        
        if (Array.isArray(value)) {
          // Handle arrays specially
          if (key === 'applicationFormFields') {
            // For applicationFormFields, serialize as JSON string
            console.log('📤 Sending applicationFormFields to backend:');
            console.log('  Count:', value.length);
            console.log('  Fields:', value);
            const jsonString = JSON.stringify(value);
            console.log('  JSON String:', jsonString);
            submitData.append(key, jsonString);
          } else {
            // Handle other arrays (eligibleCourses, eligibleBranches, eligibleYears)
            if (value.length > 0) {
              value.forEach(item => {
                submitData.append(`${key}[]`, item);
              });
            }
          }
        } else {
          submitData.append(key, value);
        }
      });
      
      // Add logo file if selected
      if (logoFile) {
        submitData.append('companyLogo', logoFile);
        console.log('✅ Added logo file to FormData:', logoFile.name, 'Size:', logoFile.size, 'bytes');
      } else {
        console.log('ℹ️ No logo file selected');
      }
      
      // Debug: Log FormData contents
      console.log('FormData contents:');
      for (let [key, value] of submitData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: [File] ${value.name} (${value.size} bytes)`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }
      
      let job;
      
      if (editId) {
        job = await updateJob(editId, submitData);
        setJobPostings(jobPostings.map(j => j._id === editId ? job : j));
        alert('Job updated successfully!');
        setActiveTab('manage');
      } else {
        job = await createJob(submitData);
        setJobPostings([...jobPostings, job]);
        alert('Job created successfully!');
      }
      
      console.group('✅ JOB SAVED - RESPONSE FROM SERVER');
      console.log('Job ID:', job._id);
      console.log('Position:', job.position);
      console.log('applicationFormFields count:', job.applicationFormFields?.length || 0);
      if (job.applicationFormFields && job.applicationFormFields.length > 0) {
        console.log('Fields returned from server:');
        job.applicationFormFields.forEach((f, i) => {
          console.log(`  ${i+1}. ${f.fieldName} (${f.fieldType}) - Required: ${f.isRequired}`);
        });
      } else {
        console.warn('⚠️ WARNING: Server returned NO custom form fields!');
      }
      console.groupEnd();
      
      setEditId(null);
      setFormData(initialForm);
      setLogoPreview('');
      setLogoFile(null);
      
      // Refresh job listings to show updated logos
      const refreshedJobs = await getAllJobs();
      setJobPostings(refreshedJobs);
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
    console.log('Job applicationFormFields:', job.applicationFormFields);
    console.log('applicationFormFields type:', typeof job.applicationFormFields);
    console.log('applicationFormFields is array:', Array.isArray(job.applicationFormFields));
    console.log('applicationFormFields length:', job.applicationFormFields?.length || 0);
    
    // Create a copy of the job without the companyLogo field (handled separately)
    const { companyLogo, ...jobWithoutLogo } = job;
    
    // Ensure arrays are properly handled
    const editFormData = {
      ...jobWithoutLogo,
      eligibleCourses: Array.isArray(job.eligibleCourses) ? job.eligibleCourses : [],
      eligibleBranches: Array.isArray(job.eligibleBranches) ? job.eligibleBranches : [],
      eligibleYears: Array.isArray(job.eligibleYears) ? job.eligibleYears : [],
      jobApplicationType: job.jobApplicationType || 'on-campus',
      externalApplicationLink: job.externalApplicationLink || '',
      applicationFormFields: Array.isArray(job.applicationFormFields) ? job.applicationFormFields : []
    };
    
    console.log('✅ Loaded applicationFormFields for edit:', editFormData.applicationFormFields);
    console.log('Form data for edit (without companyLogo):', editFormData); // Debug log
    
    setFormData(editFormData);
    setEditId(job._id);
    setActiveTab('create');
    
    // Handle logo preview
    if (job.companyLogo) {
      setLogoPreview(`${API_ENDPOINTS.UPLOADS}${job.companyLogo}?t=${Date.now()}`);
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
              <h2>Job Application Type</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Application Type*</label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="jobApplicationType"
                        value="on-campus"
                        checked={formData.jobApplicationType === 'on-campus'}
                        onChange={handleInputChange}
                      />
                      <span>On-Campus</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="jobApplicationType"
                        value="off-campus"
                        checked={formData.jobApplicationType === 'off-campus'}
                        onChange={handleInputChange}
                      />
                      <span>Off-Campus</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {formData.jobApplicationType === 'on-campus' ? (
                <div className="form-group">
                  <label>Application Form Fields</label>
                  <p className="form-hint">Create a custom application form for students</p>
                  <DynamicFormFieldBuilder 
                    initialFields={formData.applicationFormFields}
                    onChange={(fields) => setFormData({ ...formData, applicationFormFields: fields })}
                  />
                  
                  {/* Show summary of created fields */}
                  {formData.applicationFormFields && formData.applicationFormFields.length > 0 && (
                    <div className="form-fields-summary" style={{
                      marginTop: '15px',
                      padding: '12px',
                      backgroundColor: '#f0f7ff',
                      border: '1px solid #d0e8ff',
                      borderRadius: '4px'
                    }}>
                      <h4 style={{ margin: '0 0 10px 0', color: '#0066cc' }}>
                        ✅ Created Fields ({formData.applicationFormFields.length}):
                      </h4>
                      <ul style={{ margin: '0', paddingLeft: '20px' }}>
                        {formData.applicationFormFields.map((field, idx) => (
                          <li key={idx} style={{ marginBottom: '5px', fontSize: '14px' }}>
                            <strong>{field.fieldName}</strong> ({field.fieldType})
                            {field.isRequired && <span style={{ color: 'red' }}> *</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="form-group">
                  <label>External Application Link*</label>
                  <input
                    type="url"
                    name="externalApplicationLink"
                    value={formData.externalApplicationLink}
                    onChange={handleInputChange}
                    placeholder="https://example.com/apply"
                    required={formData.jobApplicationType === 'off-campus'}
                  />
                  <p className="form-hint">Students will be redirected to this link to apply</p>
                </div>
              )}
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
          <th>Application Type</th>
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
                {posting.companyLogo ? (
                  <img 
                    src={
                      posting.companyLogo.startsWith('http') 
                        ? posting.companyLogo 
                        : `${API_ENDPOINTS.UPLOADS}${posting.companyLogo}?t=${Date.now()}`
                    }
                    alt={posting.companyName}
                    className="company-logo-small"
                    onError={(e) => {
                      // If logo fails to load, hide image and show initials
                      e.target.style.display = 'none';
                      const initialsDiv = e.target.nextSibling;
                      if (initialsDiv) initialsDiv.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className="company-initials-small"
                  style={{ 
                    display: posting.companyLogo ? 'none' : 'flex',
                    width: '30px',
                    height: '30px',
                    backgroundColor: '#8B0000',
                    color: 'white',
                    borderRadius: '6px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginRight: '8px',
                    flexShrink: 0
                  }}
                >
                  {posting.companyName ? posting.companyName.split(' ').map(word => word.charAt(0).toUpperCase()).slice(0, 2).join('') : 'CO'}
                </div>
                {posting.companyName}
              </div>
            </td>
            <td>{posting.position || '-'}</td>
            <td>{posting.jobType || '-'}</td>
            <td>
              <span className={`app-type-badge ${posting.jobApplicationType || 'on-campus'}`}>
                {posting.jobApplicationType === 'off-campus' ? 'Off-Campus' : 'On-Campus'}
              </span>
            </td>
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