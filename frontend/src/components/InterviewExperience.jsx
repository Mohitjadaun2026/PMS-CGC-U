import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PencilIcon, FolderOpenIcon, LightBulbIcon } from "@heroicons/react/24/outline";

const InterviewExperience = ({ darkMode = false }) => {
  // TEMPORARY WORKAROUND: Detect dark mode from document/body class
  const [actualDarkMode, setActualDarkMode] = useState(darkMode);

  useEffect(() => {
    // Check if parent has 'dark' class on html or body
    const checkDarkMode = () => {
      const isDark = 
        document.documentElement.classList.contains('dark') ||
        document.body.classList.contains('dark') ||
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        darkMode;
      setActualDarkMode(isDark);
    };

    checkDarkMode();

    // Watch for changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class', 'data-theme'] 
    });
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['class', 'data-theme'] 
    });

    return () => observer.disconnect();
  }, [darkMode]);

  return (
    <div className={`max-w-6xl mx-auto p-8 ${actualDarkMode ? "text-gray-900 bg-gray-900" : "text-gray-900 bg-white"}`}>
      
     

      {/* Hero Section */}
      <div
        className={`grid md:grid-cols-2 gap-8 items-center p-8 rounded-2xl shadow-md mb-12 ${
          actualDarkMode ? "bg-gray-800" : "bg-none"
        }`}
      >
        <div>
          <div className="flex items-center mb-4 space-x-2">
            <LightBulbIcon className='w-8 h-8 text-[var(--maroon-500)]'/>
            <h1 className={`text-3xl font-bold ${actualDarkMode ? "!text-[var(--maroon-500)]" : "text-red-700"}`}>
              Empowering Your Career Journey
            </h1>
          </div>
          <p className={`mb-6 ${actualDarkMode ? "text-gray-200" : "text-gray-600"}`}>
            Welcome to the Campus Recruitment Portal's Interview Experience Hub. Share your insights to help peers and
            explore real-world interview stories from successful students and alumni to prepare smarter for your dream job.
          </p>
          <div className="flex gap-4">
            <Link
              to="/interview-experience/share"
              style={{ textDecoration: "none" }}
              className="px-5 py-3 rounded-lg bg-[var(--maroon-600)] hover:bg-[var(--maroon-800)] !text-white font-medium shadow-md hover:shadow-lg no-underline decoration-none hover:decoration-none"
            >
              Share Your Experience
            </Link>
            <Link
              to="/interview-experience/browse"
              style={{ textDecoration: "none" }}
              className="px-5 py-3 rounded-lg bg-[var(--maroon-600)] hover:bg-[var(--maroon-800)] !text-white font-medium shadow-md hover:shadow-lg no-underline decoration-none hover:decoration-none"
            >
              Browse Experiences
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3048/3048122.png"
            alt="Career Illustration"
            className="w-64"
          />
        </div>
      </div>

      {/* Two Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <Link
          to="/interview-experience/share"
          style={{ textDecoration: "none" }}
          className={`p-8 rounded-xl border transition transform hover:scale-105 hover:shadow-xl no-underline decoration-none hover:decoration-none ${
            actualDarkMode ? "border-gray-600 bg-gray-800" : "border-purple-300 bg-white"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <PencilIcon className='w-8 h-8 text-[var(--maroon-500)]' />
            <h2 className={`text-xl !font-bold ${actualDarkMode ? "text-white" : "text-gray-800"}`}>
              Share Experience
            </h2>
          </div>
          <p className={actualDarkMode ? "text-gray-200" : "text-gray-600"}>
            Fill out a form to share your interview process with others, contributing to a rich knowledge base.
          </p>
        </Link>

        <Link
          to="/interview-experience/browse"
          style={{ textDecoration: "none" }}
          className={`p-8 rounded-xl border transition transform hover:scale-105 hover:shadow-xl no-underline decoration-none hover:decoration-none ${
            actualDarkMode ? "border-gray-600 bg-gray-800" : "border-pink-200 bg-white"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <FolderOpenIcon className="w-8 h-8 text-[var(--maroon-500)]" />
            <h2 className={`text-xl !font-bold ${actualDarkMode ? "text-white" : "text-gray-800"}`}>
              Browse Experiences
            </h2>
          </div>
          <p className={actualDarkMode ? "text-gray-200" : "text-gray-600"}>
            Read real interview stories shared by students and alumni to gain insights and prepare effectively.
          </p>
        </Link>
      </div>

      {/* Info Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h3 className={`text-2xl !font-bold mb-4 ${actualDarkMode ? "text-white" : "text-gray-800"}`}>
          Unlocking Your Potential
        </h3>
        <p className={actualDarkMode ? "text-gray-200" : "text-gray-600"}>
          By sharing your interview experience, you provide invaluable guidance to juniors, helping them navigate complex
          hiring processes. Browsing others' experiences offers critical insights into company expectations, common
          questions, and effective strategies, significantly boosting your chances to secure a dream job and fostering a
          supportive community.
        </p>
      </div>
    </div>
  );
};

export default InterviewExperience;