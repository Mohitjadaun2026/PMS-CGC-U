import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Calendar, 
  FileText, 
  Award, 
  Github, 
  Linkedin, 
  Building2, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Bell,
  Download,
  Upload,
  Edit3,
  Save,
  X,
  Eye,
  Trash2,
  Users,
  TrendingUp,
  Filter,
  Sun,
  Moon
} from "lucide-react";
import "./studentProfile.css";

const initialProfile = {
  name: "Mohit Jadaun",
  photo: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&q=80",
  email: "mohit.jadaun@student.cgc.ac.in",
  phone: "+91-98765-54321",
  tenth: "91%",
  twelfth: "88%",
  graduation: "8.6 CGPA",
  skills: "JavaScript, React, Node.js, Python, Java",
  resume: "Mohit_Jadaun_Resume.pdf",
  certifications: "AWS Certified Cloud Practitioner, Google Data Analytics, React Certification",
  department: "Computer Science",
  batch: "2024",
  collegeId: "CGC2024CS456",
  linkedin: "linkedin.com/in/mohit-jadaun",
  github: "github.com/mohitjadaun",
};

const initialJobs = [
  {
    id: 1,
    company: "Tech Solutions Inc.",
    position: "Software Engineer",
    appliedDate: "2023-10-15",
    status: "Shortlisted",
    interviewDate: "2023-11-10",
    salary: "₹8-12 LPA",
    location: "Bangalore"
  },
  {
    id: 2,
    company: "Data Analytics Corp",
    position: "Data Analyst",
    appliedDate: "2023-10-20",
    status: "Applied",
    salary: "₹6-10 LPA",
    location: "Mumbai"
  },
  {
    id: 3,
    company: "StartupXYZ",
    position: "Full Stack Developer",
    appliedDate: "2023-11-01",
    status: "Interview Scheduled",
    interviewDate: "2023-11-18",
    salary: "₹7-11 LPA",
    location: "Pune"
  },
];

const upcomingDrives = [
  {
    id: 1,
    company: "Innovate Tech",
    date: "2023-11-15",
    positions: "Frontend Developer, Backend Developer",
    eligibility: "CGPA >= 7.5, No backlogs",
    deadline: "2023-11-10",
    salary: "₹8-12 LPA",
    registrations: 156,
    isRegistered: false
  },
  {
    id: 2,
    company: "Digital Solutions",
    date: "2023-11-20",
    positions: "Full Stack Developer, DevOps Engineer",
    eligibility: "CGPA >= 8.0, 2024 batch only",
    deadline: "2023-11-15",
    salary: "₹10-14 LPA",
    registrations: 89,
    isRegistered: true
  },
];

