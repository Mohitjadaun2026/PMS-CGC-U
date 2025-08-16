import { useState, useEffect } from "react";
import {
  Users,
  Target,
  Award,
  Globe,
  CheckCircle,
  Zap,
  BookOpen,
  TrendingUp,
  ArrowRight,
  Shield,
  Calendar,
  FileText,
  Briefcase,
  ChevronDown,
  Star,
  Lightbulb,
  Heart,
  Rocket,
} from "lucide-react";

function About() {
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

  const services = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Personalized Student Profiles",
      description:
        "Comprehensive profile management with career tracking and skill assessment to showcase each student's unique potential.",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Centralized Job Management",
      description:
        "Streamlined job postings and application management system connecting students with top recruiters.",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Automated Scheduling",
      description:
        "Intelligent interview and test scheduling with real-time conflict detection and calendar integration.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Real-time Analytics",
      description:
        "Advanced placement insights and performance metrics to track success rates and optimize outcomes.",
    },
  ];

  const values = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation",
      description:
        "Leveraging cutting-edge technology to transform placement experiences",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Student-Centric",
      description:
        "Every decision is made with student success and career growth in mind",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Excellence",
      description:
        "Maintaining the highest standards in education and placement services",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Future-Ready",
      description:
        "Preparing students for tomorrow's challenges and opportunities",
    },
  ];

  const achievements = [
    {
      number: "95%",
      label: "Placement Success Rate",
      icon: <Target className="w-6 h-6" />,
    },
    {
      number: "500+",
      label: "Industry Partners",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      number: "₹50L",
      label: "Highest Package",
      icon: <Award className="w-6 h-6" />,
    },
    {
      number: "10K+",
      label: "Successful Placements",
      icon: <Users className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
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

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="mb-12 flex justify-center">
            <div className="relative group">
              {/* Logo Container */}
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 rounded-3xl flex items-center justify-center border border-yellow-400/30 group-hover:scale-105 transition-transform duration-300">
                <div className="text-yellow-400 text-4xl font-bold">CGC</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-yellow-400 bg-clip-text text-transparent">
              About
            </span>
            <br />
            <span className="text-yellow-400">DCPD</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Department of Career Planning & Development
          </p>

          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Empowering students with the skills, guidance, and opportunities
            needed for successful careers through our specialized placement
            management platform.
          </p>

          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-8 h-8 text-yellow-400 mx-auto" />
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gray-950"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-700 ${
                  isVisible.achievements
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                id={index === 0 ? "achievements" : ""}
              >
                <div className="mb-4 flex justify-center">
                  <div className="p-4 bg-yellow-400/10 rounded-2xl border border-yellow-400/20">
                    <div className="text-yellow-400">{achievement.icon}</div>
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-400 font-medium">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-10 relative">
        <div className="absolute inset-0 bg-gray-950"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                Nurturing Talent
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              At <strong>DCPD, CGC Jhanjeri</strong>, we are committed to
              nurturing talent, fostering industry partnerships, and ensuring
              every student is prepared for the professional world. Our mission
              is to bridge the gap between academic excellence and industry
              requirements through innovative technology and personalized
              guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative">
        <div className="absolute inset-0 bg-gray-950"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                Comprehensive Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our specialized platform offers end-to-end placement management
              solutions designed specifically for the DCPD department.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative p-8 bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-500 hover:scale-105 transform ${
                  isVisible.services
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                id={index === 0 ? "services" : ""}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="mb-6 p-3 bg-yellow-400/10 rounded-2xl w-fit border border-yellow-400/20 group-hover:bg-yellow-400/20 transition-colors duration-300">
                    <div className="text-yellow-400">{service.icon}</div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed text-sm">
                    {service.description}
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

      {/* Values Section */}
      <section id="values" className="py-32 relative">
        <div className="absolute inset-0 bg-gray-950"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                What Drives Us
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our core values guide every aspect of our work and define our
              commitment to student success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`group text-center transform transition-all duration-700 ${
                  isVisible.values
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                id={index === 0 ? "values" : ""}
              >
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-yellow-400/10 rounded-2xl border border-yellow-400/20 group-hover:bg-yellow-400/20 group-hover:scale-110 transition-all duration-300">
                    <div className="text-yellow-400">{value.icon}</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                  {value.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
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
              Join Our Success
            </span>
            <br />
            <span className="text-yellow-400">Story</span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Ready to embark on your career journey? Let DCPD, CGC Jhanjeri be
            your partner in achieving professional excellence and securing your
            dream placement.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transform transition-all duration-200 shadow-2xl">
              <span className="flex items-center gap-2">
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button className="px-10 py-4 rounded-full border-2 border-yellow-400/50 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
