import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Building2, 
  Briefcase, 
  Calendar, 
  MapPin, 
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  X,
  Save,
  ArrowLeft,
  Upload,
  Eye,
  Filter,
  Search,
  MoreVertical,
  Phone,
  Mail,
  Globe,
  User
} from "lucide-react";

// Mock API endpoints for demo
const API_ENDPOINTS = {
  JOBS: '/api/jobs',
  UPLOADS: '/uploads/'
};

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

const COURSES = ['BTech', 'BSc', 'BBA', 'MBA', 'MTech', 'MCA', 'PhD'];
const BRANCHES = ['CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE', 'AIML', 'DS', 'CSIT'];
const YEARS = ['2023', '2024', '2025', '2026', '2027'];

const AdminJobPosting = () => {
  const [jobPostings, setJobPostings] = useState([
    {
      _id: '1',
      companyName: 'Google Inc.',
      position: 'Software Engineer',
      jobType: 'Full-time',
      salaryPackage: '₹45 LPA',
      location: 'Bangalore',
      eligibleCourses: ['BTech', 'MTech'],
      eligibleBranches: ['CSE', 'IT'],
      eligibleYears: ['2024', '2025'],
      applicationDeadline: '2024-12-31',
      companyLogo: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      status: 'active',
      contactPerson: 'John Doe',
      contactEmail: 'john@google.com',
      contactPhone: '+91 9876543210'
    },
    {
      _id: '2',
      companyName: 'Microsoft',
      position: 'Product Manager',
      jobType: 'Full-time',
      salaryPackage: '₹42 LPA',
      location: 'Hyderabad',
      eligibleCourses: ['BTech', 'MBA'],
      eligibleBranches: ['CSE', 'IT', 'ECE'],
      eligibleYears: ['2024'],
      applicationDeadline: '2024-11-30',
      status: 'active',
      contactPerson: 'Jane Smith',
      contactEmail: 'jane@microsoft.com',
      contactPhone: '+91 9876543211'
    },
    {
      _id: '3',
      companyName: 'Amazon',
      position: 'DevOps Engineer',
      jobType: 'Full-time',
      salaryPackage: '₹38 LPA',
      location: 'Chennai',
      eligibleCourses: ['BTech', 'MTech'],
      eligibleBranches: ['CSE', 'IT'],
      eligibleYears: ['2024', '2025'],
      applicationDeadline: '2024-12-15',
      status: 'active',
      contactPerson: 'Alex Johnson',
      contactEmail: 'alex@amazon.com',
      contactPhone: '+91 9876543212'
    }
  ]);
  
  const [formData, setFormData] = useState(initialForm);
  const [logoPreview, setLogoPreview] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [activeTab, setActiveTab] = useState('manage');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[id]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.eligibleCourses.length === 0) {
      alert('Please select at least one eligible course.');
      return;
    }
    if (formData.eligibleYears.length === 0) {
      alert('Please select at least one eligible year.');
      return;
    }

    // Simulate API call
    const newJob = {
      ...formData,
      _id: editId || Date.now().toString(),
      status: 'active'
    };

    if (editId) {
      setJobPostings(jobPostings.map(j => j._id === editId ? newJob : j));
      alert('Job updated successfully!');
    } else {
      setJobPostings([...jobPostings, newJob]);
      alert('Job created successfully!');
    }
    
    handleCancel();
  };

  const handleEdit = (job) => {
    const editFormData = {
      ...job,
      eligibleCourses: Array.isArray(job.eligibleCourses) ? job.eligibleCourses : [],
      eligibleBranches: Array.isArray(job.eligibleBranches) ? job.eligibleBranches : [],
      eligibleYears: Array.isArray(job.eligibleYears) ? job.eligibleYears : [],
    };
    
    setFormData(editFormData);
    setEditId(job._id);
    setActiveTab('create');
    
    if (job.companyLogo) {
      setLogoPreview(job.companyLogo);
    }
  };

  const handleDelete = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      setJobPostings(jobPostings.filter(job => job._id !== jobId));
      alert('Job deleted successfully!');
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData(initialForm);
    setLogoPreview('');
    setLogoFile(null);
    setActiveTab('manage');
  };

  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || job.jobType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                  Job Management
                </span>
              </h1>
              <p className="text-gray-400 text-lg">Create and manage job postings with advanced controls</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-400">{jobPostings.length}</div>
                <div className="text-sm text-gray-400">Active Jobs</div>
              </div>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="mt-8 flex items-center gap-1 bg-gray-900/50 p-1 rounded-2xl border border-gray-700/50 w-fit">
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'manage'
                  ? 'bg-yellow-400 text-black shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              Manage Jobs
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'create'
                  ? 'bg-yellow-400 text-black shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {editId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {editId ? 'Edit Job' : 'Create Job'}
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'manage' ? (
          <div className="space-y-8">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none transition-colors"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-2xl text-white focus:border-yellow-400/50 focus:outline-none transition-colors"
                >
                  <option value="all">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
                
                <button
                  onClick={() => setActiveTab('create')}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  New Job
                </button>
              </div>
            </div>

            {/* Jobs Grid */}
            <div className="grid gap-6">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-20">
                  <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No job postings found</h3>
                  <p className="text-gray-500 mb-6">Create your first job posting to get started</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transform transition-all duration-200"
                  >
                    Create Job Posting
                  </button>
                </div>
              ) : (
                filteredJobs.map((job, index) => (
                  <div
                    key={job._id}
                    className={`group relative p-6 bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-500 transform ${
                      isVisible.jobs ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    id={index === 0 ? "jobs" : ""}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          {job.companyLogo && (
                            <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-700/50 overflow-hidden">
                              <img
                                src={job.companyLogo}
                                alt={job.companyName}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/64/1f2937/ffffff?text=Logo';
                                }}
                              />
                            </div>
                          )}
                          <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                              {job.companyName}
                            </h3>
                            <p className="text-yellow-400 font-semibold">{job.position}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(job)}
                            className="p-2 bg-gray-800/50 hover:bg-yellow-400/20 border border-gray-700/50 hover:border-yellow-400/50 rounded-xl transition-all duration-200 text-gray-400 hover:text-yellow-400"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="p-2 bg-gray-800/50 hover:bg-red-400/20 border border-gray-700/50 hover:border-red-400/50 rounded-xl transition-all duration-200 text-gray-400 hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <Briefcase className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-400">{job.jobType}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-400">{job.salaryPackage}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-400">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-400">
                            {job.applicationDeadline ? new Date(job.applicationDeadline).toLocaleDateString() : 'No deadline'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.eligibleCourses?.map(course => (
                          <span key={course} className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-xs font-semibold border border-yellow-400/20">
                            {course}
                          </span>
                        ))}
                        {job.eligibleYears?.map(year => (
                          <span key={year} className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full text-xs font-semibold border border-blue-400/20">
                            {year}
                          </span>
                        ))}
                      </div>
                      
                      {job.eligibleBranches?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.eligibleBranches.map(branch => (
                            <span key={branch} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded-lg text-xs">
                              {branch}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Contact Info */}
                      <div className="grid md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-800/50">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <User className="w-3 h-3 text-yellow-400" />
                          <span>{job.contactPerson}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Mail className="w-3 h-3 text-yellow-400" />
                          <span>{job.contactEmail}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Phone className="w-3 h-3 text-yellow-400" />
                          <span>{job.contactPhone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          // Create/Edit Form
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={handleCancel}
                className="p-3 bg-gray-900/50 hover:bg-gray-800/50 border border-gray-700/50 rounded-2xl transition-all duration-200 text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {editId ? 'Edit Job Posting' : 'Create New Job Posting'}
                </h2>
                <p className="text-gray-400">Fill in the details to create an attractive job posting</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Company Information */}
              <div className="p-8 bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-yellow-400" />
                  Company Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">Company Name *</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none transition-colors"
                      placeholder="Enter company name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">Company Website</label>
                    <input
                      type="url"
                      name="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none transition-colors"
                      placeholder="https://www.company.com"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="text-sm font-semibold text-gray-300 mb-2 block">Company Logo</label>
                  <div className="flex items-center gap-4">
                    {logoPreview && (
                      <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-700/50 overflow-hidden">
                        <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-contain" />
                      </div>
                    )}
                    <label className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-gray-300 hover:border-yellow-400/50 transition-colors cursor-pointer">
                      <Upload className="w-4 h-4" />
                      Choose Logo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">Contact Person *</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none transition-colors"
                      placeholder="Contact person name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">Contact Email *</label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none transition-colors"
                      placeholder="contact@company.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">Contact Phone</label>
                    <input
                      type="text"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none transition-colors"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="p-8 bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-yellow-400" />
                  Job Details
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">Position Title *</label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none transition-colors"
                      placeholder="Software Engineer"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">Job Type *</label>
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white focus:border-yellow-400/50 focus:outline-none transition-colors"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">Salary Package *</label>
                    <input
                      type="text"
                      name="salaryPackage"
                      value={formData.salaryPackage}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none transition-colors"
                      placeholder="₹15 LPA"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none transition-colors"
                      placeholder="Bangalore, India"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">Drive Date</label>
                    <input
                      type="date"
                      name="driveDate"
                      value={formData.driveDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white focus:border-yellow-400/50 focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">Application Deadline *</label>
                    <input
                      type="date"
                      name="applicationDeadline"
                      value={formData.applicationDeadline}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white focus:border-yellow-400/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Eligibility Criteria */}
              <div className="p-8 bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-yellow-400" />
                  Eligibility Criteria
                </h3>
                
                {/* Eligible Courses */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-semibold text-gray-300">Eligible Courses *</label>
                    <button 
                      type="button" 
                      onClick={() => handleSelectAll('eligibleCourses', COURSES)}
                      className="px-3 py-1 bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/20 hover:border-yellow-400/40 rounded-xl text-yellow-400 text-xs font-semibold transition-all duration-200"
                    >
                      {formData.eligibleCourses.length === COURSES.length ? 'Clear All' : 'Select All'}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {COURSES.map(course => (
                      <label 
                        key={course} 
                        className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.eligibleCourses.includes(course)
                            ? 'bg-yellow-400/10 border-yellow-400/50 text-yellow-400'
                            : 'bg-gray-800/30 border-gray-700/50 text-gray-300 hover:border-gray-600/50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.eligibleCourses.includes(course)}
                          onChange={() => handleCheckboxChange('eligibleCourses', course)}
                          className="w-4 h-4 rounded border-gray-600 text-yellow-400 focus:ring-yellow-400/50 focus:ring-2"
                        />
                        <span className="text-sm font-medium">{course}</span>
                      </label>
                    ))}
                  </div>
                  
                  {formData.eligibleCourses.length > 0 && (
                    <div className="mt-4 p-3 bg-yellow-400/5 border border-yellow-400/20 rounded-xl">
                      <span className="text-sm text-yellow-400 font-semibold">Selected: </span>
                      <span className="text-sm text-gray-300">{formData.eligibleCourses.join(', ')}</span>
                    </div>
                  )}
                </div>

                {/* Eligible Branches */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-semibold text-gray-300">Eligible Branches</label>
                    <button 
                      type="button" 
                      onClick={() => handleSelectAll('eligibleBranches', BRANCHES)}
                      className="px-3 py-1 bg-blue-400/10 hover:bg-blue-400/20 border border-blue-400/20 hover:border-blue-400/40 rounded-xl text-blue-400 text-xs font-semibold transition-all duration-200"
                    >
                      {formData.eligibleBranches.length === BRANCHES.length ? 'Clear All' : 'Select All'}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {BRANCHES.map(branch => (
                      <label 
                        key={branch} 
                        className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.eligibleBranches.includes(branch)
                            ? 'bg-blue-400/10 border-blue-400/50 text-blue-400'
                            : 'bg-gray-800/30 border-gray-700/50 text-gray-300 hover:border-gray-600/50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.eligibleBranches.includes(branch)}
                          onChange={() => handleCheckboxChange('eligibleBranches', branch)}
                          className="w-4 h-4 rounded border-gray-600 text-blue-400 focus:ring-blue-400/50 focus:ring-2"
                        />
                        <span className="text-sm font-medium">{branch}</span>
                      </label>
                    ))}
                  </div>
                  
                  {formData.eligibleBranches.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-400/5 border border-blue-400/20 rounded-xl">
                      <span className="text-sm text-blue-400 font-semibold">Selected: </span>
                      <span className="text-sm text-gray-300">{formData.eligibleBranches.join(', ')}</span>
                    </div>
                  )}
                </div>

                {/* Eligible Years */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-semibold text-gray-300">Eligible Years *</label>
                    <button 
                      type="button" 
                      onClick={() => handleSelectAll('eligibleYears', YEARS)}
                      className="px-3 py-1 bg-green-400/10 hover:bg-green-400/20 border border-green-400/20 hover:border-green-400/40 rounded-xl text-green-400 text-xs font-semibold transition-all duration-200"
                    >
                      {formData.eligibleYears.length === YEARS.length ? 'Clear All' : 'Select All'}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {YEARS.map(year => (
                      <label 
                        key={year} 
                        className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.eligibleYears.includes(year)
                            ? 'bg-green-400/10 border-green-400/50 text-green-400'
                            : 'bg-gray-800/30 border-gray-700/50 text-gray-300 hover:border-gray-600/50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.eligibleYears.includes(year)}
                          onChange={() => handleCheckboxChange('eligibleYears', year)}
                          className="w-4 h-4 rounded border-gray-600 text-green-400 focus:ring-green-400/50 focus:ring-2"
                        />
                        <span className="text-sm font-medium">{year}</span>
                      </label>
                    ))}
                  </div>
                  
                  {formData.eligibleYears.length > 0 && (
                    <div className="mt-4 p-3 bg-green-400/5 border border-green-400/20 rounded-xl">
                      <span className="text-sm text-green-400 font-semibold">Selected: </span>
                      <span className="text-sm text-gray-300">{formData.eligibleYears.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Job Requirements */}
              <div className="p-8 bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-6">Job Requirements</h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">Job Description *</label>
                    <textarea
                      name="jobDescription"
                      value={formData.jobDescription}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none transition-colors resize-none"
                      placeholder="Describe the role, responsibilities, and what the candidate will be working on..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">Skills Required *</label>
                    <textarea
                      name="skillsRequired"
                      value={formData.skillsRequired}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none transition-colors resize-none"
                      placeholder="JavaScript, React, Node.js, MongoDB, Problem Solving..."
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="p-8 bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-6">Additional Information</h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">Selection Process</label>
                    <textarea
                      name="selectionProcess"
                      value={formData.selectionProcess}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none transition-colors resize-none"
                      placeholder="Written Test → Technical Interview → HR Round..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-300">Bond Details</label>
                      <input
                        type="text"
                        name="bondDetails"
                        value={formData.bondDetails}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none transition-colors"
                        placeholder="2 years bond with ₹1,50,000 penalty"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-300">Benefits</label>
                      <input
                        type="text"
                        name="benefits"
                        value={formData.benefits}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none transition-colors"
                        placeholder="Health Insurance, PF, Bonus, WFH..."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">Additional Information</label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none transition-colors resize-none"
                      placeholder="Any other relevant information for candidates..."
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-800/50">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 rounded-2xl text-gray-300 hover:text-white font-semibold transition-all duration-200 flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
                
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-400">
                    * Required fields
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transform transition-all duration-200 shadow-xl flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {editId ? 'Update Job Posting' : 'Create Job Posting'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobPosting;