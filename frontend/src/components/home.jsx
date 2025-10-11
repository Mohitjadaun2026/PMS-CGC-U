import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import cgcBack from "../assets/cgc back2.png";
import "./home.css";
import {
  Users,
  Briefcase,
  Calendar,
  FileText,
  Target,
  Shield,
  Zap,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

// Animation variants (Framer Motion existing setup)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8,
    },
  },
  hover: {
    y: -12,
    scale: 1.02,
    boxShadow: "0 25px 50px rgba(128, 0, 32, 0.3)",
    borderColor: "rgba(128, 0, 32, 0.5)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  tap: {
    scale: 0.98,
    y: -4,
  },
};

const iconVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    rotate: -180,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      delay: 0.5,
    },
  },
  hover: {
    scale: 1.2,
    rotate: 360,
    color: "var(--primary-gold)",
    transition: {
      type: "spring",
      stiffness: 400,
      duration: 0.6,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "easeOut",
      duration: 0.6,
      delay: 0.3,
    },
  },
};

// Animation variants for Partners Section
const partnersContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const partnerCardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
      duration: 0.6,
    },
  },
  hover: {
    y: -8,
    scale: 1.05,
    boxShadow: "0 20px 40px rgba(128, 0, 32, 0.25)",
    borderColor: "rgba(128, 0, 32, 0.4)",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
  tap: {
    scale: 0.95,
    y: -2,
  },
};

const logoVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      delay: 0.2,
    },
  },
  hover: {
    scale: 1.1,
    filter: "brightness(1.2) drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))",
    transition: {
      type: "spring",
      stiffness: 400,
    },
  },
};

// Feature Card Component
const FeatureCard = ({ feature, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px",
  });

  return (
    <motion.div
      ref={ref}
      className="feature-card"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
      whileTap="tap"
      custom={index}
    >
      <motion.div className="feature-icon-wrapper" variants={iconVariants}>
        {feature.icon}
      </motion.div>
      <motion.h3 className="feature-title" variants={titleVariants}>
        {feature.title}
      </motion.h3>
      <motion.p className="feature-description" variants={descriptionVariants}>
        {feature.description}
      </motion.p>

      {/* Enhanced gradient overlay */}
      <div className="feature-gradient"></div>
    </motion.div>
  );
};

// Partner Card Component
const PartnerCard = ({ company, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-30px 0px",
  });

  return (
    <motion.div
      ref={ref}
      className="partner-card"
      variants={partnerCardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
      whileTap="tap"
      custom={index}
    >
      <motion.img
        src={
          company.name === "Deloitte" ? "/deloitte-seeklogo.svg" : company.logo
        }
        alt={company.name}
        className="partner-logo"
        variants={logoVariants}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/150x60/121212/FFFFFF?text=${company.name}`;
        }}
      />
      {/* Enhanced gradient overlay */}
      <div className="partner-gradient"></div>
    </motion.div>
  );
};

function Home() {
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
      name: "Arjun Sharma",
      company: "Google",
      package: "₹45 LPA",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Priya Patel",
      company: "Microsoft",
      package: "₹42 LPA",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces",
    },
    {
      name: "Rohit Kumar",
      company: "Amazon",
      package: "₹38 LPA",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Sneha Singh",
      company: "Apple",
      package: "₹50 LPA",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Vikash Gupta",
      company: "Meta",
      package: "₹46 LPA",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Anjali Rani",
      company: "Netflix",
      package: "₹40 LPA",
      image:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Manish Verma",
      company: "Adobe",
      package: "₹36 LPA",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Kavya Reddy",
      company: "Salesforce",
      package: "₹35 LPA",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Deepak Yadav",
      company: "Oracle",
      package: "₹32 LPA",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Ritu Sharma",
      company: "Uber",
      package: "₹34 LPA",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
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

  // Features Section reference
  const [featuresSectionRef, featuresSectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-100px 0px",
  });

  // Partners Section reference
  const [partnersSectionRef, partnersSectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-100px 0px",
  });

  const sectionTitleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const partnersTitleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  return (
    <main className="home-main ">
      {/* Hero Section */}
      <section className="hero-section">
        <div
          className="hero-background"
          style={{ backgroundImage: `url(${cgcBack})` }}
        >
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">CGC UNIVERSITY</h1>
          <p className="hero-description">
            Empowering Dreams, Creating Futures - Your Gateway to Success
          </p>
          <div className="hero-buttons">
            <button className="button-primary">Explore Opportunities</button>
            <Link to="/About" className="button-tertiary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section (Uses Framer Motion - no AOS needed here) */}
      <section
        id="features"
        className="features-section"
        ref={featuresSectionRef}
      >
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            animate={featuresSectionInView ? "visible" : "hidden"}
            variants={sectionTitleVariants}
          >
            <h2 className="section-title">Comprehensive Features</h2>
            <motion.div
              className="section-underline"
              initial={{ width: 0 }}
              animate={
                featuresSectionInView ? { width: "100px" } : { width: 0 }
              }
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          <motion.div
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            animate={featuresSectionInView ? "visible" : "hidden"}
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Alumni Success Stories (Using AOS) */}
      <section className="alumni-section" data-aos="fade-up">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title pt-15">Alumni Success Stories</h2>
          </div>
          <div className="alumni-grid">
            {alumni.map((alum, index) => (
              <div 
                key={index} 
                className="alumni-card"
                // Apply AOS effect to each card with staggered delay
                data-aos="zoom-in" 
                data-aos-delay={index * 100} 
                data-aos-duration="600"
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

      {/* Enhanced Partnership Section (Uses Framer Motion - no AOS needed here) */}
      <section className="partners-section" ref={partnersSectionRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            animate={partnersSectionInView ? "visible" : "hidden"}
            variants={partnersTitleVariants}
          >
            <h2 className="section-title">Our Industry Partners</h2>
            <motion.div
              className="section-underline"
              initial={{ width: 0 }}
              animate={
                partnersSectionInView ? { width: "120px" } : { width: 0 }
              }
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          <motion.div
            className="partners-grid"
            variants={partnersContainerVariants}
            initial="hidden"
            animate={partnersSectionInView ? "visible" : "hidden"}
          >
            {companies.map((company, index) => (
              <PartnerCard key={index} company={company} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section (Using AOS) */}
      <section className="stats-section" data-aos="fade-up">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item" data-aos="zoom-in" data-aos-delay="0">
              <div className="stat-number">95%</div>
              <div className="stat-label">Placement Rate</div>
            </div>
            <div className="stat-item" data-aos="zoom-in" data-aos-delay="100">
              <div className="stat-number">500+</div>
              <div className="stat-label">Companies</div>
            </div>
            <div className="stat-item" data-aos="zoom-in" data-aos-delay="200">
              <div className="stat-number">₹45L</div>
              <div className="stat-label">Highest Package</div>
            </div>
            <div className="stat-item" data-aos="zoom-in" data-aos-delay="300">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Students Placed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section (Using AOS) */}
      <section className="cta-section" data-aos="zoom-in-up" data-aos-duration="800">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Launch Your Career?</h2>
          <p className="cta-description">
            Join thousands of successful alumni who started their journey at CGC
            Jhanjeri
          </p>
          <div className="cta-buttons">
            <a href="/signin" className="button-primary">
              Register Now
            </a>
            <a href="/Contact" className="button-tertiary">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
