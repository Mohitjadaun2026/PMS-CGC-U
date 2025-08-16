import React, { useState, useEffect } from "react";
import "./AdminJobPosting.css";
import { API_ENDPOINTS } from "../config/api";
import { showSuccessToast, showErrorToast } from "../utils/toastConfig";
import {
  FiEdit2,
  FiTrash2,
  FiUpload,
  FiCheck,
  FiX,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import {
  MdWork,
  MdBusiness,
  MdDescription,
  MdSchool,
  MdEvent,
  MdLocationOn,
  MdAttachMoney,
  MdContacts,
} from "react-icons/md";

const initialForm = {
  companyName: "",
  companyLogo: "",
  companyWebsite: "",
  position: "",
  jobType: "Full-time",
  salaryPackage: "",
  location: "",
  applicationDeadline: "",
  jobDescription: "",
  skillsRequired: "",
  selectionProcess: "",
  bondDetails: "",
  benefits: "",
  contactPerson: "",
  contactEmail: "",
  contactPhone: "",
  driveDate: "",
  additionalInfo: "",
  eligibleCourses: [],
  eligibleBranches: [],
  eligibleYears: [],
};

const COURSES = ["BTech", "BSc", "BBA", "MBA", "MTech", "MCA", "PhD"];
const BRANCHES = ["CSE", "IT", "ECE", "EEE", "ME", "CE", "AIML", "DS", "CSIT"];
const YEARS = ["2023", "2024", "2025", "2026", "2027"];

const AdminJobPosting = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [logoPreview, setLogoPreview] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [activeTab, setActiveTab] = useState("create");
  const [expandedSections, setExpandedSections] = useState({
    company: true,
    jobDetails: true,
    requirements: true,
    eligibility: true,
    additional: true,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "applicationDeadline",
    direction: "asc",
  });

  // Fetch jobs from backend
  useEffect(() => {
    fetch(API_ENDPOINTS.JOBS)
      .then((res) => res.json())
      .then((data) => setJobPostings(data));
  }, []);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (field, value) => {
    const currentValues = formData[field] || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    setFormData({
      ...formData,
      [field]: updatedValues,
    });
  };

  const handleSelectAll = (field, options) => {
    const currentValues = formData[field] || [];
    const allSelected = options.every((option) =>
      currentValues.includes(option)
    );

    setFormData({
      ...formData,
      [field]: allSelected ? [] : options,
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setLogoFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.eligibleCourses.length === 0) {
      showErrorToast("Please select at least one eligible course.");
      return;
    }
    if (formData.eligibleYears.length === 0) {
      showErrorToast("Please select at least one eligible year.");
      return;
    }

    if (logoFile) {
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item) => {
            form.append(`${key}[]`, item);
          });
        } else {
          form.append(key, formData[key]);
        }
      });

      form.append("companyLogo", logoFile);

      const url = editId
        ? `${API_ENDPOINTS.JOBS}/${editId}`
        : API_ENDPOINTS.JOBS;

      fetch(url, {
        method: editId ? "PUT" : "POST",
        body: form,
      })
        .then((res) => res.json())
        .then(handleSuccess)
        .catch(handleError);
    } else {
      const url = editId
        ? `${API_ENDPOINTS.JOBS}/${editId}`
        : API_ENDPOINTS.JOBS;

      fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then(handleSuccess)
        .catch(handleError);
    }
  };

  const handleSuccess = (job) => {
    if (editId) {
      setJobPostings(jobPostings.map((j) => (j._id === editId ? job : j)));
      showSuccessToast("Job updated successfully!");
      setActiveTab("manage");
    } else {
      setJobPostings([...jobPostings, job]);
      showSuccessToast("Job created successfully!");
    }

    setEditId(null);
    setFormData(initialForm);
    setLogoPreview("");
    setLogoFile(null);
  };

  const handleError = (err) => {
    console.error("Error saving job:", err);
    showErrorToast("Error saving job. Please try again.");
  };

  const handleEdit = (job) => {
    const editFormData = {
      ...job,
      eligibleCourses: Array.isArray(job.eligibleCourses)
        ? job.eligibleCourses
        : [],
      eligibleBranches: Array.isArray(job.eligibleBranches)
        ? job.eligibleBranches
        : [],
      eligibleYears: Array.isArray(job.eligibleYears) ? job.eligibleYears : [],
    };

    setFormData(editFormData);
    setEditId(job._id);
    setActiveTab("create");

    if (job.companyLogo) {
      setLogoPreview(`${API_ENDPOINTS.UPLOADS}${job.companyLogo}`);
    } else {
      setLogoPreview("");
    }
    setLogoFile(null);
  };

  const handleDelete = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      fetch(`${API_ENDPOINTS.JOBS}/${jobId}`, { method: "DELETE" }).then(() => {
        setJobPostings(jobPostings.filter((job) => job._id !== jobId));
        showSuccessToast("Job deleted successfully!");
      });
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData(initialForm);
    setLogoPreview("");
    setLogoFile(null);
    setActiveTab("manage");
  };

  const handleTabChange = (tab) => {
    if (tab === "manage" && editId) {
      setEditId(null);
      setFormData(initialForm);
      setLogoPreview("");
      setLogoFile(null);
    }
    setActiveTab(tab);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedJobPostings = React.useMemo(() => {
    let sortableItems = [...jobPostings];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [jobPostings, sortConfig]);

  const filteredJobPostings = sortedJobPostings.filter(
    (job) =>
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? <FiChevronUp /> : <FiChevronDown />;
  };

  return (
    <div className="admin-job-posting-container">
      <div className="admin-header">
        <h1>
          <MdWork className="header-icon" />
          Job Posting Management
        </h1>
        <div className="admin-controls">
          {activeTab === "manage" && (
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === "create" ? "active" : ""}
          onClick={() => handleTabChange("create")}
        >
          {editId ? (
            <>
              <FiEdit2 /> Edit Job
            </>
          ) : (
            <>
              <MdWork /> Create New Job
            </>
          )}
        </button>
        <button
          className={activeTab === "manage" ? "active" : ""}
          onClick={() => handleTabChange("manage")}
        >
          <MdBusiness /> Manage Jobs
        </button>
      </div>

      {activeTab === "create" ? (
        <form
          onSubmit={handleSubmit}
          className="job-posting-form"
          encType="multipart/form-data"
        >
          {/* Company Information Section */}
          <div className="form-section">
            <div
              className="section-header"
              onClick={() => toggleSection("company")}
            >
              <h2>
                <MdBusiness /> Company Information
              </h2>
              {expandedSections.company ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedSections.company && (
              <div className="section-content">
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <MdBusiness /> Company Name*
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter company name"
                    />
                  </div>
                  <div className="form-group logo">
                    <label className="xyz">
                      <FiUpload /> Company Logo
                    </label>
                    <div className="logo-upload-container">
                      <label className="logo-upload-label">
                        {logoPreview ? (
                          <div className="logo-preview-container">
                            <img
                              src={logoPreview}
                              alt="Company Logo Preview"
                              className="logo-preview"
                            />
                            <div className="logo-overlay">
                              <FiUpload className="upload-icon" />
                              <span>Change Logo</span>
                            </div>
                          </div>
                        ) : (
                          <div className="logo-upload-placeholder">
                            <FiUpload className="upload-icon" />
                            <span>Upload Logo</span>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="logo-upload-input"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <MdContacts /> Contact Person*
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      required
                      placeholder="Contact person name"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <MdContacts /> Contact Email*
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      required
                      placeholder="contact@company.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <MdContacts /> Contact Phone
                    </label>
                    <input
                      type="text"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    <MdBusiness /> Company Website
                  </label>
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleInputChange}
                    placeholder="https://www.company.com"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Job Details Section */}
          <div className="form-section">
            <div
              className="section-header"
              onClick={() => toggleSection("jobDetails")}
            >
              <h2>
                <MdWork /> Job Details
              </h2>
              {expandedSections.jobDetails ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </div>
            {expandedSections.jobDetails && (
              <div className="section-content">
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <MdWork /> Position Title*
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      placeholder="Job position title"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <MdWork /> Job Type*
                    </label>
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
                    <label>
                      <MdAttachMoney /> Salary Package*
                    </label>
                    <input
                      type="text"
                      name="salaryPackage"
                      value={formData.salaryPackage}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 6 LPA or $50,000"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <MdLocationOn /> Location*
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="Job location"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <MdEvent /> Drive Date
                    </label>
                    <input
                      type="date"
                      name="driveDate"
                      value={formData.driveDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <MdEvent /> Application Deadline*
                    </label>
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
            )}
          </div>

          {/* Job Requirements Section */}
          <div className="form-section">
            <div
              className="section-header"
              onClick={() => toggleSection("requirements")}
            >
              <h2>
                <MdDescription /> Job Requirements
              </h2>
              {expandedSections.requirements ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </div>
            {expandedSections.requirements && (
              <div className="section-content">
                <div className="form-group">
                  <label>
                    <MdDescription /> Job Description*
                  </label>
                  <textarea
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="Detailed job description..."
                  />
                </div>
                <div className="form-group">
                  <label>
                    <MdDescription /> Skills Required*
                  </label>
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
            )}
          </div>

          {/* Eligibility Section */}
          <div className="form-section">
            <div
              className="section-header"
              onClick={() => toggleSection("eligibility")}
            >
              <h2>
                <MdSchool /> Eligibility Details
              </h2>
              {expandedSections.eligibility ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </div>
            {expandedSections.eligibility && (
              <div className="section-content">
                <div className="form-group">
                  <label>Eligible Courses*</label>
                  <div className="selection-controls">
                    <button
                      type="button"
                      className="select-all-btn"
                      onClick={() =>
                        handleSelectAll("eligibleCourses", COURSES)
                      }
                    >
                      {formData.eligibleCourses.length === COURSES.length ? (
                        <>
                          <FiX /> Clear All
                        </>
                      ) : (
                        <>
                          <FiCheck /> Select All
                        </>
                      )}
                    </button>
                  </div>
                  <div className="checkbox-grid">
                    {COURSES.map((course) => (
                      <label key={course} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={formData.eligibleCourses.includes(course)}
                          onChange={() =>
                            handleCheckboxChange("eligibleCourses", course)
                          }
                        />
                        <span className="checkbox-custom"></span>
                        <span className="checkbox-label">{course}</span>
                      </label>
                    ))}
                  </div>
                  {formData.eligibleCourses.length > 0 && (
                    <div className="selected-items">
                      <span className="selected-label">Selected: </span>
                      {formData.eligibleCourses.join(", ")}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Eligible Branches (for technical courses)</label>
                  <div className="selection-controls">
                    <button
                      type="button"
                      className="select-all-btn"
                      onClick={() =>
                        handleSelectAll("eligibleBranches", BRANCHES)
                      }
                    >
                      {formData.eligibleBranches.length === BRANCHES.length ? (
                        <>
                          <FiX /> Clear All
                        </>
                      ) : (
                        <>
                          <FiCheck /> Select All
                        </>
                      )}
                    </button>
                  </div>
                  <div className="checkbox-grid">
                    {BRANCHES.map((branch) => (
                      <label key={branch} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={formData.eligibleBranches.includes(branch)}
                          onChange={() =>
                            handleCheckboxChange("eligibleBranches", branch)
                          }
                        />
                        <span className="checkbox-custom"></span>
                        <span className="checkbox-label">{branch}</span>
                      </label>
                    ))}
                  </div>
                  {formData.eligibleBranches.length > 0 && (
                    <div className="selected-items">
                      <span className="selected-label">Selected: </span>
                      {formData.eligibleBranches.join(", ")}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Eligible Years*</label>
                  <div className="selection-controls">
                    <button
                      type="button"
                      className="select-all-btn"
                      onClick={() => handleSelectAll("eligibleYears", YEARS)}
                    >
                      {formData.eligibleYears.length === YEARS.length ? (
                        <>
                          <FiX /> Clear All
                        </>
                      ) : (
                        <>
                          <FiCheck /> Select All
                        </>
                      )}
                    </button>
                  </div>
                  <div className="checkbox-grid">
                    {YEARS.map((year) => (
                      <label key={year} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={formData.eligibleYears.includes(year)}
                          onChange={() =>
                            handleCheckboxChange("eligibleYears", year)
                          }
                        />
                        <span className="checkbox-custom"></span>
                        <span className="checkbox-label">{year}</span>
                      </label>
                    ))}
                  </div>
                  {formData.eligibleYears.length > 0 && (
                    <div className="selected-items">
                      <span className="selected-label">Selected: </span>
                      {formData.eligibleYears.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Additional Information Section */}
          <div className="form-section">
            <div
              className="section-header"
              onClick={() => toggleSection("additional")}
            >
              <h2>
                <MdDescription /> Additional Information
              </h2>
              {expandedSections.additional ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </div>
            {expandedSections.additional && (
              <div className="section-content">
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
                    placeholder="Any other relevant information"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {editId ? (
                <>
                  <FiEdit2 /> Update Job Posting
                </>
              ) : (
                <>
                  <MdWork /> Create Job Posting
                </>
              )}
            </button>
            {editId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                <FiX /> Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="job-postings-list">
          <div className="list-header">
            <h2>
              <MdBusiness /> Manage Job Postings ({filteredJobPostings.length})
            </h2>
          </div>
          {filteredJobPostings.length === 0 ? (
            <div className="no-postings">
              <div className="empty-state">
                <MdWork className="empty-icon" />
                <h3>No job postings found</h3>
                <p>
                  {searchTerm
                    ? "Try a different search term"
                    : "Create your first job posting"}
                </p>
                <button
                  onClick={() => handleTabChange("create")}
                  className="create-first-btn"
                >
                  <MdWork /> Create New Job
                </button>
              </div>
            </div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th onClick={() => handleSort("companyName")}>
                      <div className="th-content">
                        Company {renderSortIcon("companyName")}
                      </div>
                    </th>
                    <th onClick={() => handleSort("position")}>
                      <div className="th-content">
                        Position {renderSortIcon("position")}
                      </div>
                    </th>
                    <th onClick={() => handleSort("jobType")}>
                      <div className="th-content">
                        Job Type {renderSortIcon("jobType")}
                      </div>
                    </th>
                    <th onClick={() => handleSort("salaryPackage")}>
                      <div className="th-content">
                        Package {renderSortIcon("salaryPackage")}
                      </div>
                    </th>
                    <th onClick={() => handleSort("applicationDeadline")}>
                      <div className="th-content">
                        Deadline {renderSortIcon("applicationDeadline")}
                      </div>
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobPostings.map((posting) => (
                    <tr key={posting._id}>
                      <td>
                        <div className="company-cell">
                          {posting.companyLogo && (
                            <img
                              src={
                                posting.companyLogo.startsWith("http")
                                  ? posting.companyLogo
                                  : `${API_ENDPOINTS.UPLOADS}${posting.companyLogo}`
                              }
                              alt={posting.companyName}
                              className="company-logo-small"
                              onError={(e) => {
                                e.target.src = "/default-logo.png";
                                e.target.onerror = null;
                              }}
                            />
                          )}
                          <div className="company-info">
                            <div className="company-name">
                              {posting.companyName}
                            </div>
                            <div className="company-location">
                              <MdLocationOn /> {posting.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="position-cell">
                          <div className="position-title">
                            {posting.position || "-"}
                          </div>
                          <div className="job-type-badge">
                            {posting.jobType || "-"}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="job-type-cell">
                          {posting.jobType || "-"}
                        </div>
                      </td>
                      <td>
                        <div className="salary-cell">
                          {posting.salaryPackage || "-"}
                        </div>
                      </td>
                      <td>
                        <div className="deadline-cell">
                          {posting.applicationDeadline
                            ? new Date(
                                posting.applicationDeadline
                              ).toLocaleDateString()
                            : "-"}
                          {posting.applicationDeadline &&
                            new Date(posting.applicationDeadline) <
                              new Date() && (
                              <span className="deadline-passed">(Expired)</span>
                            )}
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            onClick={() => handleEdit(posting)}
                            className="edit-btn"
                            title="Edit"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDelete(posting._id)}
                            className="delete-btn"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminJobPosting;
