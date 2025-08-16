import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Clock,
  Building,
  User,
  Award,
  Briefcase,
  Target,
  Globe,
  Filter,
  Search,
  ChevronDown,
  ExternalLink,
  CheckCircle,
  Star,
} from "lucide-react";
import { API_ENDPOINTS } from "../config/api";
import { Link } from "react-router-dom";

// JobCard Component
const JobCard = ({ job, onClick }) => {
  const logoUrl = job.companyLogo
    ? `${API_ENDPOINTS.UPLOADS}${job.companyLogo}`
    : "/default-logo.png";

  const skills = job.skillsRequired
    ? job.skillsRequired.split(",").map((s) => s.trim())
    : [];

  return (
    <div
      className="group relative p-6 bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-2xl border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-500 hover:scale-[1.02] transform cursor-pointer"
      onClick={() => onClick(job)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        {/* Company Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-700/50 group-hover:border-yellow-400/30 transition-colors duration-300">
            <img
              src={logoUrl}
              alt={`${job.companyName} logo`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/48/1f2937/FFFFFF?text=C";
              }}
            />
          </div>
          <div>
            <h3 className="font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
              {job.companyName}
            </h3>
            <p className="text-sm text-gray-400">{job.location}</p>
          </div>
        </div>

        {/* Job Title */}
        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
          {job.position}
        </h4>

        {/* Job Meta Info */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <DollarSign className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold text-yellow-400">
              {job.salaryPackage}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{job.jobType}</span>
          </div>
        </div>

        {/* Eligibility */}
        {job.eligibleCourses && job.eligibleCourses.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-300">
                Eligible for:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(job.eligibleCourses)
                ? job.eligibleCourses
                : [job.eligibleCourses]
              )
                .slice(0, 2)
                .map((course, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-yellow-400/10 text-yellow-400 text-xs rounded-lg border border-yellow-400/20"
                  >
                    {course}
                  </span>
                ))}
              {job.eligibleCourses.length > 2 && (
                <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-lg">
                  +{job.eligibleCourses.length - 2}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-4">
            <div className="text-sm text-gray-400 mb-2">Required Skills</div>
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-lg"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-lg">
                  +{skills.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* View Details Arrow */}
        <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <div className="flex items-center gap-2 text-yellow-400 font-semibold text-sm">
            <span>View Details</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

// JobDetails Component
const JobDetails = ({ job, onBack, onApply }) => {
  if (!job) return null;

  const skills = job.skillsRequired
    ? job.skillsRequired.split(",").map((s) => s.trim())
    : [];
  const benefits = job.benefits
    ? job.benefits.split(",").map((s) => s.trim())
    : [];

  const logoUrl = job.companyLogo
    ? `${API_ENDPOINTS.UPLOADS}${job.companyLogo}`
    : "/default-logo.png";

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-sm border-b border-gray-700/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            className="group flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Jobs</span>
          </button>
        </div>
      </div>

      {/* Job Header */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border border-gray-700/50">
              <img
                src={logoUrl}
                alt={`${job.companyName} logo`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/96/1f2937/FFFFFF?text=C";
                }}
              />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                  {job.position}
                </span>
              </h1>

              <h2 className="text-2xl text-yellow-400 font-semibold mb-6">
                {job.companyName}
              </h2>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <DollarSign className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">{job.salaryPackage}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <span>{job.jobType}</span>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="flex-shrink-0">
              {job.companyWebsite ? (
                <Link
                  to={job.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transform transition-all duration-200 shadow-xl flex items-center gap-2"
                >
                  Apply Now
                  <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
              ) : (
                <button
                  className="group bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transform transition-all duration-200 shadow-xl"
                  onClick={() => onApply && onApply(job)}
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Job Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Eligibility */}
              <div className="p-8 bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-2xl border border-gray-700/50">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-yellow-400" />
                  Eligibility Criteria
                </h3>

                <div className="space-y-6">
                  {job.eligibleCourses && job.eligibleCourses.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-3">
                        Eligible Courses
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(job.eligibleCourses)
                          ? job.eligibleCourses
                          : [job.eligibleCourses]
                        ).map((course, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg border border-yellow-400/20"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {job.eligibleYears && job.eligibleYears.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-3">
                        Eligible Years
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(job.eligibleYears)
                          ? job.eligibleYears
                          : [job.eligibleYears]
                        ).map((year, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg"
                          >
                            {year}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {job.eligibleBranches && job.eligibleBranches.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-3">
                        Eligible Branches
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(job.eligibleBranches)
                          ? job.eligibleBranches
                          : [job.eligibleBranches]
                        ).map((branch, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg"
                          >
                            {branch}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Job Description */}
              <div className="p-8 bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-2xl border border-gray-700/50">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Building className="w-6 h-6 text-yellow-400" />
                  Job Description
                </h3>
                <div className="text-gray-300 leading-relaxed text-lg">
                  {job.jobDescription || "No job description provided."}
                </div>
              </div>

              {/* Requirements */}
              <div className="p-8 bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-2xl border border-gray-700/50">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Target className="w-6 h-6 text-yellow-400" />
                  Requirements
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-300">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    Check eligibility criteria above for course, year, and
                    branch requirements
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    Good academic record and relevant skills as mentioned
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Skills */}
              {skills.length > 0 && (
                <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-2xl border border-gray-700/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-2xl border border-gray-700/50">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Benefits
                </h3>
                <ul className="space-y-2">
                  {benefits.length > 0 ? (
                    benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-300 text-sm"
                      >
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                        {benefit}
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start gap-3 text-gray-300 text-sm">
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                      Benefits information not provided.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Main Jobs Component
const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.JOBS);
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const jobsData = await response.json();
        setJobs(jobsData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleBack = () => {
    setSelectedJob(null);
  };

  const handleApply = (job) => {
    alert(`Applied for ${job.position} at ${job.companyName}`);
  };

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(
    (job) =>
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedJob) {
    return (
      <JobDetails job={selectedJob} onBack={handleBack} onApply={handleApply} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
              Discover Your
            </span>
            <br />
            <span className="text-yellow-400">Dream Career</span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore exciting opportunities from top companies. Find the perfect
            role that matches your skills and ambitions.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, companies, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Available Positions
              </h2>
              <p className="text-gray-400">
                {loading
                  ? "Loading..."
                  : `${filteredJobs.length} job(s) available`}
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-400">Loading opportunities...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <div className="p-8 bg-red-900/20 border border-red-500/20 rounded-2xl max-w-md mx-auto">
                <h3 className="text-xl font-bold text-red-400 mb-2">
                  Error Loading Jobs
                </h3>
                <p className="text-gray-400">{error}</p>
              </div>
            </div>
          )}

          {/* Jobs Grid */}
          {!loading && !error && (
            <div>
              {filteredJobs.length === 0 ? (
                <div className="text-center py-20">
                  <div className="p-8 bg-gray-900/30 border border-gray-700/50 rounded-2xl max-w-md mx-auto">
                    <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-400 mb-2">
                      No Jobs Found
                    </h3>
                    <p className="text-gray-500">
                      {searchTerm
                        ? `No jobs match your search "${searchTerm}"`
                        : "No jobs available at the moment. Check back later for new opportunities."}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {filteredJobs.map((job) => (
                    <JobCard key={job._id} job={job} onClick={handleJobClick} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Jobs;
