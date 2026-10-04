import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  MapPin,
  FileText,
  Download,
  Upload,
  Edit,
  Search,
  Filter,
  Bell,
  TrendingUp,
  BarChart3,
  PieChart,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Star,
  Building2,
  Users,
  Target,
  Award,
  BookOpen,
  Home,
  Activity,
  Briefcase,
  ChevronRight,
  DollarSign,
  ChevronDown,
  ChevronUp,
  FileCheck,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  BarChart,
  Bar,
  Pie,
  Area,
  AreaChart,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";
import profile from "../assets/profile.png"
import { getMyProfile, updateMyProfile, uploadMyResume, uploadMyProfilePicture } from "../../api/profile";
import { getStudentApplications, getAllJobs } from "../../api/jobs";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config/api";
import "./StudentProfile.css";

const getProfilePictureUrl = (picture, refresh = false) => {
  if (!picture) return profile;
  const imageUrl = /^(https?:|data:|blob:)/i.test(picture)
    ? picture
    : `${API_BASE_URL}${picture.startsWith('/') ? '' : '/'}${picture}`;
  return refresh ? `${imageUrl}${imageUrl.includes('?') ? '&' : '?'}updated=${Date.now()}` : imageUrl;
};

const StudentProfile = () => {
  const [isDark, setIsDark] = useState(false);
  const [, setForceUpdate] = useState(0);

  useEffect(() => {
    const checkTheme = () => {
      const newIsDark = document.body.classList.contains("dark");
      setIsDark(newIsDark);
      setForceUpdate((prev) => prev + 1); 
    };

    checkTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkTheme();
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const handleThemeChange = () => checkTheme();
    window.addEventListener("themeChanged", handleThemeChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("themeChanged", handleThemeChange);
    };
  }, []);

  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileDraft, setProfileDraft] = useState(null);

  const loadStudentData = async () => {
    setProfileLoading(true);
    setProfileError('');
    try {
      const [profileData, applicationData, jobData] = await Promise.all([
        getMyProfile(),
        getStudentApplications(JSON.parse(localStorage.getItem('user') || 'null')?.id),
        getAllJobs('ON_CAMPUS'),
      ]);
      const completionFields = [profileData.phone, profileData.rollNo, profileData.department, profileData.batch, profileData.cgpa, profileData.skills?.length];
      const completionPercentage = Math.round((completionFields.filter(Boolean).length / completionFields.length) * 100);
      setStudentProfile((current) => ({
        ...current,
        ...profileData,
        photo: getProfilePictureUrl(profileData.profilePicture),
        completionPercentage,
        resume: profileData.resumeFileName || 'No resume uploaded',
      }));
      setProfileDraft(profileData);
      setApplications(applicationData.map((application) => ({
        ...application,
        company: application.job?.companyName || 'Company',
        position: application.job?.position || 'Position',
        appliedDate: application.createdAt,
        status: ({ pending: 'Applied', shortlisted: 'Shortlisted', interviewed: 'Interview Scheduled', selected: 'Selected', rejected: 'Rejected' })[application.status] || 'Applied',
        package: application.job?.salaryPackage || 'Not specified',
        interviewDate: null,
      })));
      setAvailableJobs(jobData.map((job) => ({
        ...job,
        id: job._id,
        company: job.companyName,
        position: job.position,
        package: job.salaryPackage,
        deadline: job.applicationDeadline,
        type: job.jobType,
        isEligible: true,
      })));
    } catch (error) {
      console.error('[PROFILE] Failed to load student data:', error);
      setProfileError(error.response?.data?.error || error.message || 'Failed to load profile');
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    loadStudentData();
  }, []);


  const bgPrimary = isDark ? "bg-[#0a0a0a]" : "bg-gray-50"; 
  const bgHeader = isDark ? "bg-[#1a1a1a]/95" : "bg-white/90"; 
  const bgCard = isDark ? "bg-[#1e1e1e]" : "bg-white"; 
  const borderColor = isDark ? "border-red-900/30" : "border-gray-200/50"; 
  const textPrimary = isDark ? "text-gray-50" : "text-gray-900"; 
  const textSecondary = isDark ? "text-gray-200" : "text-gray-600"; 
  const textTertiary = isDark ? "text-gray-300" : "text-gray-500"; 

  const getStatusColor = (status) => {
    const base = "px-3 py-1 rounded-full text-sm font-medium ";
    switch (status.toLowerCase()) {
      case "shortlisted":
        return (
          base +
          (isDark
            ? "bg-green-900/20 text-green-400"
            : "bg-green-100 text-green-800")
        );
      case "interview scheduled":
        return (
          base +
          (isDark
            ? "bg-blue-900/20 text-blue-400"
            : "bg-blue-100 text-blue-800")
        );
      case "applied":
        return (
          base +
          (isDark
            ? "bg-yellow-900/20 text-yellow-400"
            : "bg-yellow-100 text-yellow-800")
        );
      case "rejected":
        return (
          base +
          (isDark ? "bg-red-900/20 text-red-400" : "bg-red-100 text-red-800")
        );
      default:
        return (
          base +
          (isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-800")
        );
    }
  };

  // Student Profile Data (Content remains unchanged)
  const [studentProfile, setStudentProfile] = useState({
    name: "Mohit Jadaun",
    rollNo: "CGC2024CS456",
    email: "mohit.jadaun@student.cgc.ac.in",
    phone: "+91-98765-54321",
    department: "Computer Science & Engineering",
    batch: "2024-25",
    semester: "7th",
    cgpa: 8.6,
    backlogs: 0,
    completionPercentage: 85,
    // photo: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&q=80",
    photo:profile,
    linkedin: "linkedin.com/in/mohit-jadaun",
    github: "github.com/mohitjadaun",
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "Python",
      "Java",
      "AWS",
      "MongoDB",
      "Docker",
    ],
    certifications: [],
    resume: "Mohit_Jadaun_Resume.pdf",
    projects: [],
    achievements: [],
  });

  const [applications, setApplications] = useState([
    {
      id: 1,
      company: "Tech Solutions Inc.",
      position: "Software Engineer",
      appliedDate: "2024-10-15",
      status: "Interview Scheduled",
      interviewDate: "2024-11-10",
      package: "12 LPA",
      result: "Pending",
      eligibility: "Met",
      rounds: ["Technical", "HR"],
      currentRound: "Technical",
    },
    {
      id: 2,
      company: "Infosys Limited",
      position: "Software Developer",
      appliedDate: "2024-10-20",
      status: "Shortlisted",
      interviewDate: "2025-08-26",
      package: "8 LPA",
      result: "Pending",
      eligibility: "Met",
      rounds: ["Technical", "Managerial", "HR"],
      currentRound: "Technical",
    },
    {
      id: 3,
      company: "Data Analytics Corp",
      position: "Data Analyst",
      appliedDate: "2024-10-20",
      status: "Applied",
      interviewDate: null,
      package: "8 LPA",
      result: "Pending",
      eligibility: "Met",
      rounds: ["Technical", "Managerial", "HR"],
      currentRound: null,
    },
    {
      id: 4,
      company: "Cloud Services Ltd",
      position: "Cloud Engineer",
      appliedDate: "2024-09-05",
      status: "Rejected",
      interviewDate: "2024-09-25",
      package: "15 LPA",
      result: "Not Selected",
      eligibility: "Met",
      rounds: ["Technical", "System Design", "HR"],
      currentRound: "Completed",
    },
    {
      id: 5,
      company: "StartupX",
      position: "Full Stack Developer",
      appliedDate: "2024-10-25",
      status: "Shortlisted",
      interviewDate: "2024-11-05",
      package: "10 LPA",
      result: "Pending",
      eligibility: "Met",
      rounds: ["Technical", "Cultural Fit"],
      currentRound: "Cultural Fit",
    },
  ]);

  const [availableJobs, setAvailableJobs] = useState([
    {
      id: 1,
      company: "Accenture",
      position: "Data Analyst",
      package: "5.2 LPA",
      location: "Gurgaon",
      deadline: "2024-11-15",
      eligibility: "CGPA >= 7.0, No backlogs",
      requirements: ["Python", "SQL", "Data Analysis", "Excel"],
      isEligible: true,
      type: "Full-time",
      experience: "0-2 years",
      companySize: "500-1000",
    },
    {
      id: 2,
      company: "Innovate Tech",
      position: "Frontend Developer",
      package: "10-14 LPA",
      location: "Bangalore",
      deadline: "2024-11-15",
      eligibility: "CGPA >= 7.5, No backlogs",
      requirements: ["React", "JavaScript", "HTML/CSS", "TypeScript"],
      isEligible: true,
      type: "Full-time",
      experience: "0-2 years",
      companySize: "500-1000",
    },
    {
      id: 3,
      company: "Digital Solutions",
      position: "Full Stack Developer",
      package: "12-18 LPA",
      location: "Hyderabad",
      deadline: "2024-11-20",
      eligibility: "CGPA >= 8.0, 2024 batch only",
      requirements: ["React", "Node.js", "MongoDB", "Express"],
      isEligible: true,
      type: "Full-time",
      experience: "0-1 years",
      companySize: "100-500",
    },
    {
      id: 4,
      company: "AI Innovations",
      position: "ML Engineer",
      package: "15-22 LPA",
      location: "Pune",
      deadline: "2024-11-25",
      eligibility: "CGPA >= 8.5, No backlogs",
      requirements: ["Python", "TensorFlow", "Machine Learning", "Statistics"],
      isEligible: false,
      type: "Full-time",
      experience: "0-2 years",
      companySize: "50-100",
    },
  ]);

  const placementTrends = [];

  const skillDemand = [];

  const departmentStats = [];

  const nextInterview = applications.find(
    (application) => application.status === 'Interview Scheduled' && application.interviewDate
  );

  const fileInputRef = useRef(null);
  const profilePictureInputRef = useRef(null);
  const [isUploadingPicture, setIsUploadingPicture] = useState(false);

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
      toast.error('Choose a PNG, JPG, or WebP image under 5 MB');
      event.target.value = '';
      return;
    }
    setIsUploadingPicture(true);
    const previousPhoto = studentProfile.photo;
    const previewUrl = URL.createObjectURL(file);
    setStudentProfile((current) => ({ ...current, photo: previewUrl }));
    try {
      const result = await uploadMyProfilePicture(file);
      const updatedProfile = result.profile;
      if (!updatedProfile?.profilePicture) throw new Error('The server did not return the saved profile picture');
      setStudentProfile((current) => ({
        ...current,
        ...updatedProfile,
        photo: getProfilePictureUrl(updatedProfile.profilePicture, true),
      }));
      setProfileDraft((current) => current ? { ...current, ...updatedProfile } : updatedProfile);
      toast.success('Profile picture updated');
    } catch (error) {
      setStudentProfile((current) => ({ ...current, photo: previousPhoto }));
      toast.error(error.response?.data?.error || error.message || 'Failed to update profile picture');
    } finally {
      URL.revokeObjectURL(previewUrl);
      setIsUploadingPicture(false);
      event.target.value = '';
    }
  };

  const handleResumeUpload = () => {
    fileInputRef.current?.click();
  };

  const handleResumeChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const result = await uploadMyResume(file);
      setStudentProfile((current) => ({ ...current, ...result.profile, resume: result.profile.resumeFileName }));
      toast.success('Resume uploaded successfully');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to upload resume');
    } finally {
      event.target.value = '';
    }
  };

  const handleProfileSave = async (event) => {
    event.preventDefault();
    try {
      const result = await updateMyProfile({ ...profileDraft, skills: profileDraft.skills || [] });
      setStudentProfile((current) => ({ ...current, ...result.profile }));
      setProfileDraft(result.profile);
      setIsEditingProfile(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update profile');
    }
  };

  if (profileLoading) {
    return <div className="student-dashboard flex min-h-screen items-center justify-center p-8">Loading your profile...</div>;
  }

  if (profileError || !studentProfile) {
    return (
      <div className="student-dashboard flex min-h-screen flex-col items-center justify-center gap-4 p-8">
        <p>{profileError || 'Profile unavailable'}</p>
        <button type="button" onClick={loadStudentData} className="bg-red-600 px-4 py-2 text-white rounded-lg">Retry</button>
      </div>
    );
  }

  // JSX RENDER - Applying theme classes and REDUCING ANIMATION IMPACT
  return (
    <div
      className={`student-dashboard w-full min-h-screen p-0 ${bgPrimary} transition-colors duration-500`}
    >
      {/* Header (Top banner) */}
      {/* Reduced data-aos to simple fade-down with no delay */}
      <header
        className={`${bgHeader} shadow-lg w-full m-0 transition-colors duration-500 rounded-b-lg`}
      >
        <div
          className="w-full flex items-center justify-between px-0 py-0"
          style={{ margin: 0, padding: 0 }}
        >
          <div
            className="flex items-center gap-4 w-full px-8 py-4 bg-gradient-to-r from-red-800 to-red-700 rounded-b-md shadow-md"
            style={{ margin: 0 }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
              <span
                className="inline-block bg-white rounded-full p-2 shadow"
                style={{ marginRight: "0.5rem" }}
              >
                <Bell className="w-7 h-7 text-red-600" />
              </span>
              <div>
                <h1
                  className="text-4xl font-extrabold !text-gray-100  tracking-tight mb-1"
                  style={{ letterSpacing: "-1px", margin: 0 }}
                >
                  Student Dashboard
                </h1>
                <p
                  className="text-gray-100 text-lg font-medium"
                  style={{ margin: 0 }}
                >
                  Welcome back! Here's your complete placement overview.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-none mx-0 p-0 min-h-screen">
        {/* Profile Overview Section */}
        {/* Reduced data-aos-delay and simplified effect */}
        <section className="mb-8" data-aos="fade-up">
          <div
            className={`${bgCard} shadow-lg p-6 w-full ${borderColor} border rounded-lg transition-colors duration-500`}
          >
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className={`text-xl font-bold ${textPrimary}`}>Profile Information</h2>
              <button
                type="button"
                onClick={() => {
                  setProfileDraft({ ...studentProfile });
                  setIsEditingProfile((current) => !current);
                }}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                {isEditingProfile ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
            {isEditingProfile && profileDraft && (
              <form onSubmit={handleProfileSave} className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                  ['name', 'Full name'],
                  ['phone', 'Phone'],
                  ['rollNo', 'Roll number'],
                  ['department', 'Department'],
                  ['batch', 'Batch'],
                  ['semester', 'Semester'],
                  ['cgpa', 'CGPA'],
                  ['backlogs', 'Backlogs'],
                  ['linkedin', 'LinkedIn'],
                  ['github', 'GitHub'],
                ].map(([field, label]) => (
                  <label key={field} className={`flex flex-col gap-1 text-sm ${textSecondary}`}>
                    {label}
                    <input
                      type={field === 'cgpa' ? 'number' : field === 'backlogs' ? 'number' : 'text'}
                      min={field === 'cgpa' ? '0' : field === 'backlogs' ? '0' : undefined}
                      max={field === 'cgpa' ? '10' : undefined}
                      step={field === 'cgpa' ? '0.1' : undefined}
                      value={profileDraft[field] ?? ''}
                      onChange={(event) => setProfileDraft({ ...profileDraft, [field]: event.target.value })}
                      className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
                    />
                  </label>
                ))}
                <label className={`md:col-span-2 flex flex-col gap-1 text-sm ${textSecondary}`}>
                  Skills (comma separated)
                  <input
                    value={(profileDraft.skills || []).join(', ')}
                    onChange={(event) => setProfileDraft({ ...profileDraft, skills: event.target.value.split(',').map((skill) => skill.trim()).filter(Boolean) })}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
                  />
                </label>
                <button type="submit" className="w-fit rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700">Save Profile</button>
              </form>
            )}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
              {/* Profile Picture and details */}
              {/* Reduced data-aos-delay and simplified effect */}
              <div
                className="flex items-center space-x-4 mb-4 lg:mb-0"
                data-aos="fade-right"
                data-aos-duration="500"
              >
                <div className="student-profile-photo-wrap">
                  <img src={studentProfile.photo} alt="Profile" className="student-profile-photo" />
                  <button
                    type="button"
                    className="student-profile-photo-button"
                    onClick={() => profilePictureInputRef.current?.click()}
                    disabled={isUploadingPicture}
                    aria-label="Choose a new profile picture"
                  >
                    {isUploadingPicture ? 'Uploading…' : 'Change photo'}
                  </button>
                  <input
                    ref={profilePictureInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleProfilePictureChange}
                    aria-label="Upload profile picture"
                    hidden
                  />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${textPrimary}`}>
                    {studentProfile.name}
                  </h2>
                  <p className={textSecondary}>{studentProfile.department}</p>
                  <p className={`text-sm ${textTertiary}`}>
                    Roll: {studentProfile.rollNo} • Batch:{" "}
                    {studentProfile.batch}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div
                className="flex space-x-8"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                {" "}
                {/* Reduced delay */}
                <div
                  className="text-center"
                  data-aos="fade-up"
                  data-aos-delay="0"
                >
                  {" "}
                  {/* Reduced delay and simplified effect */}
                  <p
                    className={`text-2xl font-bold ${
                      isDark ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {studentProfile.cgpa}
                  </p>
                  <p className={`text-sm ${textTertiary}`}>CGPA</p>
                </div>
                <div
                  className="text-center"
                  data-aos="fade-up"
                  data-aos-delay="50"
                >
                  {" "}
                  {/* Reduced delay and simplified effect */}
                  <p
                    className={`text-2xl font-bold ${
                      isDark ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {studentProfile.backlogs}
                  </p>
                  <p className={`text-sm ${textTertiary}`}>Backlogs</p>
                </div>
                <div
                  className="text-center"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  {" "}
                  {/* Reduced delay and simplified effect */}
                  <p
                    className={`text-2xl font-bold ${
                      isDark ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {studentProfile.completionPercentage}%
                  </p>
                  <p className={`text-sm ${textTertiary}`}>Completed</p>
                </div>
                <div
                  className="text-center"
                  data-aos="fade-up"
                  data-aos-delay="150"
                >
                  {" "}
                  {/* Reduced delay and simplified effect */}
                  <p
                    className={`text-2xl font-bold ${
                      isDark ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {applications.length}
                  </p>
                  <p className={`text-sm ${textTertiary}`}>Applied</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6" data-aos="fade-up" data-aos-delay="200">
              {" "}
              {/* Reduced delay */}
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-medium ${textSecondary}`}>
                  Course Progress
                </span>
                <span className={`text-sm font-medium ${textPrimary}`}>
                  {studentProfile.completionPercentage}%
                </span>
              </div>
              <div
                className={`w-full ${
                  isDark ? "bg-gray-700" : "bg-gray-200"
                } rounded-full h-2`}
              >
                <div
                  className={`${
                    isDark ? "bg-red-500" : "bg-red-600"
                  } h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${studentProfile.completionPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Skills Section */}
            <div data-aos="fade-up" data-aos-delay="250">
              {" "}
              {/* Reduced delay */}
              <h3 className={`text-lg font-semibold ${textPrimary} mb-3`}>
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {studentProfile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      isDark
                        ? "bg-red-900/20 text-red-400"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        {/* Simplified effect and reduced delays for all cards */}
        <section className="mb-8" data-aos="fade-up" data-aos-delay="50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Resume Card */}
            <div
              className={`${bgCard} rounded-lg shadow-lg p-6 flex flex-col justify-between h-full border ${borderColor} transition-colors duration-500`}
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <div className="flex items-center mb-4">
                <div
                  className={`${
                    isDark
                      ? "bg-red-900/20 text-red-400"
                      : "bg-red-100 text-red-600"
                  } p-3 rounded-lg mr-4`}
                >
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-semibold ${textPrimary}`}>Resume</h3>
                  <p
                    className={`text-sm ${
                      isDark ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {studentProfile.resumeFileName ? 'Uploaded' : 'Missing'}
                  </p>
                </div>
              </div>
              <p className={`text-sm ${textSecondary} mb-4 break-words`}>
                {studentProfile.resumeFileName || 'Upload your resume'}
              </p>
              {studentProfile.resumePath && (
                <a
                  href={`${API_BASE_URL}${studentProfile.resumePath}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mb-3 text-sm font-semibold text-red-700 hover:underline"
                >
                  View uploaded resume
                </a>
              )}
              <button
                onClick={handleResumeUpload}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <Upload className="w-4 h-4 mr-2" />
                Update Resume
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
              />
            </div>

            {/* Applications Card */}
            <div
              className={`${bgCard} rounded-lg shadow-lg p-6 flex flex-col justify-between h-full border ${borderColor} transition-colors duration-500`}
              data-aos="fade-up"
              data-aos-delay="50"
            >
              <div className="flex items-center mb-4">
                <div
                  className={`${
                    isDark
                      ? "bg-red-900/20 text-red-400"
                      : "bg-red-100 text-red-600"
                  } p-3 rounded-lg mr-4`}
                >
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-semibold ${textPrimary}`}>
                    Applications
                  </h3>
                  <p
                    className={`text-sm ${
                      isDark ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {
                      applications.filter((app) => app.status === "Applied")
                        .length
                    }{" "}
                    Pending
                  </p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className={`text-sm ${textSecondary}`}>
                    Total Applied:
                  </span>
                  <span className={`text-sm font-medium ${textPrimary}`}>
                    {applications.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${textSecondary}`}>
                    Shortlisted:
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      isDark ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {
                      applications.filter((app) => app.status === "Shortlisted")
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${textSecondary}`}>
                    Interviews:
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      isDark ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {
                      applications.filter(
                        (app) => app.status === "Interview Scheduled"
                      ).length
                    }
                  </span>
                </div>
              </div>
              <Link
                to="/applications"
                className={`w-full ${
                  isDark ? "bg-red-500" : "bg-red-600"
                } text-white py-2 px-4 rounded-lg ${
                  isDark ? "hover:bg-red-600" : "hover:bg-red-700"
                } transition-colors text-center block`}
              >
                View All Applications
              </Link>
            </div>

            {/* Next Interview Card */}
            <div
              className={`${bgCard} rounded-lg shadow-lg p-6 flex flex-col justify-between h-full border ${borderColor} transition-colors duration-500`}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="flex items-center mb-4">
                <div
                  className={`${
                    isDark
                      ? "bg-red-900/20 text-red-400"
                      : "bg-red-100 text-red-600"
                  } p-3 rounded-lg mr-4`}
                >
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-semibold ${textPrimary}`}>
                    Next Interview
                  </h3>
                  <p
                    className={`text-sm ${
                      isDark ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    Urgent
                  </p>
                </div>
              </div>
              {nextInterview ? (
                <div className="mb-4">
                  <p className={`font-medium ${textPrimary}`}>{nextInterview.company}</p>
                  <p className={`text-sm ${textSecondary}`}>{nextInterview.position}</p>
                  <p className={`text-sm ${textTertiary}`}>
                    {new Date(nextInterview.interviewDate).toLocaleString()}
                  </p>
                </div>
              ) : (
                <p className={`mb-4 text-sm ${textSecondary}`}>No interviews scheduled yet.</p>
              )}
              <Link to="/applications" className="block w-full rounded-lg bg-red-600 px-4 py-2 text-center text-white hover:bg-red-700 transition-colors">
                View Applications
              </Link>
            </div>

            {/* Eligible Jobs Card */}
            <div
              className={`${bgCard} rounded-lg shadow-lg p-6 flex flex-col justify-between h-full border ${borderColor} transition-colors duration-500`}
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <div className="flex items-center mb-4">
                <div
                  className={`${
                    isDark
                      ? "bg-red-900/20 text-red-400"
                      : "bg-red-100 text-red-600"
                  } p-3 rounded-lg mr-4`}
                >
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-semibold ${textPrimary}`}>
                    Eligible Jobs
                  </h3>
                  <p
                    className={`text-sm ${
                      isDark ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {availableJobs.filter((job) => job.isEligible).length}{" "}
                    Available
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <p className={`text-sm ${textSecondary}`}>
                  Based on your profile
                </p>
                <p className={`font-medium ${textPrimary}`}>
                  {availableJobs.filter((job) => job.isEligible).length} Jobs
                  Available
                </p>
              </div>
              <Link to="/jobs" className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-center block">
                Browse Jobs
              </Link>
            </div>
          </div>
        </section>

        {/* Analytics Section */}
        <section className="mb-8" data-aos="fade-up">
          <div className="mb-6">
            <h2 className={`text-2xl font-bold ${textPrimary} mb-2`}>
              Placement Analytics
            </h2>
            <p className={textSecondary}>Comprehensive insights and trends</p>
          </div>

          {/* Overview Stats */}
          {/* Reduced data-aos-delay */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div
              className={`${bgCard} rounded-lg shadow-lg p-6 border ${borderColor} transition-colors duration-500`}
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <div className="flex items-center">
                <div
                  className={`${
                    isDark
                      ? "bg-green-900/20 text-green-400"
                      : "bg-green-100 text-green-600"
                  } p-3 rounded-lg mr-4`}
                >
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className={`text-sm ${textSecondary}`}>
                    Overall Placement Rate
                  </p>
                  <p className={`text-2xl font-bold ${textPrimary}`}>78%</p>
                  <p
                    className={`text-sm ${
                      isDark ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    ↑ 5% from last year
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`${bgCard} rounded-lg shadow-lg p-6 border ${borderColor} transition-colors duration-500`}
              data-aos="fade-up"
              data-aos-delay="50"
            >
              <div className="flex items-center">
                <div
                  className={`${
                    isDark
                      ? "bg-blue-900/20 text-blue-400"
                      : "bg-blue-100 text-blue-600"
                  } p-3 rounded-lg mr-4`}
                >
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className={`text-sm ${textSecondary}`}>Total Students</p>
                  <p className={`text-2xl font-bold ${textPrimary}`}>450</p>
                  <p
                    className={`text-sm ${
                      isDark ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    2024 Batch
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`${bgCard} rounded-lg shadow-lg p-6 border ${borderColor} transition-colors duration-500`}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="flex items-center">
                <div
                  className={`${
                    isDark
                      ? "bg-yellow-900/20 text-yellow-400"
                      : "bg-yellow-100 text-yellow-600"
                  } p-3 rounded-lg mr-4`}
                >
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <p className={`text-sm ${textSecondary}`}>
                    Recruiting Companies
                  </p>
                  <p className={`text-2xl font-bold ${textPrimary}`}>85</p>
                  <p
                    className={`text-sm ${
                      isDark ? "text-yellow-400" : "text-yellow-600"
                    }`}
                  >
                    15 new this year
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`${bgCard} rounded-lg shadow-lg p-6 border ${borderColor} transition-colors duration-500`}
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <div className="flex items-center">
                <div
                  className={`${
                    isDark
                      ? "bg-purple-900/20 text-purple-400"
                      : "bg-purple-100 text-purple-600"
                  } p-3 rounded-lg mr-4`}
                >
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className={`text-sm ${textSecondary}`}>Average Package</p>
                  <p className={`text-2xl font-bold ${textPrimary}`}>
                    12.5 LPA
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? "text-purple-400" : "text-purple-600"
                    }`}
                  >
                    Highest: 45 LPA
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Placement Trends */}
            {/* Reduced data-aos-delay and simplified effect */}
            <div
              className={`${bgCard} rounded-lg shadow-lg p-6 border ${borderColor} transition-colors duration-500`}
              data-aos="fade"
              data-aos-delay="200"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className={`text-lg font-semibold ${textPrimary}`}>
                  Placement Analytics
                </h4>
                <div className="flex-shrink-0">
                  <select
                    className={`${
                      isDark
                        ? "bg-gray-800 text-gray-200 border-gray-700"
                        : "bg-white text-gray-900 border-gray-300"
                    } border rounded px-3 py-1 text-sm shadow focus:outline-none focus:ring-2 focus:ring-red-500`}
                  >
                    <option>Current Year</option>
                  </select>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={placementTrends}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={
                        isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"
                      }
                    />
                    <XAxis
                      dataKey="year"
                      stroke={isDark ? "rgba(255,255,255,0.8)" : "#495057"}
                    />
                    <YAxis
                      yAxisId="left"
                      orientation="left"
                      stroke={isDark ? "rgba(255,255,255,0.8)" : "#495057"}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke={isDark ? "rgba(255,255,255,0.8)" : "#495057"}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark
                          ? "rgba(30,30,30,0.95)"
                          : "white",
                        border: "2px solid #dc2626",
                        color: isDark ? "#fff" : "#dc2626",
                      }}
                      itemStyle={{
                        color: isDark ? " #f5f5f5" : "#dc2626", // fixes text color inside tooltip
                      }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="placementRate"
                      stroke="#7c2d12"
                      strokeWidth={2}
                      name="Placement Rate (%)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="avgPackage"
                      stroke="#dc2626"
                      strokeWidth={2}
                      name="Average Package (LPA)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Application Status Pie Chart */}
            {/* Reduced data-aos-delay and simplified effect */}
            <div
              className={`${bgCard} rounded-lg shadow-lg p-6 border ${borderColor} transition-colors duration-500`}
              data-aos="fade"
              data-aos-delay="200"
            >
              <div className="mb-4">
                <h4 className={`text-lg font-semibold ${textPrimary}`}>
                  Application Status
                </h4>
                <p className={textSecondary}>
                  Total: {applications.length} Applications
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={[
                        {
                          name: "Applied",
                          value: applications.filter(
                            (app) => app.status === "Applied"
                          ).length,
                          color: "#f87171",
                        },
                        {
                          name: "Shortlisted",
                          value: applications.filter(
                            (app) => app.status === "Shortlisted"
                          ).length,
                          color: "#dc2626",
                        },
                        {
                          name: "Interview Scheduled",
                          value: applications.filter(
                            (app) => app.status === "Interview Scheduled"
                          ).length,
                          color: "#7c2d12",
                        },
                        { name: "Selected", value: 0, color: "#10b981" },
                        {
                          name: "Rejected",
                          value: applications.filter(
                            (app) => app.status === "Rejected"
                          ).length,
                          color: "#ef4444",
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {[
                        {
                          name: "Applied",
                          value: applications.filter(
                            (app) => app.status === "Applied"
                          ).length,
                          color: "#f87171",
                        },
                        {
                          name: "Shortlisted",
                          value: applications.filter(
                            (app) => app.status === "Shortlisted"
                          ).length,
                          color: "#dc2626",
                        },
                        {
                          name: "Interview Scheduled",
                          value: applications.filter(
                            (app) => app.status === "Interview Scheduled"
                          ).length,
                          color: "#7c2d12",
                        },
                        { name: "Selected", value: 0, color: "#10b981" },
                        {
                          name: "Rejected",
                          value: applications.filter(
                            (app) => app.status === "Rejected"
                          ).length,
                          color: "#ef4444",
                        },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark
                          ? "rgba(30,30,30,0.95)"
                          : "white",
                        border: "1px solid #dc2626",
                        color: isDark ? "#fff" : "#000",
                      }}
                      itemStyle={{
                        color: isDark ? "#f5f5f5" : "#000", // fixes text color inside tooltip
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-300 rounded mr-2"></div>
                  <span className={`text-sm ${textSecondary}`}>Applied</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-600 rounded mr-2"></div>
                  <span className={`text-sm ${textSecondary}`}>
                    Shortlisted
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-800 rounded mr-2"></div>
                  <span className={`text-sm ${textSecondary}`}>Interview</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span className={`text-sm ${textSecondary}`}>Selected</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-400 rounded mr-2"></div>
                  <span className={`text-sm ${textSecondary}`}>Rejected</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <h2 className={`text-2xl font-bold ${textPrimary} mb-4 lg:mb-0`}>
              My Applications
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative ml-4">
                <Search
                  className={`absolute left-3 top-3 w-4 h-4 ${textTertiary}`}
                />
                <input
                  type="text"
                  placeholder="Search applications..."
                  className={`pl-10 pr-4 py-2 border ${
                    isDark
                      ? "border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-500"
                      : "border-gray-300 bg-white text-gray-900 placeholder-gray-700"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-64`}
                />
              </div>
              <select
                className={`px-4 py-2 border ${
                  isDark
                    ? "border-gray-700 bg-gray-800 text-gray-200"
                    : "border-gray-300 bg-white text-gray-900"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ml-4`}
              >
                <option value="all">All Status</option>
                <option value="applied">Applied</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interview">Interview</option>
              </select>
            </div>
          </div>

          {/* Application Stats */}
          {/* Reduced data-aos-delay */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div
              className={`${bgCard} rounded-lg shadow p-4 text-center border ${borderColor}`}
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <p className={`text-2xl font-bold ${textPrimary}`}>
                {applications.length}
              </p>
              <p className={`text-sm ${textSecondary}`}>Total Applied</p>
            </div>
            <div
              className={`${bgCard} rounded-lg shadow p-4 text-center border ${borderColor}`}
              data-aos="fade-up"
              data-aos-delay="50"
            >
              <p
                className={`text-2xl font-bold ${
                  isDark ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {
                  applications.filter(
                    (app) => app.status === "Interview Scheduled"
                  ).length
                }
              </p>
              <p className={`text-sm ${textSecondary}`}>Interviews</p>
            </div>
            <div
              className={`${bgCard} rounded-lg shadow p-4 text-center border ${borderColor}`}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p
                className={`text-2xl font-bold ${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              >
                {
                  applications.filter((app) => app.status === "Shortlisted")
                    .length
                }
              </p>
              <p className={`text-sm ${textSecondary}`}>Shortlisted</p>
            </div>
            <div
              className={`${bgCard} rounded-lg shadow p-4 text-center border ${borderColor}`}
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <p
                className={`text-2xl font-bold ${
                  isDark ? "text-red-400" : "text-red-600"
                }`}
              >
                {applications.filter((app) => app.status === "Rejected").length}
              </p>
              <p className={`text-sm ${textSecondary}`}>Rejected</p>
            </div>
            <div
              className={`${bgCard} rounded-lg shadow p-4 text-center border ${borderColor}`}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <p
                className={`text-2xl font-bold ${
                  isDark ? "text-yellow-400" : "text-yellow-600"
                }`}
              >
                {applications.filter((app) => app.status === "Applied").length}
              </p>
              <p className={`text-sm ${textSecondary}`}>Pending</p>
            </div>
          </div>

          {/* Applications List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app, index) => (
              <div
                key={app.id}
                className={`${bgCard} rounded-lg shadow-lg p-6 border ${borderColor} transition-colors duration-500`}
                data-aos="fade-up"
                data-aos-delay={50 * index} // Significantly reduced delay
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div className="flex items-center mb-4 lg:mb-0">
                    <div
                      className={`${
                        isDark
                          ? "bg-red-900/20 text-red-400"
                          : "bg-red-100 text-red-800"
                      } font-bold w-12 h-12 rounded-full flex items-center justify-center mr-4`}
                    >
                      {app.company.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className={`text-xl font-semibold ${textPrimary}`}>
                        {app.company}
                      </h4>
                      <p className={textSecondary}>{app.position}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={getStatusColor(app.status)}>
                      {app.status}
                    </span>
                    <p
                      className={`text-lg font-semibold mr-3 ${textPrimary} mt-2`}
                    >
                      {app.package}
                    </p>
                  </div>
                </div>
                <div className="mb-8 mt-5 ml-2">
                  <div className="flex items-center mb-1 font-semibold">
                    <FileCheck className={`w-4 h-4 mr-2 ${textSecondary}`} />
                    <p className={`text-sm ${textTertiary}`}>
                      Applied: {new Date(app.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center mb-1 font-semibold">
                    {app.interviewDate && (
                      <>
                        <Calendar className={`w-4 h-4 mr-2 ${textSecondary}`} />
                        <p className={`text-sm ${textTertiary}`}>
                          Interview:{" "}
                          {new Date(app.interviewDate).toLocaleDateString()}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4 ml-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm font-medium ${textSecondary}`}>
                      {app.currentRound || "Applied"}
                    </span>
                    <span className={`text-sm ${textTertiary}`}>
                      {app.currentRound
                        ? `${app.rounds.indexOf(app.currentRound) + 1}/${
                            app.rounds.length
                          }`
                        : "1/4"}
                    </span>
                  </div>
                  <div
                    className={`w-full ${
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    } rounded-full h-2`}
                  >
                    <div
                      className={`${
                        isDark ? "bg-red-500" : "bg-red-600"
                      } h-2 rounded-full transition-all duration-300`}
                      style={{
                        width: `${
                          app.currentRound
                            ? ((app.rounds.indexOf(app.currentRound) + 1) /
                                app.rounds.length) *
                              100
                            : 25
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Rounds */}
                <div className="ml-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
                    {(app.rounds || []).map((round, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm ${
                          app.currentRound &&
                          app.rounds.indexOf(app.currentRound) >= index
                            ? isDark
                              ? "bg-red-900/20 text-red-400 font-medium"
                              : "bg-red-100 text-red-800 font-medium"
                            : isDark
                            ? "bg-gray-800 text-gray-500"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {round}
                      </span>
                    ))}
                  </div>
                  <button
                    className={`${
                      isDark
                        ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    } px-4 py-2 rounded-lg flex items-center transition-colors`}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Available Jobs Section */}
        <section className="mb-8" data-aos="fade-up">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <h2 className={`text-2xl font-bold ${textPrimary} mb-4 lg:mb-0`}>
              Available Jobs
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search
                  className={`absolute left-3 top-3 w-4 h-4 ${textTertiary}`}
                />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className={`pl-10 pr-4 py-2 border ${
                    isDark
                      ? "border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-500"
                      : "border-gray-300 bg-white text-gray-900 placeholder-gray-700"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-64`}
                />
              </div>
              <select
                className={`px-4 py-2 border ${
                  isDark
                    ? "border-gray-700 bg-gray-800 text-gray-200"
                    : "border-gray-300 bg-white text-gray-900"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500`}
              >
                <option value="all">All Jobs</option>
                <option value="eligible">Eligible</option>
                <option value="not-eligible">Not Eligible</option>
              </select>
            </div>
          </div>

          {/* Job Statistics */}
          {/* Reduced data-aos-delay */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div
              className={`${bgCard} rounded-lg shadow p-4 text-center border ${borderColor}`}
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <p className={`text-2xl font-bold ${textPrimary}`}>
                {availableJobs.length}
              </p>
              <p className={`text-sm ${textSecondary}`}>Total Jobs</p>
            </div>
            <div
              className={`${bgCard} rounded-lg shadow p-4 text-center border ${borderColor}`}
              data-aos="fade-up"
              data-aos-delay="50"
            >
              <p
                className={`text-2xl font-bold ${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              >
                {availableJobs.filter((job) => job.isEligible).length}
              </p>
              <p className={`text-sm ${textSecondary}`}>Eligible</p>
            </div>
            <div
              className={`${bgCard} rounded-lg shadow p-4 text-center border ${borderColor}`}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p
                className={`text-2xl font-bold ${
                  isDark ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {availableJobs.filter((job) => job.type === "Full-time").length}
              </p>
              <p className={`text-sm ${textSecondary}`}>Full-time</p>
            </div>
            <div
              className={`${bgCard} rounded-lg shadow p-4 text-center border ${borderColor}`}
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <p
                className={`text-2xl font-bold ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              >
                12
              </p>
              <p className={`text-sm ${textSecondary}`}>Avg Package (LPA)</p>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableJobs.map((job, index) => (
              <div
                key={job.id}
                className={`${bgCard} rounded-lg shadow-lg p-6 border ${borderColor} transition-colors duration-500`}
                data-aos="fade-up"
                data-aos-delay={50 * index} // Significantly reduced delay
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div
                      className={`${
                        isDark
                          ? "bg-red-900/20 text-red-400"
                          : "bg-red-100 text-red-800"
                      } font-bold w-10 h-10 rounded-full flex items-center justify-center mr-3`}
                    >
                      {job.company.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${textPrimary}`}>
                        {job.company}
                      </h4>
                      <p className={textSecondary}>{job.position}</p>
                    </div>
                  </div>
                  {job.isEligible ? (
                    <div
                      className={`${
                        isDark
                          ? "bg-green-900/20 text-green-400"
                          : "bg-green-100 text-green-800"
                      } flex items-center px-2 py-1 rounded-full text-xs`}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      <span>Eligible</span>
                    </div>
                  ) : (
                    <div
                      className={`${
                        isDark
                          ? "bg-red-900/20 text-red-400"
                          : "bg-red-100 text-red-800"
                      } flex items-center px-2 py-1 rounded-full text-xs`}
                    >
                      <XCircle className="w-3 h-3 mr-1" />
                      <span>Not Eligible</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm ${textSecondary}">
                    <DollarSign className={`w-4 h-4 mr-2 ${textSecondary}`} />
                    <span className={`font-medium ${textPrimary}`}>
                      {job.package}
                    </span>
                  </div>
                  <div className="flex items-center text-sm ${textSecondary}">
                    <MapPin className={`w-4 h-4 mr-2 ${textSecondary}`} />
                    <span className={textSecondary}>{job.location}</span>
                  </div>
                  <div className="flex items-center text-sm ${textSecondary}">
                    <Calendar className={`w-4 h-4 mr-2 ${textSecondary}`} />
                    <span className={textSecondary}>
                      Deadline: {new Date(job.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className={`text-sm font-medium ${textSecondary} mb-2`}>
                    Requirements:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {(job.requirements || []).map((req, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 ${
                          isDark
                            ? "bg-gray-800 text-gray-400"
                            : "bg-gray-100 text-gray-700"
                        } text-xs rounded`}
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  {job.isEligible ? (
                    <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm">
                      Apply Now
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed text-sm"
                    >
                      Not Eligible
                    </button>
                  )}
                  <button
                    className={`flex-1 ${
                      isDark
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } py-2 px-4 rounded-lg transition-colors text-sm`}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Schedule Section */}
        <section className="mb-8" data-aos="fade-up">
          <div className="mb-6">
            <h2 className={`text-2xl font-bold ${textPrimary} mb-2`}>
              Upcoming Schedule
            </h2>
            <p className={textSecondary}>
              Your scheduled interviews and application deadlines
            </p>
          </div>

          <div className="space-y-4">
            {applications
              .filter((app) => app.interviewDate)
              .map((app, index) => (
                <div
                  key={app.id}
                  className={`${bgCard} rounded-lg shadow-lg p-6 border ${borderColor} transition-colors duration-500`}
                  data-aos="fade-up" // Changed from fade-right
                  data-aos-delay={50 * index} // Significantly reduced delay
                >
                  <div className="flex items-center">
                    <div
                      className={`${
                        isDark
                          ? "bg-red-900/20 text-red-400"
                          : "bg-red-100 text-red-600"
                      } p-3 rounded-lg mr-4`}
                    >
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium mr-3 ${
                            app.interviewDate === "2025-08-26"
                              ? isDark
                                ? "bg-red-900/20 text-red-400"
                                : "bg-red-100 text-red-800"
                              : isDark
                              ? "bg-blue-900/20 text-blue-400"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {app.interviewDate === "2025-08-26"
                            ? "Tomorrow"
                            : "Scheduled"}
                        </span>
                      </div>
                      <h3 className={`font-semibold ${textPrimary}`}>
                        Interview
                      </h3>
                      <p className={textSecondary}>
                        {app.company} - {app.position}
                      </p>
                      <div
                        className={`flex items-center space-x-4 mt-2 text-sm ${textTertiary}`}
                      >
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          1:03 PM
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          Virtual Meet
                        </span>
                      </div>
                    </div>
                    <button className="font-semibold bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Skills Demand & Department Performance */}
        <section className="mb-8" data-aos="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Skill Demand */}
            {/* Reduced data-aos-delay and simplified effect */}
            <div
              className={`${bgCard} rounded-lg shadow-lg p-6 border ${borderColor} transition-colors duration-500`}
              data-aos="fade"
              data-aos-delay="100"
            >
              <h4 className={`text-lg font-semibold ${textPrimary} mb-4`}>
                Most In-Demand Skills
              </h4>
              <div className="space-y-3">
                {skillDemand.slice(0, 6).map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className={`text-sm font-medium ${textSecondary}`}>
                      {skill.skill}
                    </span>
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-24 ${
                          isDark ? "bg-gray-700" : "bg-gray-200"
                        } rounded-full h-2`}
                      >
                        <div
                          className={`${
                            isDark ? "bg-red-500" : "bg-red-600"
                          } h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${skill.demand}%` }}
                        ></div>
                      </div>
                      <span
                        className={`text-sm w-8 ${
                          isDark ? "text-red-400" : "text-gray-600"
                        }`}
                      >
                        {skill.demand}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Performance */}
            {/* Reduced data-aos-delay and simplified effect */}
            <div
              className={`${bgCard} rounded-lg shadow-lg p-6 border ${borderColor} transition-colors duration-500`}
              data-aos="fade"
              data-aos-delay="100"
            >
              <h4 className={`text-lg font-semibold ${textPrimary} mb-4`}>
                Department-wise Placement
              </h4>
              <div className="space-y-3">
                {departmentStats.map((dept, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-sm font-medium ${textSecondary}`}>
                        {dept.department}
                      </span>
                      <span className={`text-sm ${textSecondary}`}>
                        {dept.placed}/{dept.total} ({dept.percentage}%)
                      </span>
                    </div>
                    <div
                      className={`w-full ${
                        isDark ? "bg-gray-700" : "bg-gray-200"
                      } rounded-full h-2`}
                    >
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${dept.percentage}%`,
                          backgroundColor:
                            dept.percentage >= 70
                              ? isDark
                                ? "#ef4444"
                                : "#dc2626"
                              : dept.percentage >= 50
                              ? isDark
                                ? "#fcd34d"
                                : "#f59e0b"
                              : isDark
                              ? "#fca5a5"
                              : "#ef4444",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentProfile;
