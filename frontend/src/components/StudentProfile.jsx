import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Award,
  FileText,
  Github,
  Linkedin,
  Calendar,
  Briefcase,
  TrendingUp,
  Bell,
  Edit3,
  Save,
  X,
  Upload,
  Download,
  Eye,
  ChevronRight,
  Building,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Target,
  BookOpen,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

const initialProfile = {
  name: "Mohit Jadaun",
  photo:
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&q=80",
  email: "mohit.jadaun@student.cgc.ac.in",
  phone: "+91-98765-54321",
  tenth: "91%",
  twelfth: "88%",
  graduation: "8.6 CGPA",
  skills: "JavaScript, React, Node.js, Python, Java",
  resume: "Mohit_Jadaun_Resume.pdf",
  certifications:
    "AWS Certified Cloud Practitioner, Google Data Analytics, React Certification",
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
    salary: "₹12 LPA",
  },
  {
    id: 2,
    company: "Data Analytics Corp",
    position: "Data Analyst",
    appliedDate: "2023-10-20",
    status: "Applied",
    interviewDate: "",
    result: "Pending",
    salary: "₹8 LPA",
  },
  {
    id: 3,
    company: "Cloud Services Ltd",
    position: "Cloud Engineer",
    appliedDate: "2023-09-05",
    status: "Rejected",
    interviewDate: "2023-09-25",
    result: "Not Selected",
    salary: "₹15 LPA",
  },
];

const upcomingDrives = [
  {
    id: 1,
    company: "Innovate Tech",
    logo: "https://via.placeholder.com/60x60/1f2937/f59e0b?text=IT",
    date: "2023-11-15",
    positions: "Frontend Developer, Backend Developer",
    eligibility: "CGPA >= 7.5, No backlogs",
    deadline: "2023-11-10",
    salary: "₹8-12 LPA",
  },
  {
    id: 2,
    company: "Digital Solutions",
    logo: "https://via.placeholder.com/60x60/1f2937/f59e0b?text=DS",
    date: "2023-11-20",
    positions: "Full Stack Developer, DevOps Engineer",
    eligibility: "CGPA >= 8.0, 2024 batch only",
    deadline: "2023-11-15",
    salary: "₹10-15 LPA",
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
  const [showNotifications, setShowNotifications] = useState(false);
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

  const handleWithdraw = (jobId) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
    setNotifications([...notifications, "Application withdrawn successfully"]);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Shortlisted":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "Applied":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Shortlisted":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "Applied":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "Rejected":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="relative bg-gray-950 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                Student Dashboard
              </h1>
              <p className="text-gray-400 mt-1">Welcome back, {profile.name}</p>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-3 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-300"
              >
                <Bell className="w-5 h-5 text-yellow-400" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-black text-xs rounded-full flex items-center justify-center font-bold">
                    {notifications.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-gray-900 rounded-xl border border-gray-700/50 shadow-2xl z-50">
                  <div className="p-4 border-b border-gray-700/50">
                    <h3 className="text-lg font-semibold text-yellow-400">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((note, index) => (
                      <div
                        key={index}
                        className="p-4 border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors"
                      >
                        <p className="text-sm text-gray-300">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="sticky top-0 z-40 bg-gray-950/90 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1">
            {[
              {
                id: "profile",
                label: "My Profile",
                icon: <User className="w-4 h-4" />,
              },
              {
                id: "applications",
                label: "My Applications",
                icon: <Briefcase className="w-4 h-4" />,
              },
              {
                id: "drives",
                label: "Upcoming Drives",
                icon: <Calendar className="w-4 h-4" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 cursor-pointer flex items-center gap-2 font-medium transition-all duration-300 border-b-2 ${
                  activeTab === tab.id
                    ? "text-yellow-400 border-yellow-400"
                    : "text-gray-400 border-transparent hover:text-white hover:border-gray-700"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "profile" && (
          <div className="space-y-8">
            {/* Profile Header */}
            <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 p-8">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400/20">
                    <img
                      src={photoPreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {editMode && (
                    <label className="absolute bottom-0 right-0 p-2 bg-yellow-400 text-black rounded-full cursor-pointer hover:bg-yellow-500 transition-colors">
                      <Upload className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <h2 className="text-3xl font-bold mb-2">{profile.name}</h2>
                  <p className="text-yellow-400 text-lg mb-1">
                    {profile.department}
                  </p>
                  <p className="text-gray-400 mb-4">
                    Batch {profile.batch} • ID: {profile.collegeId}
                  </p>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{profile.phone}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    {profile.linkedin && (
                      <Link
                        to={`https://${profile.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                        <span className="text-sm">LinkedIn</span>
                      </Link>
                    )}
                    {profile.github && (
                      <Link
                        to={`https://${profile.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600/10 border border-gray-600/20 rounded-lg text-gray-300 hover:bg-gray-600/20 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm">GitHub</span>
                      </Link>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setEditMode(!editMode)}
                  className="flex items-center gap-2 px-6 py-3 bg-yellow-400/10 border border-yellow-400/20 rounded-xl text-yellow-400 hover:bg-yellow-400/20 transition-colors"
                >
                  {editMode ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Edit3 className="w-4 h-4" />
                  )}
                  {editMode ? "Cancel" : "Edit Profile"}
                </button>
              </div>
            </div>

            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 p-8">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <User className="w-6 h-6 text-yellow-400" />
                      Personal Information
                    </h3>
                    <div className="space-y-4">
                      {[
                        { name: "name", label: "Full Name", type: "text" },
                        { name: "email", label: "Email", type: "email" },
                        { name: "phone", label: "Phone", type: "text" },
                        {
                          name: "department",
                          label: "Department",
                          type: "text",
                        },
                        { name: "batch", label: "Batch", type: "text" },
                        {
                          name: "collegeId",
                          label: "College ID",
                          type: "text",
                        },
                      ].map((field) => (
                        <div key={field.name}>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            name={field.name}
                            value={profile[field.name]}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:border-yellow-400/50 focus:outline-none transition-colors"
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 p-8">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <GraduationCap className="w-6 h-6 text-yellow-400" />
                      Academic Information
                    </h3>
                    <div className="space-y-4">
                      {[
                        { name: "tenth", label: "10th Marks" },
                        { name: "twelfth", label: "12th Marks" },
                        { name: "graduation", label: "Graduation CGPA" },
                      ].map((field) => (
                        <div key={field.name}>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            {field.label}
                          </label>
                          <input
                            type="text"
                            name={field.name}
                            value={profile[field.name]}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:border-yellow-400/50 focus:outline-none transition-colors"
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-yellow-400" />
                    Professional Information
                  </h3>
                  <div className="grid lg:grid-cols-2 gap-6">
                    {[
                      { name: "linkedin", label: "LinkedIn Profile" },
                      { name: "github", label: "GitHub Profile" },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          {field.label}
                        </label>
                        <input
                          type="text"
                          name={field.name}
                          value={profile[field.name]}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:border-yellow-400/50 focus:outline-none transition-colors"
                        />
                      </div>
                    ))}
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Skills (comma separated)
                      </label>
                      <textarea
                        name="skills"
                        value={profile.skills}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:border-yellow-400/50 focus:outline-none transition-colors resize-none"
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Certifications (comma separated)
                      </label>
                      <textarea
                        name="certifications"
                        value={profile.certifications}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:border-yellow-400/50 focus:outline-none transition-colors resize-none"
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Resume
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 px-4 py-3 bg-yellow-400/10 border border-yellow-400/20 rounded-xl text-yellow-400 cursor-pointer hover:bg-yellow-400/20 transition-colors">
                          <Upload className="w-4 h-4" />
                          Upload Resume
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeChange}
                            className="hidden"
                          />
                        </label>
                        {profile.resume && (
                          <span className="text-gray-300">
                            {profile.resume}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-8 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-xl font-bold hover:scale-105 transform transition-all duration-200"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Academic Performance */}
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-yellow-400" />
                    Academic Performance
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                      <span className="text-gray-300">10th Grade</span>
                      <span className="text-yellow-400 font-bold">
                        {profile.tenth}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                      <span className="text-gray-300">12th Grade</span>
                      <span className="text-yellow-400 font-bold">
                        {profile.twelfth}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                      <span className="text-gray-300">Graduation</span>
                      <span className="text-yellow-400 font-bold">
                        {profile.graduation}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Target className="w-6 h-6 text-yellow-400" />
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.split(",").map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-sm"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Documents */}
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-yellow-400" />
                    Documents
                  </h3>
                  <div className="space-y-4">
                    {profile.resume ? (
                      <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-yellow-400" />
                          <span className="text-gray-300">Resume</span>
                        </div>
                        <button className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-center py-8">
                        No resume uploaded
                      </div>
                    )}
                  </div>
                </div>

                {/* Certifications */}
                <div className="lg:col-span-3 bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Award className="w-6 h-6 text-yellow-400" />
                    Certifications
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {profile.certifications.split(",").map((cert, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-yellow-400/30 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <Star className="w-5 h-5 text-yellow-400 mt-1" />
                          <span className="text-gray-300">{cert.trim()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "applications" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  label: "Total Applied",
                  value: jobs.length,
                  icon: <Briefcase className="w-6 h-6" />,
                  color: "blue",
                },
                {
                  label: "Shortlisted",
                  value: jobs.filter((job) => job.status === "Shortlisted")
                    .length,
                  icon: <CheckCircle className="w-6 h-6" />,
                  color: "green",
                },
                {
                  label: "Pending",
                  value: jobs.filter((job) => job.status === "Applied").length,
                  icon: <Clock className="w-6 h-6" />,
                  color: "yellow",
                },
                {
                  label: "Rejected",
                  value: jobs.filter((job) => job.status === "Rejected").length,
                  icon: <XCircle className="w-6 h-6" />,
                  color: "red",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 p-6"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                      stat.color === "blue"
                        ? "bg-blue-400/10 text-blue-400"
                        : stat.color === "green"
                        ? "bg-green-400/10 text-green-400"
                        : stat.color === "yellow"
                        ? "bg-yellow-400/10 text-yellow-400"
                        : "bg-red-400/10 text-red-400"
                    }`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Applications List */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 overflow-hidden">
              <div className="p-8 border-b border-gray-700/50">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-yellow-400" />
                  Your Applications
                </h3>
              </div>

              {jobs.length > 0 ? (
                <div className="divide-y divide-gray-700/30">
                  {jobs.map((job, index) => (
                    <div
                      key={job.id}
                      className="p-6 hover:bg-gray-800/30 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                              <Building className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-white mb-1">
                                {job.company}
                              </h4>
                              <p className="text-yellow-400 mb-2">
                                {job.position}
                              </p>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  Applied: {job.appliedDate}
                                </span>
                                <span className="flex items-center gap-1">
                                  <TrendingUp className="w-4 h-4" />
                                  {job.salary}
                                </span>
                                {job.interviewDate && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    Interview: {job.interviewDate}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div
                            className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(
                              job.status
                            )}`}
                          >
                            {getStatusIcon(job.status)}
                            <span className="text-sm font-medium">
                              {job.status}
                            </span>
                          </div>

                          {job.status === "Applied" && (
                            <button
                              onClick={() => handleWithdraw(job.id)}
                              className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors text-sm"
                            >
                              Withdraw
                            </button>
                          )}

                          <button className="p-2 text-gray-400 hover:text-yellow-400 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    No applications yet
                  </h3>
                  <p className="text-gray-500">
                    Start applying to job opportunities to see them here.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "drives" && (
          <div className="space-y-8">
            {/* Quick Stats for Drives */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 p-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-yellow-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {upcomingDrives.length}
                    </div>
                    <div className="text-gray-400 text-sm">Upcoming Drives</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 p-6">
                <div className="flex items-center gap-3">
                  <Building className="w-8 h-8 text-green-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-gray-400 text-sm">
                      Companies This Month
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 p-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-blue-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">₹15L</div>
                    <div className="text-gray-400 text-sm">Avg Package</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 overflow-hidden">
              <div className="p-8 border-b border-gray-700/50">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-yellow-400" />
                  Upcoming Campus Drives
                </h3>
                <p className="text-gray-400 mt-2">
                  Don't miss out on these exciting opportunities
                </p>
              </div>

              <div className="p-8">
                {upcomingDrives.length > 0 ? (
                  <div className="grid gap-6">
                    {upcomingDrives.map((drive, index) => (
                      <div
                        key={drive.id}
                        className="group relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl border border-gray-700/50 p-6 hover:border-yellow-400/30 transition-all duration-500 transform hover:scale-105"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10">
                          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden">
                                <img
                                  src={drive.logo}
                                  alt={drive.company}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://via.placeholder.com/64x64/1f2937/f59e0b?text=${drive.company.charAt(
                                      0
                                    )}`;
                                  }}
                                />
                              </div>
                              <div>
                                <h4 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                                  {drive.company}
                                </h4>
                                <p className="text-yellow-400 font-semibold text-lg">
                                  {drive.salary}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                              <div className="text-center lg:text-right">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-sm font-medium mb-2">
                                  <Calendar className="w-4 h-4" />
                                  Drive Date: {drive.date}
                                </div>
                                <p className="text-xs text-red-400 font-medium">
                                  ⏰ Deadline: {drive.deadline}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="p-4 bg-gray-800/30 rounded-xl">
                              <h5 className="text-sm font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                Available Positions
                              </h5>
                              <p className="text-gray-300">{drive.positions}</p>
                            </div>

                            <div className="p-4 bg-gray-800/30 rounded-xl">
                              <h5 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                Eligibility Criteria
                              </h5>
                              <p className="text-gray-300">
                                {drive.eligibility}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transform transition-all duration-200 flex items-center justify-center gap-2">
                              Register Now
                              <ChevronRight className="w-4 h-4" />
                            </button>
                            <button className="px-6 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-300 hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                            <button className="px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 hover:bg-blue-500/20 transition-colors flex items-center justify-center gap-2">
                              <Bell className="w-4 h-4" />
                              Set Reminder
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">
                      No upcoming drives
                    </h3>
                    <p className="text-gray-500">
                      Check back later for new opportunities.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-full shadow-2xl hover:scale-110 transform transition-all duration-200 flex items-center justify-center">
          <Bell className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default StudentProfile;
