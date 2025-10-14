import React, { useState, useEffect, useRef } from "react";
import { Sun, Moon, Users, Target, Award, Building, Calendar, BarChart3, ChevronDown, Sparkles, Rocket, TargetIcon, Zap } from "lucide-react";
import collegeLogo from "../assets/cgc logo.png";
import "./about.css";

function About() {
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const statsRef = useRef(null);
  const [animatedStats, setAnimatedStats] = useState({ students: 0, companies: 0, rate: 0 });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
    setIsVisible(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [isDark]);

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
      setAnimatedStats(prev => ({ ...prev, students }));
    }, 10);

    const companyInterval = setInterval(() => {
      companies += 5;
      if (companies >= 200) {
        companies = 200;
        clearInterval(companyInterval);
      }
      setAnimatedStats(prev => ({ ...prev, companies }));
    }, 20);

    const rateInterval = setInterval(() => {
      rate += 1;
      if (rate >= 95) {
        rate = 95;
        clearInterval(rateInterval);
      }
      setAnimatedStats(prev => ({ ...prev, rate }));
    }, 15);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const features = [
    {
      icon: <Users className="w-7 h-7" />,
      title: "Personalized Student Profiles",
      description: "Comprehensive profile management and career tracking for every student",
    },
    {
      icon: <Target className="w-7 h-7" />,
      title: "Centralized Job Management",
      description: "Streamlined job postings and application management system",
    },
    {
      icon: <Calendar className="w-7 h-7" />,
      title: "Automated Scheduling",
      description: "Smart interview and test scheduling with automated notifications",
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: "Real-time Analytics",
      description: "Comprehensive placement insights and performance tracking",
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Dedicated Support Team",
      description: "Professional DCPD trainers and placement support specialists",
    },
    {
      icon: <Building className="w-7 h-7" />,
      title: "Industry Connections",
      description: "Strong partnerships with leading companies and recruiters",
    }
  ];

  const stats = [
    { number: `${animatedStats.students}+`, label: "Students Placed", icon: <Users className="w-6 h-6" /> },
    { number: `${animatedStats.companies}+`, label: "Partner Companies", icon: <Building className="w-6 h-6" /> },
    { number: `${animatedStats.rate}%`, label: "Placement Rate", icon: <TargetIcon className="w-6 h-6" /> }
  ];

  return (
    <div className={`about-bg ${isDark ? 'dark' : 'light'}`}>
      
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className={`absolute inset-0 opacity-10 ${isDark ? 'bg-grid-white' : 'bg-grid-gray-900'}`}></div>
        
        {/* Animated Particles */}
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`particle ${isDark ? 'particle-dark' : 'particle-light'}`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 max-w-7xl">
        {/* Enhanced Animated Header Section */}
        <div className={`about-header ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          // Apply AOS fade-up to the header content once the component state allows (combined with existing visibility logic)
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="mb-12 flex justify-center mt-12">
            <div className="relative group">
              
              {/* Logo Container */}
              <div 
                className="relative w-48 h-48 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500"
              >                
                <div className={`relative w-40 h-40 rounded-full overflow-hidden flex items-center justify-center shadow-inner ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                  <img
                    src={collegeLogo}
                    alt="College Logo"
                    className="about-logo block w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Floating Icon */}
                <div className={`absolute -top-2 -right-2 p-3 rounded-full shadow-2xl transition-all duration-300 group-hover:scale-110 ${isDark ? 'bg-gradient-to-r from-[var(--maroon-600)] to-[var(--maroon-800)] text-white' : 'bg-gradient-to-r from-[var(--maroon-500)] to-[var(--maroon-700)] text-white'}`}>
                  <Rocket className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Title Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 rounded-full border transition-colors duration-500 border-[var(--maroon-700)]">
              <Sparkles className="w-5 h-5 !text-[var(--maroon-500)]" />
              <span className="text-sm font-semibold !text-[var(--maroon-500)]">DCPD CAMPUS PORTAL</span>
            </div>
            
            <h1 
              className="!text-6xl md:!text-8xl mb-6 transition-colors duration-500 bg-gradient-to-r from-[var(--maroon-600)] to-[var(--text-primary)] bg-clip-text !text-transparent"
            >
              About Us
            </h1>
            
            <p className={`text-2xl md:text-3xl font-light mb-8 transition-colors duration-500 ${!isDark ? 'text-[var(--text-primary)]' : 'text-gray-600'}`}>
              Empowering Future <span className={`font-extrabold ${!isDark ? 'bg-gradient-to-r from-[var(--maroon-600)] to-[var(--text-primary)]':'bg-[var(--maroon-600)]'} bg-clip-text text-transparent`}>Leaders</span>
            </p>
          </div>
        </div>

        {/* Enhanced Main Content Card */}
        <div 
          className={`about-container rounded-3xl shadow-2xl p-8 md:p-16 mb-20 backdrop-blur-xl transition-all duration-500 border ${isDark ? 'bg-gray-900/80 border-gray-700/50 text-gray-200' : 'bg-white/80 border-gray-200/50 text-gray-800'}`}
          // Apply AOS fade-up to the main content container
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="about-content relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-[var(--maroon-700)]">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 
                className="text-4xl md:text-5xl font-bold leading-tight transition-colors duration-500 !text-[var(--maroon-700)]"
              >
                Department of Career Planning & Development
                <div className="text-2xl md:text-3xl font-semibold mt-2 !text-[var(--maroon-700)]">
                  (DCPD)
                </div>
              </h2>
            </div>
            
            <p className={`text-xl leading-relaxed mb-12 transition-colors duration-500 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <strong className="font-bold text-2xl transition-colors duration-500 text-[var(--maroon-500)]">
                DCPD at CGC Jhanjeri
              </strong>{" "}
              is dedicated to empowering students with the skills, guidance, and opportunities needed for successful careers. Our Campus Recruitment Portal is a specialized platform designed for the DCPD department to streamline campus placements.
            </p>
          </div>

          {/* Enhanced Features Grid with Hover Effects */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`about-feature group relative p-8 rounded-3xl shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden ${
                  isDark 
                    ? 'bg-gray-800/60 border border-gray-700/50' 
                    : 'bg-white/60 border border-gray-200/50'
                }`}
                // Apply AOS zoom-in effect to each feature card
                data-aos="zoom-in"
                data-aos-delay={100 * index}
                data-aos-duration="600"
              >
                {/* Animated Background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                ></div>
                
                {/* Enhanced Icon Container */}
                <div 
                  className="relative mb-6 p-4 rounded-2xl w-fit bg-[var(--maroon-800)] text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                >
                  {feature.icon}
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white to-transparent opacity-20 blur-sm"></div>
                </div>
                <h3 className="relative !text-2xl !font-bold mb-4 transition-colors duration-300 !text-[var(--maroon-600)]">
                  {feature.title}
                </h3>
                <p className={`relative text-lg leading-relaxed transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
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
            {/* Background Pattern */}            
            <div className="relative">
              <Award className="w-16 h-16 mx-auto mb-6 text-[var(--maroon-600)]" />
              <p className={`text-2xl font-medium leading-relaxed transition-colors duration-500 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                At DCPD, CGC Jhanjeri, we are committed to{" "}
                <span className="font-bold transition-colors duration-500 text-[var(--maroon-500)]">
                  nurturing talent
                </span>,{" "}
                <span className="font-bold transition-colors duration-500 text-[var(--maroon-500)]">
                  fostering industry partnerships
                </span>, and ensuring every student is{" "}
                <span className="font-bold transition-colors duration-500 text-[var(--maroon-500)]">
                  prepared for the professional world
                </span>.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Section with Animation */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="about-placed group relative text-center bg-[rgba(255,255,255,0.8)] border border-[rgba(128,0,32,0.1)] p-10 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
              // Apply AOS flip-up effect to each stat card
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
                
                <div 
                  className="about-placed text-6xl md:text-7xl font-black mb-4 transition-all duration-300 text-[var(--maroon-600)]"
                >
                  {stat.number}
                </div>
                <p className={`about-placed text-xl font-semibold transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
