import React, { useState } from "react";
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
    result: "Pending",
  },
  {
    id: 2,
    company: "Data Analytics Corp",
    position: "Data Analyst",
    appliedDate: "2023-10-20",
    status: "Applied",
    interviewDate: "",
    result: "Pending",
  },
  {
    id: 3,
    company: "Cloud Services Ltd",
    position: "Cloud Engineer",
    appliedDate: "2023-09-05",
    status: "Rejected",
    interviewDate: "2023-09-25",
    result: "Not Selected",
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
  },
  {
    id: 2,
    company: "Digital Solutions",
    date: "2023-11-20",
    positions: "Full Stack Developer, DevOps Engineer",
    eligibility: "CGPA >= 8.0, 2024 batch only",
    deadline: "2023-11-15",
  },
];

function StudentProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [photoPreview, setPhotoPreview] = useState(profile.photo);
  const [editMode, setEditMode] = useState(false);
  const [jobs, setJobs] = useState(initialJobs);
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState([
    "Your application for Tech Solutions has been shortlisted",
    "Digital Solutions drive registration opens tomorrow",
    "Reminder: Innovate Tech test on November 12",
  ]);

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
    setEditMode(false);
    setNotifications([...notifications, "Profile updated successfully"]);
  };

  const handleEdit = () => setEditMode(true);

  const handleWithdraw = (jobId) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
    setNotifications([...notifications, "Application withdrawn successfully"]);
  };

  return (
    <div className="student-profile-container">
      <div className="profile-header">
        <h2 className="profile-title">Student Dashboard</h2>
        <div className="notification-badge">
          <span>{notifications.length}</span>
          <div className="notification-dropdown">
            {notifications.map((note, index) => (
              <div key={index} className="notification-item">
                {note}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          My Profile
        </button>
        <button
          className={activeTab === "applications" ? "active" : ""}
          onClick={() => setActiveTab("applications")}
        >
          My Applications
        </button>
        <button
          className={activeTab === "drives" ? "active" : ""}
          onClick={() => setActiveTab("drives")}
        >
          Upcoming Drives
        </button>
      </div>

      {activeTab === "profile" && (
        <>
          {editMode ? (
            <form className="student-profile-form" onSubmit={handleSubmit}>
              <div className="profile-photo-section">
                <img src={photoPreview} alt="Profile" className="student-photo" />
                <label className="upload-btn">
                  Change Photo
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handlePhotoChange} 
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              
              <div className="form-fields-grid">
                <div className="form-field-group">
                  <h3 className="form-section-title">Personal Information</h3>
                  <div className="form-field">
                    <label>Name</label>
                    <input type="text" name="name" value={profile.name} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label>Email</label>
                    <input type="email" name="email" value={profile.email} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label>Phone</label>
                    <input type="text" name="phone" value={profile.phone} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label>Department</label>
                    <input type="text" name="department" value={profile.department} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label>Batch</label>
                    <input type="text" name="batch" value={profile.batch} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label>College ID</label>
                    <input type="text" name="collegeId" value={profile.collegeId} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-field-group">
                  <h3 className="form-section-title">Academic Information</h3>
                  <div className="form-field">
                    <label>10th Marks</label>
                    <input type="text" name="tenth" value={profile.tenth} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label>12th Marks</label>
                    <input type="text" name="twelfth" value={profile.twelfth} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label>Graduation CGPA</label>
                    <input type="text" name="graduation" value={profile.graduation} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-field-group">
                  <h3 className="form-section-title">Professional Information</h3>
                  <div className="form-field">
                    <label>LinkedIn</label>
                    <input type="text" name="linkedin" value={profile.linkedin} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label>GitHub</label>
                    <input type="text" name="github" value={profile.github} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label>Skills (comma separated)</label>
                    <input type="text" name="skills" value={profile.skills} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label>Certifications (comma separated)</label>
                    <input type="text" name="certifications" value={profile.certifications} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label>Resume</label>
                    <div className="file-upload-wrapper">
                      <label className="upload-btn">
                        Upload Resume
                        <input 
                          type="file" 
                          accept=".pdf,.doc,.docx" 
                          onChange={handleResumeChange} 
                          style={{ display: 'none' }}
                        />
                      </label>
                      {profile.resume && <span className="file-name">{profile.resume}</span>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-view">
              <div className="profile-photo-section">
                <img src={photoPreview} alt="Profile" className="student-photo" />
              </div>
              <div className="profile-fields">
                <div className="profile-section">
                  <h3>Personal Information</h3>
                  <p><strong>Name:</strong> {profile.name}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Phone:</strong> {profile.phone}</p>
                  <p><strong>Department:</strong> {profile.department}</p>
                  <p><strong>Batch:</strong> {profile.batch}</p>
                  <p><strong>College ID:</strong> {profile.collegeId}</p>
                  <p>
                    <strong>LinkedIn:</strong>{" "}
                    {profile.linkedin ? (
                      <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer">
                        {profile.linkedin}
                      </a>
                    ) : (
                      <span className="not-provided">Not provided</span>
                    )}
                  </p>
                  <p>
                    <strong>GitHub:</strong>{" "}
                    {profile.github ? (
                      <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer">
                        {profile.github}
                      </a>
                    ) : (
                      <span className="not-provided">Not provided</span>
                    )}
                  </p>
                </div>

                <div className="profile-section">
                  <h3>Academic Information</h3>
                  <p><strong>10th Marks:</strong> {profile.tenth}</p>
                  <p><strong>12th Marks:</strong> {profile.twelfth}</p>
                  <p><strong>Graduation CGPA:</strong> {profile.graduation}</p>
                </div>

                <div className="profile-section">
                  <h3>Professional Information</h3>
                  <p><strong>Skills:</strong> {profile.skills}</p>
                  <p><strong>Certifications:</strong> {profile.certifications}</p>
                  <p>
                    <strong>Resume:</strong>{" "}
                    {profile.resume ? (
                      <span className="resume-file">
                        {profile.resume} <button className="download-btn">Download</button>
                      </span>
                    ) : (
                      <span className="not-provided">Not uploaded</span>
                    )}
                  </p>
                </div>
              </div>
              <button className="edit-profile-btn" onClick={handleEdit}>
                Edit Profile
              </button>
            </div>
          )}
        </>
      )}

     {activeTab === "applications" && (
        <div className="applications-container">
          <h3>Your Job Applications</h3>
          <div className="applications-stats">
            <div className="stat-card">
              <h4>Total Applied</h4>
              <p>{jobs.length}</p>
            </div>
            <div className="stat-card">
              <h4>Shortlisted</h4>
              <p>{jobs.filter(job => job.status === "Shortlisted").length}</p>
            </div>
            <div className="stat-card">
              <h4>Rejected</h4>
              <p>{jobs.filter(job => job.status === "Rejected").length}</p>
            </div>
            <div className="stat-card">
              <h4>Pending</h4>
              <p>{jobs.filter(job => job.status === "Applied").length}</p>
            </div>
          </div>

          <div className="applications-list">
            {jobs.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Applied Date</th>
                    <th>Status</th>
                    <th>Interview Date</th>
                    <th>Result</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td>{job.company}</td>
                      <td>{job.position}</td>
                      <td>{job.appliedDate}</td>
                      <td className={`status-${job.status.toLowerCase()}`}>{job.status}</td>
                      <td>{job.interviewDate || "-"}</td>
                      <td className={`result-${job.result.toLowerCase().replace(" ", "-")}`}>
                        {job.result}
                      </td>
                      <td>
                        {job.status === "Applied" && (
                          <button
                            className="withdraw-btn"
                            onClick={() => handleWithdraw(job.id)}
                          >
                            Withdraw
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-applications">You haven't applied to any jobs yet.</p>
            )}
          </div>
        </div>
      )}

       {activeTab === "drives" && (
        <div className="drives-container">
          <h3>Upcoming Campus Drives</h3>
          <div className="drives-list">
            {upcomingDrives.map((drive) => (
              <div key={drive.id} className="drive-card">
                <div className="drive-header">
                  <h4>{drive.company}</h4>
                  <span className="drive-date">{drive.date}</span>
                </div>
                <div className="drive-details">
                  <p><strong>Positions:</strong> {drive.positions}</p>
                  <p><strong>Eligibility:</strong> {drive.eligibility}</p>
                  <p><strong>Registration Deadline:</strong> {drive.deadline}</p>
                </div>
                <div className="drive-actions">
                  <button className="register-btn">Register</button>
                  <button className="details-btn">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentProfile;