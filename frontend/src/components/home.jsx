

import cgcBack from "../assets/cgc back2.png";
import "./home.css";
import { Star, Users, TrendingUp, Calendar, FileText, Award, Target, Shield, Zap, Globe, BookOpen, Briefcase } from 'lucide-react';

function Home() {
  const features = [
    {
      icon: <Users className="feature-icon" />,
      title: "Student Profile Management",
      description: "Comprehensive student database with academic records, skills, and placement status tracking."
    },
    {
      icon: <Briefcase className="feature-icon" />,
      title: "Company Registration",
      description: "Streamlined process for companies to register and post job opportunities."
    },
    {
      icon: <Calendar className="feature-icon" />,
      title: "Interview Scheduling",
      description: "Automated scheduling system for interviews, tests, and placement drives."
    },
    {
      icon: <FileText className="feature-icon" />,
      title: "Resume Builder",
      description: "Built-in resume builder with templates and optimization suggestions."
    },
    
    {
      icon: <Target className="feature-icon" />,
      title: "Job Matching",
      description: "AI-powered job matching based on student profiles and company requirements."
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Secure Data Management",
      description: "Enterprise-grade security for all student and company information."
    },
    {
      icon: <Zap className="feature-icon" />,
      title: "Instant Notifications",
      description: "Real-time notifications for new opportunities, updates, and announcements."
    },
  {
  icon: <BookOpen className="feature-icon" />,
  title: "Training Resources",
  description: "Placement prep materials, mock interviews, skill assessments, and actual questions asked to seniors in previous interviews."
}
 
  ];

  const alumni = [
    { name: "Arjun Sharma", company: "Google", package: "₹45 LPA", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
   { 
  name: "Priya Patel", 
  company: "Microsoft", 
  package: "₹42 LPA", 
  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces" 
}
,
    { name: "Rohit Kumar", company: "Amazon", package: "₹38 LPA", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
    { name: "Sneha Singh", company: "Apple", package: "₹50 LPA", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
    { name: "Vikash Gupta", company: "Meta", package: "₹46 LPA", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
    { name: "Anjali Rani", company: "Netflix", package: "₹40 LPA", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face" },
    { name: "Manish Verma", company: "Adobe", package: "₹36 LPA", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face" },
    { name: "Kavya Reddy", company: "Salesforce", package: "₹35 LPA", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face" },
    { name: "Deepak Yadav", company: "Oracle", package: "₹32 LPA", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face" },
    { name: "Ritu Sharma", company: "Uber", package: "₹34 LPA", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" }
  ];



 const companies = [
  { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },

  { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg" },
  { name: "Cisco", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" },
  { name: "HP", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" },
  { name: "Dell", logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg" },
  { name: "Accenture", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" },
  { name: "Deloitte", logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/Deloitte_Logo.png" },

  { name: "Wipro", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" },
{ name: "Uber", logo: "https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" },

];

  return (
    <main className="home-main">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background" style={{ backgroundImage: `url(${cgcBack})` }}>
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            CGC UNIVERSITY 
            <span className="hero-subtitle">
              Placement Management System
            </span>
          </h1>
          <p className="hero-description">
            Empowering Dreams, Creating Futures - Your Gateway to Success
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">
              Explore Opportunities
            </button>
            <button className="btn btn-secondary">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Comprehensive Features
            </h2>
            <p className="section-description">
              Our advanced placement management system offers everything you need for successful campus placements
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">
                  {feature.title}
                </h3>
                <p className="feature-description">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Success Stories */}
      <section className="alumni-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Alumni Success Stories
            </h2>
            <p className="section-description">
              Our graduates are making their mark at the world's leading companies
            </p>
          </div>
          
          <div className="alumni-grid">
            {alumni.map((alum, index) => (
              <div key={index} className="alumni-card">
                <img 
                  src={alum.image} 
                  alt={alum.name}
                  className="alumni-image"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://via.placeholder.com/150/121212/FFFFFF?text=Alumni";
                  }}
                />
                <h3 className="alumni-name">
                  {alum.name}
                </h3>
                <p className="alumni-company">
                  {alum.company}
                </p>
                <p className="alumni-package">
                  {alum.package}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="partners-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Our Industry Partners
            </h2>
            <p className="section-description">
              Collaborating with industry leaders to provide the best opportunities for our students
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
          <h2 className="cta-title">
            Ready to Launch Your Career?
          </h2>
          <p className="cta-description">
            Join thousands of successful alumni who started their journey at CGC Jhanjeri
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary">
              Register Now
            </button>
            <button className="btn btn-outline">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
