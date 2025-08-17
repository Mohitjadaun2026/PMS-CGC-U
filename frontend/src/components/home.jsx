import React, { useState, useEffect } from "react";
import {
  Users,
  Briefcase,
  Calendar,
  FileText,
  Target,
  Shield,
  Zap,
  BookOpen,
  Star,
  Award,
  TrendingUp,
  ArrowRight,
  Play,
  ChevronDown,
  Globe,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);
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

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Smart Student Profiles",
      description:
        "AI-powered student database with comprehensive academic records, skills tracking, and placement analytics.",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Company Portal",
      description:
        "Streamlined company registration with advanced job posting tools and candidate filtering systems.",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Intelligent Scheduling",
      description:
        "Automated interview scheduling with conflict detection and real-time calendar synchronization.",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "AI Resume Builder",
      description:
        "Advanced resume builder with ATS optimization and industry-specific templates.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Job Matching",
      description:
        "Machine learning algorithms that match students with perfect job opportunities.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description:
        "Bank-grade security with encrypted data storage and compliance management.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Updates",
      description:
        "Instant notifications with push alerts and personalized dashboard insights.",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Placement Training Hub",
      description:
        "Comprehensive training resources with mock interviews, coding challenges, and industry insights.",
    },
  ];

  const alumni = [
    {
      name: "Arjun Sharma",
      company: "Google",
      package: "₹45 LPA",
      role: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Priya Patel",
      company: "Microsoft",
      package: "₹42 LPA",
      role: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces",
    },
    {
      name: "Rohit Kumar",
      company: "Amazon",
      package: "₹38 LPA",
      role: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Sneha Singh",
      company: "Apple",
      package: "₹50 LPA",
      role: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Vikash Gupta",
      company: "Meta",
      package: "₹46 LPA",
      role: "Backend Developer",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
  ];

  const companies = [
    {
      name: "Google",
      logo: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Meta",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    },
  ];

  const stats = [
    {
      number: "95%",
      label: "Placement Rate",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      number: "500+",
      label: "Partner Companies",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      number: "₹50L",
      label: "Highest Package",
      icon: <Award className="w-6 h-6" />,
    },
    {
      number: "10K+",
      label: "Alumni Network",
      icon: <Users className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
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

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-yellow-400 md:text-7xl bg-clip-text text-transparent">
              Future-Ready
            </span>
            <br />
            <span className="text-yellow-400 md:text-7xl">Placements</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing campus placements with AI-powered matching,
            comprehensive training, and industry partnerships that launch
            successful careers.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/signin"
              className="group bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transform transition-all duration-200 shadow-2xl"
            >
              <span className="flex items-center gap-2">
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-8 h-8 text-yellow-400 mx-auto" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gray-950"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-700 ${
                  isVisible.stats
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                id={index === 0 ? "stats" : ""}
              >
                <div className="mb-4 flex justify-center">
                  <div className="p-4 bg-yellow-400/10 rounded-2xl border border-yellow-400/20">
                    <div className="text-yellow-400">{stat.icon}</div>
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="absolute inset-0 bg-gray-950"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-sm font-semibold mb-8">
              <Zap className="w-4 h-4" />
              Advanced Features
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                Next-Gen Platform
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powered by cutting-edge technology to deliver unmatched placement
              experiences for students and recruiters alike.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-500 hover:scale-105 transform ${
                  isVisible.features
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                id={index === 0 ? "features" : ""}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="mb-6 p-3 bg-yellow-400/10 rounded-2xl w-fit border border-yellow-400/20 group-hover:bg-yellow-400/20 transition-colors duration-300">
                    <div className="text-yellow-400">{feature.icon}</div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed text-sm">
                    {feature.description}
                  </p>

                  <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-yellow-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Success Section */}
      <section id="alumni" className="py-32 relative">
        <div className="absolute inset-0 bg-gray-950"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-sm font-semibold mb-8">
              <Award className="w-4 h-4" />
              Success Stories
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                Alumni Excellence
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our graduates are shaping the future at world's leading tech
              companies, earning exceptional packages and recognition.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {alumni.map((alum, index) => (
              <div
                key={index}
                className={`group relative text-center transform transition-all duration-700 hover:scale-105 ${
                  isVisible.alumni
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                id={index === 0 ? "alumni" : ""}
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-yellow-400/20 group-hover:border-yellow-400 transition-colors duration-300">
                    <img
                      src={alum.image}
                      alt={alum.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/150/121212/FFFFFF?text=Alumni";
                      }}
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-black" />
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                  {alum.name}
                </h3>

                <p className="text-yellow-400 font-semibold mb-1">
                  {alum.company}
                </p>

                <p className="text-sm text-gray-400 mb-3">{alum.role}</p>

                <div className="text-2xl font-bold text-yellow-400">
                  {alum.package}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section
        id="partners"
        className="py-32 bg-gray-950"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-sm font-semibold mb-8">
              <Globe className="w-4 h-4" />
              Industry Partners
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                Trusted by Leaders
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Collaborating with industry giants to provide unparalleled
              opportunities and career growth for our students.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {companies.map((company, index) => (
              <div
                key={index}
                className={`group relative p-8 bg-gray-900/30 rounded-2xl border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-500 flex items-center justify-center hover:scale-105 transform ${
                  isVisible.partners
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                id={index === 0 ? "partners" : ""}
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-h-12 max-w-full object-contain filter brightness-75 group-hover:brightness-100 transition-all duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/150x60/121212/FFFFFF?text=${company.name}`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative border-t border-gray-500">
        <div className="absolute inset-0 bg-gray-950"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
              Ready to Transform
            </span>
            <br />
            <span className="text-yellow-400">Your Future?</span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the next generation of successful professionals. Start your
            journey with India's most advanced placement platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transform transition-all duration-200 shadow-2xl">
              <span className="flex items-center gap-2">
                Get Started Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
