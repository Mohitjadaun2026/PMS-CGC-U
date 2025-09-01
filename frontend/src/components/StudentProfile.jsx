import React, { useState, useRef } from 'react';
import { 
  User, Mail, Phone, GraduationCap, Calendar, MapPin, 
  FileText, Download, Upload, Edit, Search, Filter, 
  Bell, TrendingUp, BarChart3, PieChart, Clock, 
  CheckCircle, XCircle, AlertCircle, Eye, Star,
  Building2, Users, Target, Award, BookOpen, Home,
  Activity, Briefcase, ChevronRight, DollarSign,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie, Area, AreaChart,
  RadialBarChart, RadialBar, Legend
} from 'recharts';
import './StudentProfile.css';
const StudentProfile = () => {
  // Enhanced Student Profile Data
  const [studentProfile] = useState({
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
    photo: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&q=80",
    linkedin: "linkedin.com/in/mohit-jadaun",
    github: "github.com/mohitjadaun",
    skills: ["JavaScript", "React", "Node.js", "Python", "Java", "AWS", "MongoDB", "Docker"],
    certifications: [
      "AWS Certified Cloud Practitioner", 
      "Google Data Analytics", 
      "React Certification",
      "Python for Data Science"
    ],
    resume: "Mohit_Jadaun_Resume.pdf",
    projects: [
      { name: "E-commerce Platform", tech: "React, Node.js", status: "Completed" },
      { name: "Task Management App", tech: "Python, Django", status: "In Progress" },
      { name: "Portfolio Website", tech: "React, Tailwind", status: "Completed" }
    ],
    achievements: [
      "Dean's List Fall 2023",
      "Best Project Award - Web Development",
      "Hackathon Winner - TechFest 2024"
    ]
  });

  // Enhanced Applications Data
  const [applications] = useState([
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
      currentRound: "Technical"
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
      currentRound: "Technical"
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
      currentRound: null
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
      currentRound: "Completed"
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
      currentRound: "Cultural Fit"
    }
  ]);

  // Enhanced Available Jobs Data
  const [availableJobs] = useState([
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
      companySize: "500-1000"
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
      companySize: "500-1000"
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
      companySize: "100-500"
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
      companySize: "50-100"
    }
  ]);

  // Enhanced Analytics Data
  const placementTrends = [
    { year: '2020', placementRate: 74, avgPackage: 3.2 },
    { year: '2021', placementRate: 78, avgPackage: 3.6 },
    { year: '2022', placementRate: 85, avgPackage: 4.2 },
    { year: '2023', placementRate: 89, avgPackage: 4.8 },
    { year: '2024', placementRate: 92, avgPackage: 5.2 }
  ];

  const monthlyTrends = [
    { month: 'Jan', placements: 45, applications: 120, offers: 52 },
    { month: 'Feb', placements: 52, applications: 135, offers: 60 },
    { month: 'Mar', placements: 38, applications: 98, offers: 45 },
    { month: 'Apr', placements: 61, applications: 156, offers: 72 },
    { month: 'May', placements: 74, applications: 189, offers: 85 },
    { month: 'Jun', placements: 66, applications: 167, offers: 78 },
    { month: 'Jul', placements: 58, applications: 145, offers: 68 },
    { month: 'Aug', placements: 71, applications: 178, offers: 82 }
  ];

  const companyWiseStats = [
    { name: 'Tech Giants', value: 35, color: '#7c2d12' },
    { name: 'Startups', value: 28, color: '#991b1b' },
    { name: 'Service Companies', value: 22, color: '#dc2626' },
    { name: 'Product Companies', value: 15, color: '#ef4444' }
  ];

  const packageDistribution = [
    { range: '0-5 LPA', count: 12, color: '#fee2e2' },
    { range: '5-10 LPA', count: 28, color: '#fecaca' },
    { range: '10-15 LPA', count: 35, color: '#f87171' },
    { range: '15-20 LPA', count: 18, color: '#ef4444' },
    { range: '20+ LPA', count: 7, color: '#dc2626' }
  ];

  const skillDemand = [
    { skill: 'JavaScript', demand: 85, jobs: 120 },
    { skill: 'React', demand: 78, jobs: 95 },
    { skill: 'Python', demand: 72, jobs: 88 },
    { skill: 'Java', demand: 68, jobs: 82 },
    { skill: 'Node.js', demand: 65, jobs: 75 },
    { skill: 'AWS', demand: 60, jobs: 70 },
    { skill: 'MongoDB', demand: 45, jobs: 55 },
    { skill: 'Docker', demand: 42, jobs: 48 }
  ];

  const departmentStats = [
    { department: 'CSE', placed: 85, total: 110, percentage: 77 },
    { department: 'IT', placed: 72, total: 90, percentage: 80 },
    { department: 'ECE', placed: 45, total: 70, percentage: 64 },
    { department: 'Mechanical', placed: 38, total: 80, percentage: 48 },
    { department: 'Civil', placed: 25, total: 60, percentage: 42 }
  ];

  // State Management
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [notifications] = useState([
    { id: 1, message: "Interview scheduled with Tech Solutions Inc. on Nov 10", type: "info", time: "2 hours ago", unread: true },
    { id: 2, message: "New job posting: ML Engineer at AI Innovations", type: "success", time: "1 day ago", unread: true },
    { id: 3, message: "Application deadline reminder: Digital Solutions (Nov 20)", type: "warning", time: "2 days ago", unread: false },
    { id: 4, message: "Congratulations! Shortlisted for StartupX interview", type: "success", time: "3 days ago", unread: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const fileInputRef = useRef(null);

  const handleResumeUpload = () => {
    fileInputRef.current?.click();
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'interview scheduled': return 'bg-blue-100 text-blue-800';
      case 'applied': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
<<<<<<< HEAD
  <div className="min-h-screen bg-gray-50 w-screen p-0 m-0">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="w-full flex items-center justify-between px-0 py-0" style={{margin:0,padding:0}}>
          <div className="flex items-center gap-4 w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-none shadow-md" style={{margin:0}}>
            <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
              <span className="inline-block bg-white rounded-full p-2 shadow" style={{marginRight:'0.5rem'}}>
                <Bell className="w-7 h-7 text-red-600" />
              </span>
              <div>
                <h1 className="text-4xl font-extrabold text-white tracking-tight mb-1" style={{letterSpacing:'-1px',margin:0}}>Student Dashboard</h1>
                <p className="text-red-100 text-lg font-medium" style={{margin:0}}>Welcome back! Here's your complete placement overview.</p>
              </div>
=======
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-red-600 p-2 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Placement Portal</h1>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs, companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-80"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-900"
                >
                  <Bell className="w-6 h-6" />
                  {notifications.filter(n => n.unread).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications.filter(n => n.unread).length}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-10">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`p-4 border-b hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''}`}>
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Profile Photo */}
              <img 
                src={studentProfile.photo} 
                alt="Profile" 
                className="w-8 h-8 rounded-full border-2 border-gray-300"
              />
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
<<<<<<< HEAD
      <main className="w-screen p-0 m-0 min-h-screen">
        {/* Welcome Section */}

        {/* Profile Overview Section */}
        <section className="mb-8">
          <div className="bg-white shadow-lg p-6 w-screen m-0" style={{borderRadius:0}}>
=======
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
            <p className="text-red-100">Welcome back! Here's your complete placement overview.</p>
          </div>
        </section>

        {/* Profile Overview Section */}
        <section className="mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <img 
                  src={studentProfile.photo} 
                  alt="Profile" 
<<<<<<< HEAD
                  className="w-28 h-28 rounded-full border-4 border-gray-200 shadow-lg"
=======
                  className="w-16 h-16 rounded-full border-4 border-gray-200"
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{studentProfile.name}</h2>
                  <p className="text-gray-600">{studentProfile.department}</p>
                  <p className="text-sm text-gray-500">Roll: {studentProfile.rollNo} • Batch: {studentProfile.batch}</p>
                </div>
              </div>
              
              <div className="flex space-x-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{studentProfile.cgpa}</p>
                  <p className="text-sm text-gray-500">CGPA</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{studentProfile.backlogs}</p>
                  <p className="text-sm text-gray-500">Backlogs</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{studentProfile.completionPercentage}%</p>
                  <p className="text-sm text-gray-500">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{applications.length}</p>
                  <p className="text-sm text-gray-500">Applied</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Course Progress</span>
                <span className="text-sm font-medium text-gray-900">{studentProfile.completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${studentProfile.completionPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {studentProfile.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="mb-8">
<<<<<<< HEAD
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-screen m-0" style={{borderRadius:0}}>
            {/* Resume Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between h-full">
=======
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Resume Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-lg mr-4">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Resume</h3>
                  <p className="text-sm text-red-600">Missing</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">Upload your resume</p>
              <button onClick={handleResumeUpload} className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center">
                <Upload className="w-4 h-4 mr-2" />
                Update Resume
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept=".pdf,.doc,.docx"
              />
            </div>

            {/* Applications Card */}
<<<<<<< HEAD
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between h-full">
=======
            <div className="bg-white rounded-lg shadow-lg p-6">
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Applications</h3>
                  <p className="text-sm text-blue-600">{applications.filter(app => app.status === 'Applied').length} Pending</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Applied:</span>
                  <span className="text-sm font-medium">{applications.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Shortlisted:</span>
                  <span className="text-sm font-medium text-green-600">{applications.filter(app => app.status === 'Shortlisted').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Interviews:</span>
                  <span className="text-sm font-medium text-blue-600">{applications.filter(app => app.status === 'Interview Scheduled').length}</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                View All Applications
              </button>
            </div>

            {/* Next Interview Card */}
<<<<<<< HEAD
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between h-full">
=======
            <div className="bg-white rounded-lg shadow-lg p-6">
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Next Interview</h3>
                  <p className="text-sm text-yellow-600">Urgent</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="font-medium text-gray-900">Infosys Limited</p>
                <p className="text-sm text-gray-600">Software Developer</p>
                <p className="text-sm text-gray-500">Aug 26, 2025, 1:03 PM</p>
              </div>
              <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors">
                View Full Schedule
              </button>
            </div>

            {/* Eligible Jobs Card */}
<<<<<<< HEAD
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between h-full">
=======
            <div className="bg-white rounded-lg shadow-lg p-6">
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Eligible Jobs</h3>
                  <p className="text-sm text-green-600">{availableJobs.filter(job => job.isEligible).length} Available</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600">Based on your profile</p>
                <p className="font-medium text-gray-900">{availableJobs.filter(job => job.isEligible).length} Jobs Available</p>
              </div>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                Browse Jobs
              </button>
            </div>
          </div>
        </section>

        {/* Analytics Section */}
        <section className="mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Placement Analytics</h2>
            <p className="text-gray-600">Comprehensive insights and trends</p>
          </div>
          
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Overall Placement Rate</p>
                  <p className="text-2xl font-bold text-gray-900">78%</p>
                  <p className="text-sm text-green-600">↑ 5% from last year</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">450</p>
                  <p className="text-sm text-blue-600">2024 Batch</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <Building2 className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Recruiting Companies</p>
                  <p className="text-2xl font-bold text-gray-900">85</p>
                  <p className="text-sm text-yellow-600">15 new this year</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Package</p>
                  <p className="text-2xl font-bold text-gray-900">12.5 LPA</p>
                  <p className="text-sm text-purple-600">Highest: 45 LPA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Placement Trends */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Placement Analytics</h4>
<<<<<<< HEAD
                <div className="flex-shrink-0">
                  <select className="border border-gray-300 rounded px-3 py-1 text-sm bg-white shadow focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900">
                    <option className="text-gray-900">Current Year</option>
                  </select>
                </div>
=======
                <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                  <option>Current Year</option>
                </select>
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={placementTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
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
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Application Status</h4>
                <p className="text-gray-600">Total: {applications.length} Applications</p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={[
                        { name: 'Applied', value: applications.filter(app => app.status === 'Applied').length, color: '#f87171' },
                        { name: 'Shortlisted', value: applications.filter(app => app.status === 'Shortlisted').length, color: '#dc2626' },
                        { name: 'Interview Scheduled', value: applications.filter(app => app.status === 'Interview Scheduled').length, color: '#7c2d12' },
                        { name: 'Selected', value: 0, color: '#10b981' },
                        { name: 'Rejected', value: applications.filter(app => app.status === 'Rejected').length, color: '#ef4444' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {[
                        { name: 'Applied', value: applications.filter(app => app.status === 'Applied').length, color: '#f87171' },
                        { name: 'Shortlisted', value: applications.filter(app => app.status === 'Shortlisted').length, color: '#dc2626' },
                        { name: 'Interview Scheduled', value: applications.filter(app => app.status === 'Interview Scheduled').length, color: '#7c2d12' },
                        { name: 'Selected', value: 0, color: '#10b981' },
                        { name: 'Rejected', value: applications.filter(app => app.status === 'Rejected').length, color: '#ef4444' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-300 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Applied</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-600 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Shortlisted</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-800 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Interview</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Selected</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-400 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Rejected</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 lg:mb-0">My Applications</h2>
            <div className="flex flex-col sm:flex-row gap-4">
<<<<<<< HEAD
              <div className="relative ml-4">
=======
              <div className="relative">
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applications..."
<<<<<<< HEAD
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-64 text-gray-900 placeholder-gray-700"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 ml-4">
                <option value="all" className="text-gray-900">All Status</option>
                <option value="applied" className="text-gray-900">Applied</option>
                <option value="shortlisted" className="text-gray-900">Shortlisted</option>
                <option value="interview" className="text-gray-900">Interview</option>
=======
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-64"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option value="all">All Status</option>
                <option value="applied">Applied</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interview">Interview</option>
>>>>>>> 143d44905b53594edfd0b7ba6f526494a981cddc
              </select>
            </div>
          </div>

          {/* Application Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
              <p className="text-sm text-gray-600">Total Applied</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{applications.filter(app => app.status === 'Interview Scheduled').length}</p>
              <p className="text-sm text-gray-600">Interviews</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{applications.filter(app => app.status === 'Shortlisted').length}</p>
              <p className="text-sm text-gray-600">Shortlisted</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{applications.filter(app => app.status === 'Rejected').length}</p>
              <p className="text-sm text-gray-600">Rejected</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{applications.filter(app => app.status === 'Applied').length}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>

          {/* Applications List */}
          <div className="space-y-6">
            {applications.map((app) => (
              <div key={app.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div className="flex items-center mb-4 lg:mb-0">
                    <div className="bg-red-100 text-red-800 font-bold w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      {app.company.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{app.company}</h4>
                      <p className="text-gray-600">{app.position}</p>
                      <p className="text-sm text-gray-500">Applied: {new Date(app.appliedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                    <p className="text-lg font-semibold text-gray-900 mt-2">{app.package}</p>
                    {app.interviewDate && (
                      <p className="text-sm text-gray-600">
                        Interview: {new Date(app.interviewDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{app.currentRound || 'Applied'}</span>
                    <span className="text-sm text-gray-500">{app.currentRound ? `${app.rounds.indexOf(app.currentRound) + 1}/${app.rounds.length}` : '1/4'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full transition-all duration-300" 
                      style={{ 
                        width: `${app.currentRound ? ((app.rounds.indexOf(app.currentRound) + 1) / app.rounds.length) * 100 : 25}%`
                      }}
                    ></div>
                  </div>
                </div>
                
                {/* Rounds */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
                    {app.rounds.map((round, index) => (
                      <span 
                        key={index} 
                        className={`px-3 py-1 rounded-full text-sm ${
                          app.currentRound && app.rounds.indexOf(app.currentRound) >= index 
                            ? 'bg-red-100 text-red-800 font-medium' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {round}
                      </span>
                    ))}
                  </div>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center transition-colors">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Available Jobs Section */}
        <section className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 lg:mb-0">Available Jobs</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-64"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option value="all">All Jobs</option>
                <option value="eligible">Eligible</option>
                <option value="not-eligible">Not Eligible</option>
              </select>
            </div>
          </div>

          {/* Job Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{availableJobs.length}</p>
              <p className="text-sm text-gray-600">Total Jobs</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{availableJobs.filter(job => job.isEligible).length}</p>
              <p className="text-sm text-gray-600">Eligible</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{availableJobs.filter(job => job.type === 'Full-time').length}</p>
              <p className="text-sm text-gray-600">Full-time</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">12</p>
              <p className="text-sm text-gray-600">Avg Package (LPA)</p>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-red-100 text-red-800 font-bold w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      {job.company.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{job.company}</h4>
                      <p className="text-sm text-gray-600">{job.position}</p>
                    </div>
                  </div>
                  {job.isEligible ? (
                    <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      <span>Eligible</span>
                    </div>
                  ) : (
                    <div className="flex items-center bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                      <XCircle className="w-3 h-3 mr-1" />
                      <span>Not Eligible</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span className="font-medium text-gray-900">{job.package}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
                  <div className="flex flex-wrap gap-1">
                    {job.requirements.map((req, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
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
                    <button disabled className="flex-1 bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed text-sm">
                      Not Eligible
                    </button>
                  )}
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Schedule Section */}
        <section className="mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Schedule</h2>
            <p className="text-gray-600">Your scheduled interviews and application deadlines</p>
          </div>

          <div className="space-y-4">
            {applications
              .filter(app => app.interviewDate)
              .map((app) => (
                <div key={app.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium mr-3 ${
                          app.interviewDate === '2025-08-26' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {app.interviewDate === '2025-08-26' ? 'Tomorrow' : 'Scheduled'}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900">Interview</h3>
                      <p className="text-gray-600">{app.company} - {app.position}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
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
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Skills Demand & Department Performance */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Skill Demand */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Most In-Demand Skills</h4>
              <div className="space-y-3">
                {skillDemand.slice(0, 6).map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${skill.demand}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">{skill.demand}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Performance */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Placement</h4>
              <div className="space-y-3">
                {departmentStats.map((dept, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{dept.department}</span>
                      <span className="text-sm text-gray-600">{dept.placed}/{dept.total} ({dept.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300" 
                        style={{ 
                          width: `${dept.percentage}%`,
                          backgroundColor: dept.percentage >= 70 ? '#dc2626' : dept.percentage >= 50 ? '#f59e0b' : '#ef4444'
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