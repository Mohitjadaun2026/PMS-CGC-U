import React, { useState, useEffect, useRef } from "react";
import {
  Sun,
  Moon,
  Users,
  Target,
  Award,
  Building,
  Calendar,
  BarChart3,
  ChevronDown,
  Sparkles,
  Rocket,
  TargetIcon,
  Zap,
  ChevronLeft,
  ChevronRight,
  Star,
  GitBranch,
  Code,
} from "lucide-react";
import collegeLogo from "../assets/cgc logo.png";
import "./about.css";
import fallbackContributors from "../assets/fallbackContributors.json";

function About() {
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const statsRef = useRef(null);
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    companies: 0,
    rate: 0,
  });
  const [forceUpdate, setForceUpdate] = useState(0);
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [contributorsPerPage] = useState(16);
  const owner = "Mohitjadaun2026";
  const repo = "PMS-CGC-U";
  const author = {
    login: "Mohitjadaun2026",
    id: 126583966,
    node_id: "U_kgDOB4uEng",
    avatar_url: "https://avatars.githubusercontent.com/u/126583966?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/Mohitjadaun2026",
    html_url: "https://github.com/Mohitjadaun2026",
    followers_url: "https://api.github.com/users/Mohitjadaun2026/followers",
    following_url:
      "https://api.github.com/users/Mohitjadaun2026/following{/other_user}",
    gists_url: "https://api.github.com/users/Mohitjadaun2026/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/Mohitjadaun2026/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/Mohitjadaun2026/subscriptions",
    organizations_url: "https://api.github.com/users/Mohitjadaun2026/orgs",
    repos_url: "https://api.github.com/users/Mohitjadaun2026/repos",
    events_url: "https://api.github.com/users/Mohitjadaun2026/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/Mohitjadaun2026/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false,
    contributions: 26,
    prs: 1,
    linesAdded: 26276,
    name: "Mohitjadaun2026",
    isTopContributor: true,
  };

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        setLoading(true);
        setError(null);

        const contributorsResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`
        );

        if (!contributorsResponse.ok) {
          throw new Error("Failed to fetch contributors");
        }

        const contributorsData = await contributorsResponse.json();

        const contributorsWithDetails = await Promise.all(
          contributorsData.map(async (contributor) => {
            try {
              const prsResponse = await fetch(
                `https://api.github.com/search/issues?q=repo:${owner}/${repo}+type:pr+author:${contributor.login}+is:merged`
              );
              const prsData = await prsResponse.json();

              const statsResponse = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/stats/contributors`
              );
              const statsData = await statsResponse.json();
              const userStats = statsData?.find(
                (s) => s.author.login === contributor.login
              );

              const totalAdditions =
                userStats?.weeks.reduce((sum, week) => sum + week.a, 0) || 0;

              return {
                ...contributor,
                prs: prsData.total_count || 0,
                linesAdded: totalAdditions,
                name: contributor.name || contributor.login,
              };
            } catch (err) {
              console.error(
                `Error fetching details for ${contributor.login}:`,
                err
              );
              return {
                ...contributor,
                prs: 0,
                linesAdded: 0,
                name: contributor.name || contributor.login,
              };
            }
          })
        );


        const maxCommits = Math.max(
          ...contributorsWithDetails.map((c) => c.contributions)
        );
        const maxPRs = Math.max(...contributorsWithDetails.map((c) => c.prs));
        const maxLines = Math.max(
          ...contributorsWithDetails.map((c) => c.linesAdded)
        );

        // Only mark as top if they actually have substantial contributions
        const finalContributors = contributorsWithDetails.map((c) => ({
          ...c,
          isTopContributor:
            (c.contributions === maxCommits && maxCommits > 0) ||
            (c.prs === maxPRs && maxPRs > 0) ||
            (c.linesAdded === maxLines && maxLines > 0),
        }));

        setContributors(finalContributors);
        setLoading(false);
      } catch (err) {
        const processedFallback = fallbackContributors.sort((a, b) => {
          if ((b.prs || 0) !== (a.prs || 0)) return (b.prs || 0) - (a.prs || 0);
          return (b.linesAdded || 0) - (a.linesAdded || 0);
        });

        setContributors(processedFallback);
        console.error("Error fetching contributors:", err);
        setError("Unable to load contributors. Please try again later.");
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateStats();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateStats = () => {
    let students = 0;
    let companies = 0;
    let rate = 0;

    const studentInterval = setInterval(() => {
      students += 25;
      if (students >= 1000) {
        students = 1000;
        clearInterval(studentInterval);
      }
      setAnimatedStats((prev) => ({ ...prev, students }));
    }, 10);

    const companyInterval = setInterval(() => {
      companies += 5;
      if (companies >= 200) {
        companies = 200;
        clearInterval(companyInterval);
      }
      setAnimatedStats((prev) => ({ ...prev, companies }));
    }, 20);

    const rateInterval = setInterval(() => {
      rate += 1;
      if (rate >= 95) {
        rate = 95;
        clearInterval(rateInterval);
      }
      setAnimatedStats((prev) => ({ ...prev, rate }));
    }, 15);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const AuthorCard = ({ author, isDark }) => (
    <a
      href={author.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`max-w-lg group relative p-8 md:p-12 rounded-3xl text-center shadow-2xl transition-all duration-500 hover:shadow-[0_20px_60px_rgba(128,0,32,0.3)] overflow-hidden cursor-pointer flex flex-col items-center justify-center col-span-full mx-auto  border-2 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800/90 to-gray-900 border-[var(--maroon-700)]/50 hover:border-[var(--maroon-500)]"
          : "bg-gradient-to-br from-white via-gray-50/90 to-white border-[var(--maroon-300)]/50 hover:border-[var(--maroon-500)]"
      }`}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon-600)]/5 to-[var(--maroon-800)]/5 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--maroon-600)]/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-[var(--maroon-600)]/10 rounded-full -ml-20 -mb-20 blur-3xl group-hover:blur-2xl transition-all duration-500"></div>

      {/* Premium Badge */}
      <div className="absolute top-6 right-6 z-20">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white shadow-xl animate-pulse">
          <Star className="w-5 h-5 fill-white" />
          <span className="text-xs font-bold tracking-wider">CREATOR</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Avatar - Enhanced */}
        <div className="flex justify-center mb-6 mt-2">
          <div className="relative group/avatar">
            <div className="absolute inset-0 rounded-full blur-lg bg-gradient-to-r from-[var(--maroon-600)] to-[var(--maroon-800)] opacity-0 group-hover/avatar:opacity-75 transition-all duration-500"></div>
            <div
              className={`relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[var(--maroon-500)] shadow-2xl transition-all duration-300 group-hover/avatar:scale-105 ${
                isDark ? "bg-gray-900" : "bg-gray-50"
              }`}
            >
              <img
                src={author.avatar_url}
                alt={author.login}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <h3 className="text-2xl md:text-3xl font-black mb-2 transition-all duration-300 text-[var(--maroon-600)] group-hover:text-[var(--maroon-500)] bg-gradient-to-r from-[var(--maroon-600)] to-[var(--maroon-500)] bg-clip-text">
          {author.login}
        </h3>
        <p
          className={`text-lg font-semibold mb-8 transition-colors duration-300 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Project Founder & Lead Developer
        </p>

        {/* Stats Container - Enhanced */}
        <div
          className={`flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 p-6 rounded-2xl transition-all duration-300 ${
            isDark
              ? "bg-gray-800/50 border border-gray-700/50"
              : "bg-gray-50/50 border border-gray-200/50"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-lg font-bold text-[var(--maroon-600)]">
              <GitBranch className="w-6 h-6" />
              <span className="text-2xl">{author.contributions}</span>
            </div>
            <span
              className={`text-sm font-medium ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Commits
            </span>
          </div>

          <div
            className={`hidden md:block w-px h-12 ${
              isDark ? "bg-gray-700/50" : "bg-gray-300/50"
            }`}
          ></div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-lg font-bold text-[var(--maroon-600)]">
              <Code className="w-6 h-6" />
              <span className="text-2xl">
                {author.linesAdded > 1000
                  ? `${(author.linesAdded / 1000).toFixed(1)}k`
                  : author.linesAdded}
              </span>
            </div>
            <span
              className={`text-sm font-medium ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Lines Added
            </span>
          </div>
        </div>

        {/* CTA text */}
        <p
          className={`mt-6 text-sm font-medium transition-colors duration-300 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Click to visit GitHub profile →
        </p>
      </div>
    </a>
  );

  // Pagination logic
  const indexOfLastContributor = currentPage * contributorsPerPage;
  const indexOfFirstContributor = indexOfLastContributor - contributorsPerPage;
  const currentContributors = contributors.slice(
    indexOfFirstContributor,
    indexOfLastContributor
  );
  const totalPages = Math.ceil(contributors.length / contributorsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: document.getElementById("contributors-section")?.offsetTop - 100,
      behavior: "smooth",
    });
  };

  const features = [
    {
      icon: <Users className="w-7 h-7" />,
      title: "Personalized Student Profiles",
      description:
        "Comprehensive profile management and career tracking for every student",
    },
    {
      icon: <Target className="w-7 h-7" />,
      title: "Centralized Job Management",
      description: "Streamlined job postings and application management system",
    },
    {
      icon: <Calendar className="w-7 h-7" />,
      title: "Automated Scheduling",
      description:
        "Smart interview and test scheduling with automated notifications",
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: "Real-time Analytics",
      description: "Comprehensive placement insights and performance tracking",
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Dedicated Support Team",
      description:
        "Professional DCPD trainers and placement support specialists",
    },
    {
      icon: <Building className="w-7 h-7" />,
      title: "Industry Connections",
      description: "Strong partnerships with leading companies and recruiters",
    },
  ];

  const stats = [
    {
      number: `${animatedStats.students}+`,
      label: "Students Placed",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: `${animatedStats.companies}+`,
      label: "Partner Companies",
      icon: <Building className="w-6 h-6" />,
    },
    {
      number: `${animatedStats.rate}%`,
      label: "Placement Rate",
      icon: <TargetIcon className="w-6 h-6" />,
    },
  ];

  return (
    <div className={`about-bg ${isDark ? "dark" : "light"}`}>
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div
          className={`absolute inset-0 opacity-10 ${
            isDark ? "bg-grid-white" : "bg-grid-gray-900"
          }`}
        ></div>

        {/* Animated Particles */}
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`particle ${
                isDark ? "particle-dark" : "particle-light"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 max-w-7xl">
        {/* Enhanced Animated Header Section */}
        <div
          className={`about-header ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="mb-12 flex justify-center mt-12">
            <div className="relative group">
              {/* Logo Container */}
              <div className="relative w-48 h-48 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500">
                <div
                  className={`relative w-40 h-40 rounded-full overflow-hidden flex items-center justify-center shadow-inner ${
                    isDark ? "bg-gray-900" : "bg-gray-50"
                  }`}
                >
                  <img
                    src={collegeLogo}
                    alt="College Logo"
                    className="about-logo block w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Floating Icon */}
                <div
                  className={`absolute -top-2 -right-2 p-3 rounded-full shadow-2xl transition-all duration-300 group-hover:scale-110 ${
                    isDark
                      ? "bg-gradient-to-r from-[var(--maroon-600)] to-[var(--maroon-800)] text-white"
                      : "bg-gradient-to-r from-[var(--maroon-500)] to-[var(--maroon-700)] text-white"
                  }`}
                >
                  <Rocket className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Title Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 rounded-full border transition-colors duration-500 border-[var(--maroon-700)]">
              <Sparkles className="w-5 h-5 !text-[var(--maroon-500)]" />
              <span className="text-sm font-semibold !text-[var(--maroon-500)]">
                DCPD CAMPUS PORTAL
              </span>
            </div>

            <h1 className="!text-6xl md:!text-8xl mb-6 transition-colors duration-500 bg-gradient-to-r from-[var(--maroon-600)] to-[var(--text-primary)] bg-clip-text !text-transparent">
              About Us
            </h1>

            <p
              className={`text-2xl md:text-3xl font-light mb-8 transition-colors duration-500 ${
                !isDark ? "text-[var(--text-primary)]" : "text-gray-600"
              }`}
            >
              Empowering Future{" "}
              <span
                className={`font-extrabold ${
                  !isDark
                    ? "bg-gradient-to-r from-[var(--maroon-600)] to-[var(--text-primary)]"
                    : "bg-[var(--maroon-600)]"
                } bg-clip-text text-transparent`}
              >
                Leaders
              </span>
            </p>
          </div>
        </div>

        {/* Enhanced Main Content Card */}
        <div
          className={`about-container rounded-3xl shadow-2xl p-8 md:p-16 mb-20 backdrop-blur-xl transition-all duration-500 border ${
            isDark
              ? "bg-gray-900/80 border-gray-700/50 text-gray-200"
              : "bg-white/80 border-gray-200/50 text-gray-800"
          }`}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="about-content relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-[var(--maroon-700)]">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight transition-colors duration-500 !text-[var(--maroon-700)]">
                Department of Career Planning & Development
                <div className="text-2xl md:text-3xl font-semibold mt-2 !text-[var(--maroon-700)]">
                  (DCPD)
                </div>
              </h2>
            </div>

            <p
              className={`text-xl leading-relaxed mb-12 transition-colors duration-500 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <strong className="font-bold text-2xl transition-colors duration-500 text-[var(--maroon-500)]">
                DCPD at CGC Jhanjeri
              </strong>{" "}
              is dedicated to empowering students with the skills, guidance, and
              opportunities needed for successful careers. Our Campus
              Recruitment Portal is a specialized platform designed for the DCPD
              department to streamline campus placements.
            </p>
          </div>

          {/* Enhanced Features Grid with Hover Effects */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`about-feature group relative p-8 rounded-3xl shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden ${
                  isDark
                    ? "bg-gray-800/60 border border-gray-700/50"
                    : "bg-white/60 border border-gray-200/50"
                }`}
                data-aos="zoom-in"
                data-aos-delay={100 * index}
                data-aos-duration="600"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

                {/* Enhanced Icon Container */}
                <div className="relative mb-6 p-4 rounded-2xl w-fit bg-[var(--maroon-800)] text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {feature.icon}
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white to-transparent opacity-20 blur-sm"></div>
                </div>
                <h3 className="relative !text-2xl !font-bold mb-4 transition-colors duration-300 !text-[var(--maroon-600)]">
                  {feature.title}
                </h3>
                <p
                  className={`relative text-lg leading-relaxed transition-colors duration-300 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Enhanced Commitment Section */}
          <div
            className="about-feature relative p-12 rounded-3xl text-center shadow-2xl transition-colors duration-500 overflow-hidden"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="relative">
              <Award className="w-16 h-16 mx-auto mb-6 text-[var(--maroon-600)]" />
              <p
                className={`text-2xl font-medium leading-relaxed transition-colors duration-500 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                At DCPD, CGC Jhanjeri, we are committed to{" "}
                <span className="font-bold transition-colors duration-500 text-[var(--maroon-500)]">
                  nurturing talent
                </span>
                ,{" "}
                <span className="font-bold transition-colors duration-500 text-[var(--maroon-500)]">
                  fostering industry partnerships
                </span>
                , and ensuring every student is{" "}
                <span className="font-bold transition-colors duration-500 text-[var(--maroon-500)]">
                  prepared for the professional world
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Section with Animation */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="about-placed group relative text-center bg-[rgba(255,255,255,0.8)] border border-[rgba(128,0,32,0.1)] p-10 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
              data-aos="flip-up"
              data-aos-delay={150 * index}
              data-aos-duration="800"
            >
              <div className="relative">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-[var(--maroon-700)] text-white">
                    {stat.icon}
                  </div>
                </div>

                <div className="about-placed text-6xl md:text-7xl font-black mb-4 transition-all duration-300 text-[var(--maroon-600)]">
                  {stat.number}
                </div>
                <p
                  className={`about-placed text-xl font-semibold transition-colors duration-300 ${
                    isDark ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ENHANCED CONTRIBUTORS SECTION */}
        <div id="contributors-section" className="mt-24 mb-12">
          {/* Section Header */}
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full border transition-colors duration-500 border-[var(--maroon-700)]">
              <Users className="w-5 h-5 !text-[var(--maroon-500)]" />
              <span className="text-sm font-semibold !text-[var(--maroon-500)]">
                OUR AMAZING TEAM
              </span>
            </div>
            <h2 className="!text-5xl md:!text-7xl mb-4 transition-colors duration-500 bg-gradient-to-r from-[var(--maroon-600)] to-[var(--text-primary)] bg-clip-text !text-transparent font-bold">
              Contributors & Developers
            </h2>
            <p
              className={`text-xl transition-colors duration-500 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Meet the brilliant minds who shaped this project
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center py-24">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--maroon-600)] mb-4"></div>
              <p
                className={`text-lg ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Loading contributors...
              </p>
            </div>
          ) : (
            <>
              {/* Author Section */}
              <div className="mb-20">
                <div className="text-center mb-12">
                  <h3 className="!text-4xl md:!text-5xl font-bold mb-2 bg-gradient-to-r from-[var(--maroon-600)] to-[var(--maroon-500)] bg-clip-text text-transparent">
                    Project Founder
                  </h3>
                  <p
                    className={`text-lg ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    The visionary behind this initiative
                  </p>
                </div>
                <AuthorCard author={author} isDark={isDark} />
              </div>

              {/* Contributors Section */}
              <div className="ml-15 mr-15">
                <div className="text-center mb-12">
                  <h3 className="!text-4xl md:!text-5xl font-bold mb-2 bg-gradient-to-r from-[var(--maroon-600)] to-[var(--maroon-500)] bg-clip-text text-transparent">
                    Our Contributors
                  </h3>
                  <p
                    className={`text-lg ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {contributors.length} amazing people who contributed to this
                    project
                  </p>
                </div>

                {/* Contributors Grid - Professional Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16 px-2">
                  {currentContributors.map((contributor, index) => (
                    <a
                      key={contributor.login}
                      href={contributor.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative h-80 rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-105 overflow-hidden cursor-pointer flex flex-col border-2 ${
                        isDark
                          ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 hover:border-[var(--maroon-500)]"
                          : "bg-gradient-to-br from-white to-gray-50 border-gray-200/50 hover:border-[var(--maroon-400)]"
                      }`}
                      data-aos="zoom-in"
                      data-aos-delay={30 * (index % 12)}
                      data-aos-duration="500"
                    >
                      {/* Animated gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon-600)]/0 via-transparent to-[var(--maroon-800)]/0 group-hover:from-[var(--maroon-600)]/10 group-hover:to-[var(--maroon-800)]/10 transition-all duration-500"></div>

                      {/* Top badge for top contributors */}
                      {contributor.isTopContributor && (
                        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg flex items-center gap-1">
                          <Star className="w-4 h-4 fill-white" />
                          <span className="text-xs font-bold">TOP</span>
                        </div>
                      )}

                      {/* Content wrapper */}
                      <div className="relative z-10 flex flex-col items-center justify-between h-full p-6">
                        {/* Avatar section */}
                        <div className="flex flex-col items-center gap-4 flex-grow justify-center">
                          <div className="relative group/avatar">
                            <div className="absolute inset-0 rounded-full blur-lg bg-gradient-to-r from-[var(--maroon-600)] to-[var(--maroon-800)] opacity-0 group-hover/avatar:opacity-50 transition-opacity duration-500"></div>
                            <div
                              className={`relative w-20 h-20 rounded-full overflow-hidden border-3 border-[var(--maroon-500)] shadow-xl transition-all duration-300 group-hover/avatar:scale-110 ${
                                isDark ? "bg-gray-900" : "bg-gray-100"
                              }`}
                            >
                              <img
                                src={contributor.avatar_url}
                                alt={contributor.login}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Username */}
                          <div className="text-center">
                            <p
                              className={`text-base font-bold truncate w-48 transition-colors duration-300 ${
                                isDark ? "text-gray-100" : "text-gray-900"
                              } group-hover:!text-[var(--maroon-500)]`}
                            >
                              {contributor.login}
                            </p>
                          </div>
                        </div>

                        {/* Stats section */}
                        <div
                          className={`w-full border-t-2 pt-4 transition-colors duration-300 ${
                            isDark ? "border-gray-700/50" : "border-gray-200/50"
                          }`}
                        >
                          <div className="flex justify-center items-center gap-4 text-sm font-semibold">
                            <div className="flex flex-col items-center">
                              <div className="flex items-center gap-1 text-[var(--maroon-600)] mb-1">
                                <GitBranch className="w-5 h-5" />
                                <span>{contributor.contributions}</span>
                              </div>
                              <span
                                className={`text-xs ${
                                  isDark ? "text-gray-400" : "text-gray-500"
                                }`}
                              >
                                Commits
                              </span>
                            </div>

                            <div
                              className={`px-2 ${
                                isDark ? "text-gray-600" : "text-gray-300"
                              }`}
                            >
                              |
                            </div>

                            <div className="flex flex-col items-center">
                              <div className="flex items-center gap-1 text-[var(--maroon-600)] mb-1">
                                <Code className="w-5 h-5" />
                                <span>
                                  {contributor.linesAdded > 1000
                                    ? `${(
                                        contributor.linesAdded / 1000
                                      ).toFixed(1)}k`
                                    : contributor.linesAdded}
                                </span>
                              </div>
                              <span
                                className={`text-xs ${
                                  isDark ? "text-gray-400" : "text-gray-500"
                                }`}
                              >
                                Lines
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Pagination Section */}
                {totalPages > 1 && (
                  <div className="flex flex-col items-center gap-8 mt-16">
                    {/* Page Info */}
                    <div
                      className={`text-base font-semibold ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Showing {indexOfFirstContributor + 1} to{" "}
                      {Math.min(indexOfLastContributor, contributors.length)} of{" "}
                      {contributors.length} contributors
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                      {/* Previous Button */}
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                          currentPage === 1
                            ? isDark
                              ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : isDark
                            ? "bg-[var(--maroon-700)] hover:bg-[var(--maroon-600)] text-white shadow-lg hover:scale-105"
                            : "bg-[var(--maroon-600)] hover:bg-[var(--maroon-700)] text-white shadow-lg hover:scale-105"
                        }`}
                      >
                        <ChevronLeft className="w-5 h-5" />
                        <span>Previous</span>
                      </button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-2">
                        {[...Array(totalPages)].map((_, index) => {
                          const pageNumber = index + 1;
                          if (
                            pageNumber === 1 ||
                            pageNumber === totalPages ||
                            (pageNumber >= currentPage - 1 &&
                              pageNumber <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={pageNumber}
                                onClick={() => paginate(pageNumber)}
                                className={`w-11 h-11 rounded-lg font-bold transition-all duration-300 ${
                                  currentPage === pageNumber
                                    ? "bg-gradient-to-r from-[var(--maroon-600)] to-[var(--maroon-700)] text-white shadow-lg scale-110"
                                    : isDark
                                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105"
                                    : "bg-white text-gray-700 hover:bg-gray-100 hover:scale-105 border border-gray-300"
                                }`}
                              >
                                {pageNumber}
                              </button>
                            );
                          } else if (
                            pageNumber === currentPage - 2 ||
                            pageNumber === currentPage + 2
                          ) {
                            return (
                              <span
                                key={pageNumber}
                                className={`px-2 ${
                                  isDark ? "text-gray-600" : "text-gray-400"
                                }`}
                              >
                                ...
                              </span>
                            );
                          }
                          return null;
                        })}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                          currentPage === totalPages
                            ? isDark
                              ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : isDark
                            ? "bg-[var(--maroon-700)] hover:bg-[var(--maroon-600)] text-white shadow-lg hover:scale-105"
                            : "bg-[var(--maroon-600)] hover:bg-[var(--maroon-700)] text-white shadow-lg hover:scale-105"
                        }`}
                      >
                        <span>Next</span>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Quick Jump Dropdown */}
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-sm font-medium ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Jump to:
                      </span>
                      <select
                        value={currentPage}
                        onChange={(e) => paginate(Number(e.target.value))}
                        className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                          isDark
                            ? "bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {[...Array(totalPages)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            Page {index + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default About;
