import { useNavigate } from "react-router-dom";
import cgcBack from "../assets/cgc back2.png";
import "./home.css";
import {
  Star,
  Users,
  TrendingUp,
  Calendar,
  FileText,
  Award,
  Target,
  Shield,
  Zap,
  Globe,
  BookOpen,
  Briefcase,
} from "lucide-react";

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="feature-icon" />,
      title: "Student Profile Management",
      description:
        "Comprehensive student database with academic records, skills, and placement status tracking.",
    },
    {
      icon: <Briefcase className="feature-icon" />,
      title: "Company Registration",
      description:
        "Streamlined process for companies to register and post job opportunities.",
    },
    {
      icon: <Calendar className="feature-icon" />,
      title: "Interview Scheduling",
      description:
        "Automated scheduling system for interviews, tests, and placement drives.",
    },
    {
      icon: <FileText className="feature-icon" />,
      title: "Resume Builder",
      description:
        "Built-in resume builder with templates and optimization suggestions.",
    },

    {
      icon: <Target className="feature-icon" />,
      title: "Job Matching",
      description:
        "AI-powered job matching based on student profiles and company requirements.",
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Secure Data Management",
      description:
        "Enterprise-grade security for all student and company information.",
    },
    {
      icon: <Zap className="feature-icon" />,
      title: "Instant Notifications",
      description:
        "Real-time notifications for new opportunities, updates, and announcements.",
    },
    {
      icon: <BookOpen className="feature-icon" />,
      title: "Training Resources",
      description:
        "Placement prep materials, mock interviews, skill assessments, and actual questions asked to seniors in previous interviews.",
    },
  ];

  const alumni = [
    {
      id: 1,
      name: "Arjun Sharma",
      company: "Google",
      package: "₹45 LPA",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      graduationYear: 2022,
      department: "CSE",
      role: "Software Engineer",
      achievements: "Built large-scale distributed systems at Google",
      linkedin: "https://linkedin.com/in/arjun",
    },
    {
      id: 2,
      name: "Priya Patel",
      company: "Microsoft",
      package: "₹42 LPA",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces",
      graduationYear: 2021,
      department: "IT",
      role: "Product Manager",
      achievements: "Led multiple product launches in Azure division",
      linkedin: "https://linkedin.com/in/priya",
    },
    {
      id: 3,
      name: "Ravi Kumar",
      company: "Amazon",
      package: "₹40 LPA",
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face",
      graduationYear: 2020,
      department: "ECE",
      role: "Solutions Architect",
      achievements: "Optimized AWS cloud solutions for Fortune 500 clients",
      linkedin: "https://linkedin.com/in/ravi",
    },
    {
      id: 4,
      name: "Neha Gupta",
      company: "Meta",
      package: "₹55 LPA",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face",
      graduationYear: 2019,
      department: "CSE",
      role: "AI Research Scientist",
      achievements: "Published research papers in deep learning and NLP",
      linkedin: "https://linkedin.com/in/neha",
    },
    {
      id: 5,
      name: "Aditya Verma",
      company: "Tesla",
      package: "₹48 LPA",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      graduationYear: 2021,
      department: "Mechanical",
      role: "Autonomous Systems Engineer",
      achievements: "Worked on autopilot features for Tesla cars",
      linkedin: "https://linkedin.com/in/aditya",
    },
    {
      id: 6,
      name: "Sanya Mehra",
      company: "Apple",
      package: "₹50 LPA",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      graduationYear: 2018,
      department: "IT",
      role: "UI/UX Designer",
      achievements: "Designed key features for iOS applications",
      linkedin: "https://linkedin.com/in/sanya",
    },
    {
      id: 7,
      name: "Vikram Singh",
      company: "Netflix",
      package: "₹46 LPA",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      graduationYear: 2022,
      department: "CSE",
      role: "Backend Engineer",
      achievements: "Developed scalable streaming infrastructure",
      linkedin: "https://linkedin.com/in/vikram",
    },
    {
      id: 8,
      name: "Anjali Nair",
      company: "Adobe",
      package: "₹38 LPA",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face",
      graduationYear: 2020,
      department: "CSE",
      role: "Software Engineer II",
      achievements: "Improved performance of Adobe Creative Cloud apps",
      linkedin: "https://linkedin.com/in/anjali",
    },
    {
      id: 9,
      name: "Karan Malhotra",
      company: "Flipkart",
      package: "₹35 LPA",
      image:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face",
      graduationYear: 2021,
      department: "IT",
      role: "Data Scientist",
      achievements: "Built recommendation systems for Flipkart shoppers",
      linkedin: "https://linkedin.com/in/karan",
    },
    {
      id: 10,
      name: "Meera Iyer",
      company: "LinkedIn",
      package: "₹44 LPA",
      image:
        "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=150&h=150&fit=crop&crop=face",
      graduationYear: 2019,
      department: "CSE",
      role: "Full Stack Developer",
      achievements: "Contributed to LinkedIn Learning platform",
      linkedin: "https://linkedin.com/in/meera",
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

    {
      name: "Oracle",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    },
    {
      name: "IBM",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    },
    {
      name: "Intel",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg",
    },
    {
      name: "Cisco",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg",
    },
    {
      name: "HP",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg",
    },
    {
      name: "Dell",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg",
    },
    {
      name: "Accenture",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
    },
    {
      name: "Deloitte",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/Deloitte_Logo.png",
    },
    {
      name: "Wipro",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
    },
    {
      name: "Uber",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg",
    },
  ];

  return (
    <main className="home-main">
      {/* Hero Section */}
      <section className="hero-section">
        <div
          className="hero-background"
          style={{ backgroundImage: `url(${cgcBack})` }}
        >
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            CGC UNIVERSITY
            <span className="hero-subtitle">Campus Recruitment Portal</span>
          </h1>
          <p className="hero-description">
            Empowering Dreams, Creating Futures - Your Gateway to Success
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Explore Opportunities</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Comprehensive Features</h2>
            <p className="section-description">
              Our advanced Campus Recruitment Portal offers everything you need
              for successful campus placements
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Success Stories */}
      <section className="alumni-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Alumni Success Stories</h2>
            <p className="section-description">
              Our graduates are making their mark at the world's leading
              companies
            </p>
          </div>

          <div className="alumni-grid">
            {alumni.map((alum) => (
              <div
                key={alum.id}
                className="alumni-card cursor-pointer"
                onClick={() => navigate(`/alumni/${alum.id}`)} // ⬅️ navigate to details
              >
                <img
                  src={alum.image}
                  alt={alum.name}
                  className="alumni-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/150/121212/FFFFFF?text=Alumni";
                  }}
                />
                <h3 className="alumni-name">{alum.name}</h3>
                <p className="alumni-company">{alum.company}</p>
                <p className="alumni-package">{alum.package}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="partners-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Industry Partners</h2>
            <p className="section-description">
              Collaborating with industry leaders to provide the best
              opportunities for our students
            </p>
          </div>

          <div className="partners-grid">
            {companies.map((company, index) => (
              <div key={index} className="partner-card">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="partner-logo"
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

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Placement Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Companies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">₹45L</div>
              <div className="stat-label">Highest Package</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Students Placed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Launch Your Career?</h2>
          <p className="cta-description">
            Join thousands of successful alumni who started their journey at CGC
            Jhanjeri
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Register Now</button>
            <button className="btn btn-outline">Contact Us</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
