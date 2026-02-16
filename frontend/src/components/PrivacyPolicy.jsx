import React from "react";
import { Shield, Eye, Lock, UserCheck, FileText, Clock } from "lucide-react";
import "./privacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-content">
        {/* Header Section */}
        <div className="privacy-header">
          <div className="privacy-icon">
            <Shield size={48} />
          </div>
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-subtitle">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <div className="last-updated">
            <Clock size={16} />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="privacy-sections">
          
          {/* Information We Collect */}
          <section className="privacy-section">
            <div className="section-header">
              <Eye className="section-icon" />
              <h2>Information We Collect</h2>
            </div>
            <div className="section-content">
              <p>We collect information to provide better services to our users:</p>
              <ul>
                <li><strong>Personal Information:</strong> Name, email address, student ID, and academic information when you register</li>
                <li><strong>Profile Data:</strong> Resume, skills, academic records, and career preferences</li>
                <li><strong>Usage Information:</strong> How you interact with our platform, including job applications and search history</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies</li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="privacy-section">
            <div className="section-header">
              <UserCheck className="section-icon" />
              <h2>How We Use Your Information</h2>
            </div>
            <div className="section-content">
              <p>We use the collected information for the following purposes:</p>
              <ul>
                <li>To provide and maintain our placement management services</li>
                <li>To match students with relevant job opportunities</li>
                <li>To communicate with you about applications and updates</li>
                <li>To improve our platform and develop new features</li>
                <li>To ensure security and prevent unauthorized access</li>
                <li>To comply with legal obligations and university policies</li>
              </ul>
            </div>
          </section>

          {/* Data Protection */}
          <section className="privacy-section">
            <div className="section-header">
              <Lock className="section-icon" />
              <h2>Data Protection & Security</h2>
            </div>
            <div className="section-content">
              <p>We implement appropriate security measures to protect your personal information:</p>
              <ul>
                <li><strong>Encryption:</strong> All data transmission is secured using SSL/TLS encryption</li>
                <li><strong>Access Control:</strong> Limited access to personal data on a need-to-know basis</li>
                <li><strong>Regular Audits:</strong> We conduct regular security assessments and updates</li>
                <li><strong>Data Backup:</strong> Secure backup systems to prevent data loss</li>
                <li><strong>Incident Response:</strong> Established procedures for handling security incidents</li>
              </ul>
            </div>
          </section>

          {/* Information Sharing */}
          <section className="privacy-section">
            <div className="section-header">
              <FileText className="section-icon" />
              <h2>Information Sharing</h2>
            </div>
            <div className="section-content">
              <p>We may share your information in the following circumstances:</p>
              <ul>
                <li><strong>With Employers:</strong> Relevant profile information for job matching purposes</li>
                <li><strong>University Officials:</strong> Academic and placement data as required by university policies</li>
                <li><strong>Service Providers:</strong> Third-party services that help us operate our platform</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>
              <div className="highlight-box">
                <p><strong>Note:</strong> We never sell your personal information to third parties for marketing purposes.</p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="privacy-section">
            <div className="section-header">
              <UserCheck className="section-icon" />
              <h2>Your Rights</h2>
            </div>
            <div className="section-content">
              <p>You have the following rights regarding your personal information:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                <li><strong>Objection:</strong> Object to certain types of data processing</li>
              </ul>
              <p>To exercise these rights, please contact us at <a href="mailto:privacy@cgcuni.edu">privacy@cgcuni.edu</a></p>
            </div>
          </section>

          {/* Cookies Policy */}
          <section className="privacy-section">
            <div className="section-header">
              <FileText className="section-icon" />
              <h2>Cookies & Tracking</h2>
            </div>
            <div className="section-content">
              <p>We use cookies and similar technologies to enhance your experience:</p>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p>You can control cookie settings through your browser preferences.</p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="privacy-section">
            <div className="section-header">
              <Shield className="section-icon" />
              <h2>Contact Us</h2>
            </div>
            <div className="section-content">
              <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
              <div className="contact-info">
                <div className="contact-item">
                  <strong>Email:</strong> <a href="mailto:privacy@cgcuni.edu">privacy@cgcuni.edu</a>
                </div>
                <div className="contact-item">
                  <strong>Address:</strong> CGC University, Mohali, Punjab, India
                </div>
                <div className="contact-item">
                  <strong>Phone:</strong> +91-XXX-XXX-XXXX
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="privacy-footer">
          <p>
            This privacy policy is effective as of {new Date().toLocaleDateString()} and may be updated from time to time. 
            We will notify you of any significant changes.
          </p>
        </div>
      </div>
    </div>
  );
}
