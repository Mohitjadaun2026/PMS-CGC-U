import { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  ChevronDown,
  Star,
  Award,
  Send,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

// Executive Director
const executiveDirector = {
  name: "Mr. Susheel Prashar",
  title: "Executive Director",
  photo:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  phone: "+91-98765-00001",
  email: "susheel.prashar@cgc.ac.in",
};

// DCPD Team - 20 members
const dcpdTeam = [
  {
    name: "Er. Ravneet Singh",
    title: "Head, DCPD",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-43210",
    email: "ravneet.singh@cgc.ac.in",
  },
  {
    name: "Ms. Simran Kaur",
    title: "Senior DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop&crop=faces",
    phone: "+91-98765-12345",
    email: "simran.kaur@cgc.ac.in",
  },
  {
    name: "Mr. Aman Sharma",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-67890",
    email: "aman.sharma@cgc.ac.in",
  },
  {
    name: "Ms. Priya Verma",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-24680",
    email: "priya.verma@cgc.ac.in",
  },
  {
    name: "Mr. Rohit Kumar",
    title: "DCPD Coordinator",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-11111",
    email: "rohit.kumar@cgc.ac.in",
  },
  {
    name: "Ms. Anjali Rani",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-22222",
    email: "anjali.rani@cgc.ac.in",
  },
  {
    name: "Mr. Manish Verma",
    title: "DCPD Assistant",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-33333",
    email: "manish.verma@cgc.ac.in",
  },
  {
    name: "Ms. Kavya Reddy",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-44444",
    email: "kavya.reddy@cgc.ac.in",
  },
  {
    name: "Mr. Deepak Yadav",
    title: "DCPD Coordinator",
    photo:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-55555",
    email: "deepak.yadav@cgc.ac.in",
  },
  {
    name: "Ms. Ritu Sharma",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-66666",
    email: "ritu.sharma@cgc.ac.in",
  },
  {
    name: "Mr. Vikash Gupta",
    title: "DCPD Assistant",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-77777",
    email: "vikash.gupta@cgc.ac.in",
  },
  {
    name: "Ms. Sneha Singh",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-88888",
    email: "sneha.singh@cgc.ac.in",
  },
  {
    name: "Mr. Arjun Malhotra",
    title: "DCPD Coordinator",
    photo:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=200&h=200&fit=crop&crop=faces",
    phone: "+91-98765-99999",
    email: "arjun.malhotra@cgc.ac.in",
  },
  {
    name: "Ms. Pooja Patel",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-10101",
    email: "pooja.patel@cgc.ac.in",
  },
  {
    name: "Mr. Karan Joshi",
    title: "DCPD Assistant",
    photo:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-20202",
    email: "karan.joshi@cgc.ac.in",
  },
  {
    name: "Ms. Nisha Agarwal",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-30303",
    email: "nisha.agarwal@cgc.ac.in",
  },
  {
    name: "Mr. Suresh Bansal",
    title: "DCPD Coordinator",
    photo:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-40404",
    email: "suresh.bansal@cgc.ac.in",
  },
  {
    name: "Ms. Meera Chopra",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-50505",
    email: "meera.chopra@cgc.ac.in",
  },
  {
    name: "Mr. Rahul Mittal",
    title: "DCPD Assistant",
    photo:
      "https://images.unsplash.com/photo-1615813967515-e1838c1c5116?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-60606",
    email: "rahul.mittal@cgc.ac.in",
  },
  {
    name: "Ms. Sunita Devi",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-70707",
    email: "sunita.devi@cgc.ac.in",
  },
];

function Contact() {
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

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      info: "Chandigarh Group of Colleges, Jhanjeri, Mohali, Punjab, India",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      info: "+91-12345-67890",
      link: "tel:+911234567890",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      info: "dcpd@cgc.ac.in",
      link: "mailto:dcpd@cgc.ac.in",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Website",
      info: "www.cgc.ac.in",
      link: "https://www.cgc.ac.in/",
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
          {[...Array(12)].map((_, i) => (
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
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-yellow-400 bg-clip-text text-transparent">
              Get in
            </span>
            <br />
            <span className="text-yellow-400">Touch</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with the Department of Career Planning & Development
          </p>

          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            We are here to help you with all your placement and career queries.
            Reach out to our dedicated team for guidance and support.
          </p>

          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-8 h-8 text-yellow-400 mx-auto" />
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gray-950"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                Contact Information
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`group text-center p-8 bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-500 hover:scale-105 transform ${
                  isVisible.contactInfo
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                id={index === 0 ? "contactInfo" : ""}
              >
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-yellow-400/10 rounded-2xl border border-yellow-400/20 group-hover:bg-yellow-400/20 group-hover:scale-110 transition-all duration-300">
                    <div className="text-yellow-400">{info.icon}</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                  {info.title}
                </h3>

                {info.link ? (
                  <Link
                    to={info.link}
                    target={info.link.startsWith("http") ? "_blank" : ""}
                    rel={
                      info.link.startsWith("http") ? "noopener noreferrer" : ""
                    }
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm leading-relaxed block"
                  >
                    {info.info}
                  </Link>
                ) : (
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {info.info}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-20 relative">
        <div className="absolute inset-0 bg-gray-950"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-sm font-semibold mb-8">
              <Linkward className="w-4 h-4" />
              Leadership
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                Executive Director
              </span>
            </h2>
          </div>

          <div className="flex justify-center">
            <div
              className={`group max-w-md bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-500 hover:scale-105 transform p-8 text-center ${
                isVisible.leadership
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              id="leadership"
            >
              <div className="relative mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400/20 group-hover:border-yellow-400 transition-colors duration-300">
                    <img
                      src={executiveDirector.photo}
                      alt={executiveDirector.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/200/121212/FFFFFF?text=ED";
                      }}
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                {executiveDirector.name}
              </h3>

              <p className="text-yellow-400 font-semibold mb-6">
                {executiveDirector.title}
              </p>

              <div className="space-y-3">
                <Link
                  to={`tel:${executiveDirector.phone}`}
                  className="flex items-center justify-center gap-3 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                >
                  <Phone className="w-4 h-4" />
                  {executiveDirector.phone}
                </Link>
                <Link
                  to={`mailto:${executiveDirector.email}`}
                  className="flex items-center justify-center gap-3 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                >
                  <Mail className="w-4 h-4" />
                  {executiveDirector.email}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DCPD Team Section */}
      <section id="team" className="py-20 relative">
        <div className="absolute inset-0 bg-gray-950"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-sm font-semibold mb-8">
              <Users className="w-4 h-4" />
              Our Team
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                DCPD Team
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Meet our dedicated team of placement professionals committed to
              your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dcpdTeam.map((member, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br from-gray-900/30 to-gray-950/30 rounded-2xl border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-500 hover:scale-105 transform p-6 text-center ${
                  isVisible.team
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
                id={index === 0 ? "team" : ""}
              >
                <div className="relative mb-4 flex justify-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-yellow-400/20 group-hover:border-yellow-400/50 transition-colors duration-300">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/80/121212/FFFFFF?text=Team";
                      }}
                    />
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-1 group-hover:text-yellow-400 transition-colors duration-300">
                  {member.name}
                </h3>

                <p className="text-yellow-400 text-sm font-medium mb-4">
                  {member.title}
                </p>

                <div className="space-y-2 text-xs">
                  <Link
                    to={`tel:${member.phone}`}
                    className="flex items-center justify-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    <Phone className="w-3 h-3" />
                    {member.phone}
                  </Link>
                  <Link
                    to={`mailto:${member.email}`}
                    className="flex items-center justify-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    <Mail className="w-3 h-3" />
                    {member.email}
                  </Link>
                </div>
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
              Ready to Start
            </span>
            <br />
            <span className="text-yellow-400">Your Journey?</span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Connect with our DCPD team today and take the first step towards
            your successful career placement.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transform transition-all duration-200 shadow-2xl">
              <span className="flex items-center gap-2">
                Schedule a Meeting
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button className="px-10 py-4 rounded-full border-2 border-yellow-400/50 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold transition-all duration-200">
              Visit Campus
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
