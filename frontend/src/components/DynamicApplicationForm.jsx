import React, { useState } from 'react';
import './DynamicApplicationForm.css';
import { submitApplication } from '../../api/jobs';
import toast from 'react-hot-toast';

const DynamicApplicationForm = ({ jobId, job, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({});
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const userId = localStorage.getItem('userId');
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;
  
  // Use custom fields if available, otherwise use default fields
  const fieldsToUse = (job && job.applicationFormFields && job.applicationFormFields.length > 0) 
    ? job.applicationFormFields 
    : [
        { fieldId: 'name', fieldName: 'Full Name', fieldType: 'text', isRequired: true, placeholder: 'Enter your full name' },
        { fieldId: 'email', fieldName: 'Email', fieldType: 'email', isRequired: true, placeholder: 'Enter your email address' },
        { fieldId: 'phone', fieldName: 'Phone Number', fieldType: 'text', isRequired: true, placeholder: 'Enter your phone number' }
      ];

  const isUsingDefaultFields = !job || !job.applicationFormFields || job.applicationFormFields.length === 0;
  
  console.log('🔵 DynamicApplicationForm MOUNTED');
  console.log('  Job:', job?.position || 'N/A');
  console.log('  Job ID:', job?._id);
  console.log('  ❌ ISSUE DIAGNOSIS:');
  console.log('     - job exists?', !!job);
  console.log('     - job.applicationFormFields exists?', !!job?.applicationFormFields);
  console.log('     - job.applicationFormFields is array?', Array.isArray(job?.applicationFormFields));
  console.log('     - Custom fields count:', job?.applicationFormFields?.length || 0);
  console.log('     - Custom fields data:', job?.applicationFormFields);
  console.log('  Fields to use count:', fieldsToUse.length);
  console.log('  All fields to render:', fieldsToUse.map(f => ({ name: f.fieldName, type: f.fieldType })));
  console.log('  Using default fields:', isUsingDefaultFields);
  console.log('  onClose function:', typeof onClose);
  
  // Extract jobId from job object if not provided separately
  const actualJobId = jobId || job?._id;

  // Validate form before submission
  const validateForm = () => {
    console.log('\n🔍 VALIDATING FORM...');
    const newErrors = {};
    
    if (!fieldsToUse || fieldsToUse.length === 0) {
      console.log('  ⚠️ No fields to validate');
      return newErrors;
    }

    console.log(`  Checking ${fieldsToUse.length} fields for validation`);
    console.log(`  Current resumeFile state:`, resumeFile?.name || 'NONE');
    
    fieldsToUse.forEach(field => {
      // Check for resume file fields separately
      const isResumeField = field.fieldType === 'file' && field.fieldName.toLowerCase().includes('resume');
      
      if (isResumeField) {
        console.log(`    📄 Resume field: "${field.fieldName}", Required:${field.isRequired}`);
        
        if (field.isRequired) {
          if (!resumeFile) {
            console.log(`      ❌ Resume is REQUIRED but NOT uploaded`);
            newErrors[`${field.fieldId}_resume`] = 'Resume is required';
          } else {
            console.log(`      ✅ Resume uploaded and required: ${resumeFile.name}`);
          }
        } else {
          console.log(`      ℹ️ Resume is optional - skipping validation`);
        }
        return; // Skip normal validation for file fields
      }
      
      // Normal field validation
      if (field.isRequired) {
        const value = formData[field.fieldId];
        const isEmpty = !value || 
          (typeof value === 'string' && value.trim() === '') ||
          (Array.isArray(value) && value.length === 0);
        
        if (isEmpty) {
          console.log(`    ❌ Required field empty: ${field.fieldName}`);
          newErrors[field.fieldId] = `${field.fieldName} is required`;
        } else {
          console.log(`    ✅ Required field filled: ${field.fieldName}`);
        }
      }
    });

    console.log(`  ✅ Validation complete: ${Object.keys(newErrors).length} error(s)\n`);
    return newErrors;
  };

  const handleFieldChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    // Clear error for this field
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const handleResumeChange = (e, fieldId) => {
    const file = e.target.files?.[0];
    
    console.log(`📄 Resume file selected for field: ${fieldId}`);
    console.log(`   Files array:`, e.target.files);
    console.log(`   Selected file:`, file?.name || 'NONE');
    
    if (!file) {
      console.log('   ❌ No file selected');
      return;
    }
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      console.error('❌ Invalid file type:', file.type);
      toast.error('Only PDF and DOC files are allowed');
      e.target.value = '';
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.error('❌ File too large:', (file.size / 1024 / 1024).toFixed(2), 'MB');
      toast.error('Resume size must be less than 5MB');
      e.target.value = '';
      return;
    }

    console.log('✅ File validation passed');
    console.log('   Name:', file.name);
    console.log('   Type:', file.type);
    console.log('   Size:', (file.size / 1024).toFixed(2), 'KB');
    
    // Set resume file
    setResumeFile(file);
    console.log('✅ Resume file state updated');
    
    // Clear any resume errors
    if (errors[`${fieldId}_resume`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${fieldId}_resume`];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.group('📝 FORM SUBMIT ATTEMPTED');
    console.log('Current formData:', formData);
    console.log('Current errors:', errors);
    console.log('Resume file:', resumeFile?.name || 'None');
    
    // Validate form
    const formErrors = validateForm();
    console.log('Validation result:', formErrors);
    
    if (Object.keys(formErrors).length > 0) {
      console.log('❌ Validation failed - not submitting');
      setErrors(formErrors);
      toast.error('Please fill all required fields');
      console.groupEnd();
      return;
    }

    // Safety check: Ensure at least one field is filled
    const hasFilledData = Object.values(formData).some(value => 
      value && (typeof value === 'string' ? value.trim() : value)
    );
    
    const hasResume = resumeFile !== null;
    
    if (!hasFilledData && !hasResume) {
      console.log('❌ Safety check failed - no data filled');
      toast.error('Please fill at least one field in the form');
      console.groupEnd();
      return;
    }
    
    console.log('✅ Validation passed - proceeding with submission');
    
    // SAFETY: Never allow submission with completely empty form
    const allFieldsEmpty = fieldsToUse.every(field => 
      !formData[field.fieldId] || 
      (typeof formData[field.fieldId] === 'string' && !formData[field.fieldId].trim())
    );
    
    if (allFieldsEmpty && !resumeFile) {
      console.log('🚫 BLOCKING: All fields are empty! Form must have data!');
      toast.error('❌ Cannot submit completely empty form! Please fill at least one field.');
      console.groupEnd();
      return;
    }
    
    console.log('✅ Data validation passed - submitting...');
    console.groupEnd();

    setLoading(true);

    try {
      // Prepare FormData for submission
      const formDataToSend = new FormData();
      
      formDataToSend.append('jobId', actualJobId);
      if (userId) {
        formDataToSend.append('userId', userId);
      }

      // Build form responses array - handles both custom and default fields
      const formResponses = fieldsToUse.map(field => ({
        fieldId: field.fieldId,
        fieldLabel: field.fieldName,
        response: formData[field.fieldId] || '',
        fieldType: field.fieldType
      }));

      formDataToSend.append('formResponses', JSON.stringify(formResponses));

      // Prepare applicant data from form
      const applicantData = {
        applicantName: formData.name || formData.fullName || user?.name || '',
        applicantEmail: formData.email || user?.email || '',
        applicantPhone: formData.phone || '',
        applicantBranch: formData.branch || '',
        applicantYear: formData.year || '',
        applicantCourse: formData.course || ''
      };

      formDataToSend.append('applicantData', JSON.stringify(applicantData));

      // Add resume file if present
      console.log('\n🔍 CHECKING RESUME BEFORE SUBMISSION:');
      console.log('   resumeFile exists:', !!resumeFile);
      console.log('   resumeFile name:', resumeFile?.name || 'NONE');
      console.log('   resumeFile size:', resumeFile?.size || 'NONE');
      
      if (resumeFile) {
        console.log('📎 APPENDING RESUME TO FORMDATA');
        formDataToSend.append('resume', resumeFile);
        console.log('✅ Resume appended. Contents:');
        for (let [key, value] of formDataToSend.entries()) {
          if (value instanceof File) {
            console.log(`   ${key}: [FILE] ${value.name} (${value.size} bytes)`);
          } else if (typeof value === 'string' && value.length > 100) {
            console.log(`   ${key}: [JSON] length: ${value.length}`);
          } else {
            console.log(`   ${key}: ${value}`);
          }
        }
      } else {
        console.warn('⚠️ NO RESUME FILE - Submitting without resume');
      }

      console.log('📤 Calling submitApplication()...');
      const response = await submitApplication(formDataToSend);
      
      console.log('Application submitted successfully:', response);
      toast.success('Application submitted successfully!');
      
      if (onSuccess) {
        onSuccess();
      }
      
      if (onClose) {
        setTimeout(() => onClose(), 1500);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(error.response?.data?.error || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  // Job validation check
  if (!job) {
    console.error('❌ NO JOB PROVIDED');
    return (
      <div className="application-form-error">
        <p>❌ Job information not available</p>
        <button onClick={onClose} className="error-close-btn">Close</button>
      </div>
    );
  }

  console.log('✅ FORM WILL RENDER with fields:', fieldsToUse.map(f => ({ name: f.fieldName, required: f.isRequired })));

  return (
    <div className="dynamic-application-form">
      <div className="form-header">
        <h2>Apply for {job.position}</h2>
        <p className="company-name">{job.companyName}</p>
        {isUsingDefaultFields && <p className="form-note" style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>✓ Standard application form</p>}
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-fields-container">
          {fieldsToUse.map((field, index) => (
            <div key={field.fieldId} className="form-field-group">
              <label className="field-label">
                {field.fieldName}
                {field.isRequired && <span className="required-indicator">*</span>}
              </label>

              {/* Text Input */}
              {field.fieldType === 'text' && (
                <input
                  type="text"
                  className={`form-input ${errors[field.fieldId] ? 'error' : ''}`}
                  value={formData[field.fieldId] || ''}
                  onChange={(e) => handleFieldChange(field.fieldId, e.target.value)}
                  placeholder={field.placeholder || `Enter ${field.fieldName.toLowerCase()}`}
                  required={field.isRequired}
                />
              )}

              {/* Email Input */}
              {field.fieldType === 'email' && (
                <input
                  type="email"
                  className={`form-input ${errors[field.fieldId] ? 'error' : ''}`}
                  value={formData[field.fieldId] || ''}
                  onChange={(e) => handleFieldChange(field.fieldId, e.target.value)}
                  placeholder={field.placeholder || 'Enter email address'}
                  required={field.isRequired}
                />
              )}

              {/* Phone Input */}
              {field.fieldType === 'phone' && (
                <input
                  type="tel"
                  className={`form-input ${errors[field.fieldId] ? 'error' : ''}`}
                  value={formData[field.fieldId] || ''}
                  onChange={(e) => handleFieldChange(field.fieldId, e.target.value)}
                  placeholder={field.placeholder || 'Enter phone number'}
                  pattern="[0-9-+() ]+"
                  required={field.isRequired}
                />
              )}

              {/* Number Input */}
              {field.fieldType === 'number' && (
                <input
                  type="number"
                  className={`form-input ${errors[field.fieldId] ? 'error' : ''}`}
                  value={formData[field.fieldId] || ''}
                  onChange={(e) => handleFieldChange(field.fieldId, e.target.value)}
                  placeholder={field.placeholder || `Enter ${field.fieldName.toLowerCase()}`}
                  step="0.01"
                  required={field.isRequired}
                />
              )}

              {/* Textarea */}
              {field.fieldType === 'textarea' && (
                <textarea
                  className={`form-textarea ${errors[field.fieldId] ? 'error' : ''}`}
                  value={formData[field.fieldId] || ''}
                  onChange={(e) => handleFieldChange(field.fieldId, e.target.value)}
                  placeholder={field.placeholder || `Enter ${field.fieldName.toLowerCase()}`}
                  rows="4"
                  required={field.isRequired}
                />
              )}

              {/* Select Dropdown */}
              {field.fieldType === 'select' && (
                <select
                  className={`form-select ${errors[field.fieldId] ? 'error' : ''}`}
                  value={formData[field.fieldId] || ''}
                  onChange={(e) => handleFieldChange(field.fieldId, e.target.value)}
                  required={field.isRequired}
                >
                  <option value="">Select {field.fieldName}</option>
                  {field.options && field.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}

              {/* Checkbox */}
              {field.fieldType === 'checkbox' && (
                <div className="checkbox-group">
                  {field.options && field.options.map(option => (
                    <label key={option} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData[field.fieldId]?.includes(option) || false}
                        onChange={(e) => {
                          const current = formData[field.fieldId] || [];
                          const updated = e.target.checked
                            ? [...current, option]
                            : current.filter(item => item !== option);
                          handleFieldChange(field.fieldId, updated);
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}

              {/* Radio */}
              {field.fieldType === 'radio' && (
                <div className="radio-group">
                  {field.options && field.options.map(option => (
                    <label key={option} className="radio-label">
                      <input
                        type="radio"
                        name={field.fieldId}
                        value={option}
                        checked={formData[field.fieldId] === option}
                        onChange={(e) => handleFieldChange(field.fieldId, e.target.value)}
                        required={field.isRequired}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}

              {/* Date Input */}
              {field.fieldType === 'date' && (
                <input
                  type="date"
                  className={`form-input ${errors[field.fieldId] ? 'error' : ''}`}
                  value={formData[field.fieldId] || ''}
                  onChange={(e) => handleFieldChange(field.fieldId, e.target.value)}
                  required={field.isRequired}
                />
              )}

              {/* File Input (Resume) */}
              {field.fieldType === 'file' && field.fieldName.toLowerCase().includes('resume') && (
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    id={`resume-${field.fieldId}`}
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleResumeChange(e, field.fieldId)}
                    className="file-input"
                    required={field.isRequired}
                  />
                  <label htmlFor={`resume-${field.fieldId}`} className="file-input-label">
                    <span className="file-icon">📄</span>
                    <span className="file-text">
                      {resumeFile ? resumeFile.name : `Choose resume (PDF or DOC)${field.isRequired ? '*' : ''}`}
                    </span>
                  </label>
                  {resumeFile && <p className="file-size">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>}
                </div>
              )}

              {/* Error Message */}
              {errors[field.fieldId] && (
                <span className="error-message">{errors[field.fieldId]}</span>
              )}
              {errors[`${field.fieldId}_resume`] && (
                <span className="error-message">{errors[`${field.fieldId}_resume`]}</span>
              )}

              {/* Help Text */}
              {field.helpText && (
                <p className="help-text">{field.helpText}</p>
              )}
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={onClose}
            className="btn-cancel"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicApplicationForm;
