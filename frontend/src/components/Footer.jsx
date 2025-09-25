import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./footer.css";
import About from "./About";
import Contact from "./Contact";
import PrivacyPolicy from "./PrivacyPolicy";
import CookiePolicy from "./CookiePolicy";
import Home from "./home";



function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/newsletter/subscribe",
        { email }
      );

      if (res.status === 200) {
        toast.success(res.data.message || "Subscribed successfully!");
        setEmail("");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="pms-footer">
      {/* Newsletter Section */}
      <div className="footer-newsletter-full">
        <div className="footer-container">
          <div className="footer-newsletter-content">
            <div className="footer-newsletter-text">
              <h3>Stay Updated</h3>
              <p>
                Get the latest job opportunities and news directly to your inbox
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="footer-newsletter-form">
              <div className="footer-newsletter-input-group">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="footer-newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="submit"
                  className={`footer-newsletter-button ${
                    loading ? "loading" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">
              Campus<span>Recruitment</span>
            </h3>
            <p className="footer-tagline">Bridging talent with opportunity</p>
            <div className="footer-social">
              <a href="https://www.linkedin.com/in/mohit-jadaun/" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="https://x.com/" aria-label="X">
                <FaXTwitter />
              </a>
              <a href="https://github.com/Mohitjadaun2026" aria-label="GitHub">
                <FaGithub />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=jadaunmohit0@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          <div className="footer-sections">
            <div className="footer-section">
              <h4 className="footer-heading">Navigation</h4>
              <ul className="footer-nav">
                <li><a href="/">Home</a></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/jobs">Job Listings</Link></li>
                <li><Link to="/profile">My Profile</Link></li>
                <li><Link to="/admin-job-posting">Post Jobs</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-heading">Legal</h4>
              <ul className="footer-nav">
                <li><a href="/privacy">Privacy Policy</a></li> {/* ✅ Updated */}
                <li><a href="/terms">Terms of Service</a></li> {/* placeholder */}
                <li><a href="/cookies">Cookie Policy</a></li> {/* placeholder */}
                <li><a href="/gdpr">GDPR Compliance</a></li> {/* placeholder */}
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-heading">Contact</h4>
              <ul className="footer-contact">
                <li>
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>CGC University, Mohali</span>
                </li>
                <li>
                  <FaEnvelope className="contact-icon" />
                  <span>contact@placementsystem.com</span>
                </li>
                <li>
                  <FaPhone className="contact-icon phone" />
                  <span>(555) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} Campus Recruitment Portal. All
            rights reserved.
          </div>
          <div className="footer-cta">
            <a href="/signin" className="footer-cta-button">Sign In</a>
            <a href="/contact" className="contact-outline">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