function StudentProfile() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [profile, setProfile] = useState(initialProfile);
  const [photoPreview, setPhotoPreview] = useState(profile.photo);
  const [editMode, setEditMode] = useState(false);
  const [jobs, setJobs] = useState(initialJobs);
  const [drives, setDrives] = useState(upcomingDrives);
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your application for Tech Solutions has been shortlisted", time: "2 hours ago", read: false },
    { id: 2, message: "Digital Solutions drive registration opens tomorrow", time: "1 day ago", read: false },
    { id: 3, message: "Reminder: Innovate Tech test on November 12", time: "2 days ago", read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
      setProfile((prev) => ({ ...prev, photo: file.name }));
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({ ...prev, resume: file.name }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setEditMode(false);
      setIsLoading(false);
      addNotification("Profile updated successfully", false);
    }, 1500);
  };

  const addNotification = (message, read = false) => {
    const newNotification = {
      id: Date.now(),
      message,
      time: "Just now",
      read
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleWithdraw = (jobId) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
    addNotification("Application withdrawn successfully");
  };

  const handleRegister = (driveId) => {
    setDrives(prev => prev.map(drive => 
      drive.id === driveId 
        ? { ...drive, isRegistered: true, registrations: drive.registrations + 1 }
        : drive
    ));
    addNotification("Successfully registered for campus drive");
  };

  const markNotificationRead = (notificationId) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'shortlisted':
      case 'interview scheduled':
        return <CheckCircle className="status-icon" />;
      case 'rejected':
        return <XCircle className="status-icon" />;
      case 'applied':
        return <Clock className="status-icon" />;
      default:
        return <Clock className="status-icon" />;
    }
  };

  const filteredJobs = statusFilter === "all" 
    ? jobs 
    : jobs.filter(job => job.status.toLowerCase() === statusFilter);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`student-dashboard ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-info">
            <h1>Student Dashboard</h1>
            <p>Welcome back, {profile.name.split(' ')[0]}!</p>
          </div>
          <div className="header-actions">
            <button 
              className="theme-toggle"
              onClick={() => setDarkTheme(!darkTheme)}
            >
              {darkTheme ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="notification-wrapper">
              <button 
                className="notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
              </button>
              
              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h3>Notifications</h3>
                    <button onClick={() => setShowNotifications(false)}>
                      <X size={16} />
                    </button>
                  </div>
                  <div className="notification-list">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`notification-item ${!notif.read ? 'unread' : ''}`}
                        onClick={() => markNotificationRead(notif.id)}
                      >
                        <div className="notification-content">
                          <p>{notif.message}</p>
                          <span className="notification-time">{notif.time}</span>
                        </div>
                        {!notif.read && <div className="unread-dot"></div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="navigation">
        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={18} />
            <span>Profile</span>
          </button>
          <button
            className={`nav-tab ${activeTab === "applications" ? "active" : ""}`}
            onClick={() => setActiveTab("applications")}
          >
            <FileText size={18} />
            <span>Applications</span>
            <span className="tab-badge">{jobs.length}</span>
          </button>
          <button
            className={`nav-tab ${activeTab === "drives" ? "active" : ""}`}
            onClick={() => setActiveTab("drives")}
          >
            <Building2 size={18} />
            <span>Campus Drives</span>
            <span className="tab-badge">{drives.filter(d => !d.isRegistered).length}</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="profile-section">
            {editMode ? (
              <div className="edit-form">
                <div className="form-header">
                  <h2>Edit Profile</h2>
                  <div className="form-actions">
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => setEditMode(false)}
                    >
                      <X size={16} />
                      Cancel
                    </button>
                    <button 
                      className="btn btn-primary" 
                      disabled={isLoading}
                      onClick={handleSubmit}
                    >
                      {isLoading ? (
                        <div className="spinner"></div>
                      ) : (
                        <Save size={16} />
                      )}
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>

                <div className="profile-photo-edit">
                  <div className="photo-container">
                    <img src={photoPreview} alt="Profile" className="profile-photo" />
                    <label className="photo-upload-btn">
                      <Upload size={16} />
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handlePhotoChange} 
                        hidden
                      />
                    </label>
                  </div>
                </div>
                
                <div className="form-sections">
                  <div className="form-section">
                    <h3><User size={20} /> Personal Information</h3>
                    <div className="form-grid">
                      <div className="form-field">
                        <label>Full Name</label>
                        <input type="text" name="name" value={profile.name} onChange={handleChange} />
                      </div>
                      <div className="form-field">
                        <label>College ID</label>
                        <input type="text" name="collegeId" value={profile.collegeId} onChange={handleChange} />
                      </div>
                      <div className="form-field">
                        <label>Email</label>
                        <input type="email" name="email" value={profile.email} onChange={handleChange} />
                      </div>
                      <div className="form-field">
                        <label>Phone</label>
                        <input type="text" name="phone" value={profile.phone} onChange={handleChange} />
                      </div>
                      <div className="form-field">
                        <label>Department</label>
                        <input type="text" name="department" value={profile.department} onChange={handleChange} />
                      </div>
                      <div className="form-field">
                        <label>Batch</label>
                        <input type="text" name="batch" value={profile.batch} onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3><GraduationCap size={20} /> Academic Information</h3>
                    <div className="form-grid">
                      <div className="form-field">
                        <label>10th Marks</label>
                        <input type="text" name="tenth" value={profile.tenth} onChange={handleChange} />
                      </div>
                      <div className="form-field">
                        <label>12th Marks</label>
                        <input type="text" name="twelfth" value={profile.twelfth} onChange={handleChange} />
                      </div>
                      <div className="form-field">
                        <label>Graduation CGPA</label>
                        <input type="text" name="graduation" value={profile.graduation} onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3><Award size={20} /> Professional Information</h3>
                    <div className="form-grid">
                      <div className="form-field">
                        <label>LinkedIn Profile</label>
                        <input type="text" name="linkedin" value={profile.linkedin} onChange={handleChange} />
                      </div>
                      <div className="form-field">
                        <label>GitHub Profile</label>
                        <input type="text" name="github" value={profile.github} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="form-field full-width">
                      <label>Skills (comma separated)</label>
                      <textarea name="skills" value={profile.skills} onChange={handleChange} rows="3" />
                    </div>
                    <div className="form-field full-width">
                      <label>Certifications</label>
                      <textarea name="certifications" value={profile.certifications} onChange={handleChange} rows="3" />
                    </div>
                    <div className="form-field full-width">
                      <label>Resume</label>
                      <div className="file-upload">
                        <label className="file-upload-btn">
                          <Upload size={16} />
                          Upload Resume
                          <input 
                            type="file" 
                            accept=".pdf,.doc,.docx" 
                            onChange={handleResumeChange} 
                            hidden
                          />
                        </label>
                        {profile.resume && <span className="file-name">{profile.resume}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="profile-view">
                <div className="profile-card">
                  <div className="profile-header">
                    <div className="profile-photo-container">
                      <img src={photoPreview} alt="Profile" className="profile-photo" />
                      <div className="status-indicator online"></div>
                    </div>
                    <div className="profile-info">
                      <h2>{profile.name}</h2>
                      <p className="department">{profile.department} • Batch {profile.batch}</p>
                      <p className="college-id">ID: {profile.collegeId}</p>
                      <button className="btn btn-primary edit-btn" onClick={() => setEditMode(true)}>
                        <Edit3 size={16} />
                        Edit Profile
                      </button>
                    </div>
                  </div>

                  <div className="profile-details">
                    <div className="detail-section">
                      <h3><Mail size={18} /> Contact Information</h3>
                      <div className="detail-grid">
                        <div className="detail-item">
                          <Mail size={16} />
                          <span>{profile.email}</span>
                        </div>
                        <div className="detail-item">
                          <Phone size={16} />
                          <span>{profile.phone}</span>
                        </div>
                        <div className="detail-item">
                          <Linkedin size={16} />
                          {profile.linkedin ? (
                            <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer">
                              {profile.linkedin}
                            </a>
                          ) : (
                            <span className="not-provided">Not provided</span>
                          )}
                        </div>
                        <div className="detail-item">
                          <Github size={16} />
                          {profile.github ? (
                            <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer">
                              {profile.github}
                            </a>
                          ) : (
                            <span className="not-provided">Not provided</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="detail-section">
                      <h3><GraduationCap size={18} /> Academic Performance</h3>
                      <div className="academic-grid">
                        <div className="academic-item">
                          <span className="label">10th Grade</span>
                          <span className="value">{profile.tenth}</span>
                        </div>
                        <div className="academic-item">
                          <span className="label">12th Grade</span>
                          <span className="value">{profile.twelfth}</span>
                        </div>
                        <div className="academic-item">
                          <span className="label">Graduation</span>
                          <span className="value">{profile.graduation}</span>
                        </div>
                      </div>
                    </div>

                    <div className="detail-section">
                      <h3><Award size={18} /> Skills & Certifications</h3>
                      <div className="skills-section">
                        <h4>Skills</h4>
                        <div className="skills-tags">
                          {profile.skills.split(',').map((skill, index) => (
                            <span key={index} className="skill-tag">{skill.trim()}</span>
                          ))}
                        </div>
                      </div>
                      <div className="certifications-section">
                        <h4>Certifications</h4>
                        <div className="certifications-list">
                          {profile.certifications.split(',').map((cert, index) => (
                            <div key={index} className="certification-item">
                              <Award size={16} />
                              <span>{cert.trim()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="resume-section">
                        <h4>Resume</h4>
                        {profile.resume ? (
                          <div className="resume-file">
                            <FileText size={16} />
                            <span>{profile.resume}</span>
                            <button className="btn btn-outline">
                              <Download size={16} />
                              Download
                            </button>
                          </div>
                        ) : (
                          <span className="not-provided">Not uploaded</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div className="applications-section">
            <div className="section-header">
              <div className="header-info">
                <h2>Job Applications</h2>
                <p>Track your application status and manage your job applications</p>
              </div>
              <div className="filter-container">
                <Filter size={16} />
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="applied">Applied</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interview scheduled">Interview Scheduled</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card total">
                <div className="stat-icon">
                  <FileText size={24} />
                </div>
                <div className="stat-content">
                  <h3>Total Applied</h3>
                  <p>{jobs.length}</p>
                </div>
              </div>
              <div className="stat-card shortlisted">
                <div className="stat-icon">
                  <CheckCircle size={24} />
                </div>
                <div className="stat-content">
                  <h3>Shortlisted</h3>
                  <p>{jobs.filter(job => job.status === "Shortlisted" || job.status === "Interview Scheduled").length}</p>
                </div>
              </div>
              <div className="stat-card rejected">
                <div className="stat-icon">
                  <XCircle size={24} />
                </div>
                <div className="stat-content">
                  <h3>Rejected</h3>
                  <p>{jobs.filter(job => job.status === "Rejected").length}</p>
                </div>
              </div>
              <div className="stat-card pending">
                <div className="stat-icon">
                  <Clock size={24} />
                </div>
                <div className="stat-content">
                  <h3>Pending</h3>
                  <p>{jobs.filter(job => job.status === "Applied").length}</p>
                </div>
              </div>
            </div>

            <div className="applications-grid">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div key={job.id} className="application-card">
                    <div className="card-header">
                      <div className="company-info">
                        <h3>{job.company}</h3>
                        <p>{job.position}</p>
                      </div>
                      <div className={`status-badge status-${job.status.toLowerCase().replace(' ', '-')}`}>
                        {getStatusIcon(job.status)}
                        {job.status}
                      </div>
                    </div>
                    <div className="card-details">
                      <div className="detail-item">
                        <Calendar size={16} />
                        <span>Applied: {job.appliedDate}</span>
                      </div>
                      <div className="detail-item">
                        <Building2 size={16} />
                        <span>{job.location}</span>
                      </div>
                      <div className="detail-item">
                        <TrendingUp size={16} />
                        <span>{job.salary}</span>
                      </div>
                      {job.interviewDate && (
                        <div className="detail-item interview">
                          <Clock size={16} />
                          <span>Interview: {job.interviewDate}</span>
                        </div>
                      )}
                    </div>
                    <div className="card-actions">
                      <button className="btn btn-outline">
                        <Eye size={16} />
                        View Details
                      </button>
                      {job.status === "Applied" && (
                        <button
                          className="btn btn-danger"
                          onClick={() => handleWithdraw(job.id)}
                        >
                          <Trash2 size={16} />
                          Withdraw
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <FileText size={48} />
                  <h3>No applications found</h3>
                  <p>No applications match the selected filter criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Drives Tab */}
        {activeTab === "drives" && (
          <div className="drives-section">
            <div className="section-header">
              <div className="header-info">
                <h2>Upcoming Campus Drives</h2>
                <p>Register for campus recruitment drives and expand your career opportunities</p>
              </div>
            </div>

            <div className="drives-grid">
              {drives.map((drive) => (
                <div key={drive.id} className={`drive-card ${drive.isRegistered ? 'registered' : ''}`}>
                  <div className="card-header">
                    <div className="drive-info">
                      <h3>{drive.company}</h3>
                      <div className="drive-meta">
                        <div className="meta-item">
                          <Calendar size={16} />
                          <span>{drive.date}</span>
                        </div>
                        <div className="meta-item">
                          <TrendingUp size={16} />
                          <span>{drive.salary}</span>
                        </div>
                      </div>
                    </div>
                    <div className="registration-stats">
                      <Users size={16} />
                      <span>{drive.registrations} registered</span>
                    </div>
                  </div>
                  
                  <div className="card-details">
                    <div className="detail-section">
                      <h4>Available Positions</h4>
                      <p>{drive.positions}</p>
                    </div>
                    <div className="detail-section">
                      <h4>Eligibility Criteria</h4>
                      <p>{drive.eligibility}</p>
                    </div>
                    <div className="detail-section deadline">
                      <h4>Registration Deadline</h4>
                      <p>
                        <Clock size={16} />
                        {drive.deadline}
                      </p>
                    </div>
                  </div>

                  <div className="card-actions">
                    {drive.isRegistered ? (
                      <div className="registered-status">
                        <CheckCircle size={16} />
                        <span>Registered</span>
                      </div>
                    ) : (
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleRegister(drive.id)}
                      >
                        <Users size={16} />
                        Register Now
                      </button>
                    )}
                    <button className="btn btn-outline">
                      <Eye size={16} />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default StudentProfile;