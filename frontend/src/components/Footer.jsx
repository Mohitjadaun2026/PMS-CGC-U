import React from "react";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import "./footer.css";

function Footer() {
  return (
    <footer className="pms-footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">
              Campus<span>Recruitment</span>
            </h3>
            <p className="footer-tagline">Bridging talent with opportunity</p>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="#" aria-label="Email">
                <FaEnvelope />
              </a>
            </div>
          </div>

          <div className="footer-sections">
            <div className="footer-section">
              <h4 className="footer-heading">Navigation</h4>
              <ul className="footer-nav">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/jobs">Job Listings</a>
                </li>
                <li>
                  <a href="/profile">My Profile</a>
                </li>
                <li>
                  <a href="/admin-job-posting">Post Jobs</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-heading">Legal</h4>
              <ul className="footer-nav">
                <li>
                  <a href="#privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="#terms">Terms of Service</a>
                </li>
                <li>
                  <a href="#cookies">Cookie Policy</a>
                </li>
                <li>
                  <a href="#gdpr">GDPR Compliance</a>
                </li>
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

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} Campus Recruitment Portal. All
            rights reserved.
          </div>
          <div className="footer-cta">
            <a href="/signin" className="footer-cta-button">
              Sign In
            </a>
            <a href="/contact" className="outline">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
