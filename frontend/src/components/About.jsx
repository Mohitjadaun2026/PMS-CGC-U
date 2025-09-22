import React, { useState, useEffect } from "react";
import { Sun, Moon, Users, Target, Award, Building, Calendar, BarChart3, ChevronDown } from "lucide-react";

function About() {
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Used to trigger entry animations

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
    setIsVisible(true); // Trigger fade-in on mount
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    // Apply theme to document root
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const features = [
    {
      icon: <Users className="w-7 h-7" />,
      title: "Personalized Student Profiles",
      description: "Comprehensive profile management and career tracking for every student",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="w-7 h-7" />,
      title: "Centralized Job Management",
      description: "Streamlined job postings and application management system",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Calendar className="w-7 h-7" />,
      title: "Automated Scheduling",
      description: "Smart interview and test scheduling with automated notifications",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: "Real-time Analytics",
      description: "Comprehensive placement insights and performance tracking",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Dedicated Support Team",
      description: "Professional DCPD trainers and placement support specialists",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Building className="w-7 h-7" />,
      title: "Industry Connections",
      description: "Strong partnerships with leading companies and recruiters",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const stats = [
    { number: "1000+", label: "Students Placed", color: "text-blue-600 dark:text-blue-400" },
    { number: "200+", label: "Partner Companies", color: "text-purple-600 dark:text-purple-400" },
    { number: "95%", label: "Placement Rate", color: "text-green-600 dark:text-green-400" }
  ];

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-900'}`}>
      
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500 dark:bg-indigo-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Theme Toggle Button */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className={`relative p-3 md:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group ${isDark ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
        >
          <div className="relative z-10">
            {isDark ? <Sun className="w-5 h-5 md:w-6 md:h-6" /> : <Moon className="w-5 h-5 md:w-6 md:h-6" />}
          </div>
        </button>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 max-w-7xl">
        {/* Animated Header Section */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="mb-10 flex justify-center">
            <div className="relative group">
              <div 
                className={`w-40 h-40 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 ${isDark ? 'bg-gray-700' : 'bg-white'}`}
              >
                <div className={`w-32 h-32 rounded-full flex items-center justify-center shadow-inner ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
                  <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    CGC
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <h1 
            className={`text-5xl md:text-7xl font-black mb-6 transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            About Us
          </h1>
          
          <p className={`text-xl md:text-2xl font-light mb-8 transition-colors duration-500 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Empowering Future Leaders
          </p>
          
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border transition-colors duration-500 ${isDark ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white/60 backdrop-blur-sm border-gray-200 text-gray-700'}`}>
            <span>Scroll to explore</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>

        {/* Main Content Card */}
        <div 
          className={`rounded-3xl shadow-2xl p-8 md:p-16 mb-16 backdrop-blur-md transition-all duration-500 ${isDark ? 'bg-gray-900 border border-gray-700 text-gray-200' : 'bg-white border border-gray-200 text-gray-800'}`}
        >
          <div className="mb-12">
            <h2 
              className={`text-3xl md:text-4xl font-bold mb-8 leading-tight transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Department of Career Planning & Development (DCPD)
            </h2>
            <p className={`text-lg leading-relaxed mb-8 transition-colors duration-500 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <strong className={`font-bold transition-colors duration-500 ${isDark ? 'text-blue-400' : 'text-indigo-600'}`}>
                DCPD at CGC Jhanjeri
              </strong> is dedicated to empowering students with the skills, guidance, and opportunities needed for successful careers. Our Campus Recruitment Portal is a specialized platform designed for the DCPD department to streamline campus placements.
            </p>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
              >
                <div 
                  className={`mb-6 p-4 rounded-xl w-fit bg-gradient-to-r ${feature.color} text-white shadow-lg transition-all duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`text-base leading-relaxed transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Enhanced Commitment Section */}
          <div 
            className={`p-10 rounded-2xl text-center shadow-lg transition-colors duration-500 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}
          >
            <p className={`text-xl font-medium leading-relaxed transition-colors duration-500 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              At DCPD, CGC Jhanjeri, we are committed to{" "}
              <span className={`font-bold transition-colors duration-500 ${isDark ? 'text-blue-300' : 'text-indigo-600'}`}>
                nurturing talent
              </span>,{" "}
              <span className={`font-bold transition-colors duration-500 ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
                fostering industry partnerships
              </span>, and ensuring every student is{" "}
              <span className={`font-bold transition-colors duration-500 ${isDark ? 'text-green-300' : 'text-green-600'}`}>
                prepared for the professional world
              </span>.
            </p>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-8 rounded-2xl shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl ${isDark ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'}`}
            >
              <div 
                className={`text-5xl md:text-6xl font-black mb-4 transition-all duration-300 ${stat.color}`}
              >
                {stat.number}
              </div>
              <p className={`text-lg font-semibold transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;