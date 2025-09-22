import React from "react";
import { FileText, Users, Shield, AlertTriangle, Scale, Clock } from "lucide-react";
import "./termsOfService.css";

export default function TermsOfService() {
  return (
    <div className="terms-policy-container">
      <div className="terms-policy-content">
        {/* Header Section */}
        <div className="terms-header">
          <div className="terms-icon">
            <FileText size={48} />
          </div>
          <h1 className="terms-title">Terms of Service</h1>
          <p className="terms-subtitle">
            Please read these terms carefully before using our campus recruitment platform.
          </p>
          <div className="last-updated">
            <Clock size={16} />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="terms-sections">
          
          {/* Acceptance of Terms */}
          <section className="terms-section">
            <div className="section-header">
              <Scale className="section-icon" />
              <h2>Acceptance of Terms</h2>
            </div>
            <div className="section-content">
              <p>By accessing and using the CGC University Campus Recruitment Portal, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this platform.</p>
              <ul>
                <li>These terms constitute a binding agreement between you and CGC University</li>
                <li>Your continued use of the platform signifies acceptance of any updates to these terms</li>
                <li>You must be a current student, alumni, or authorized personnel of CGC University to use this platform</li>
              </ul>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="terms-section">
            <div className="section-header">
              <Users className="section-icon" />
              <h2>User Responsibilities</h2>
            </div>
            <div className="section-content">
              <p>As a user of our platform, you agree to:</p>
              <ul>
                <li><strong>Provide Accurate Information:</strong> All information provided must be truthful, current, and complete</li>
                <li><strong>Maintain Account Security:</strong> Keep your login credentials confidential and secure</li>
                <li><strong>Professional Conduct:</strong> Interact respectfully with all users, employers, and university staff</li>
                <li><strong>Compliance:</strong> Follow all university policies and applicable laws</li>
                <li><strong>Content Responsibility:</strong> You are responsible for all content you upload or share</li>
                <li><strong>Notification of Changes:</strong> Update your profile information when circumstances change</li>
              </ul>
            </div>
          </section>

          {/* Platform Usage */}
          <section className="terms-section">
            <div className="section-header">
              <Shield className="section-icon" />
              <h2>Platform Usage Guidelines</h2>
            </div>
            <div className="section-content">
              <p>This platform is intended for legitimate career and educational purposes. You agree not to:</p>
              <ul>
                <li>Use the platform for any illegal or unauthorized purposes</li>
                <li>Submit false, misleading, or fraudulent information</li>
                <li>Engage in spam, harassment, or inappropriate communication</li>
                <li>Attempt to gain unauthorized access to other accounts or systems</li>
                <li>Share your account credentials with others</li>
                <li>Upload malicious content, viruses, or harmful code</li>
                <li>Violate intellectual property rights of others</li>
              </ul>
              <div className="highlight-box">
                <p><strong>Note:</strong> Violation of these guidelines may result in account suspension or termination.</p>
              </div>
            </div>
          </section>

          {/* Privacy and Data */}
          <section className="terms-section">
            <div className="section-header">
              <Shield className="section-icon" />
              <h2>Privacy and Data Protection</h2>
            </div>
            <div className="section-content">
              <p>Your privacy is important to us. Please review our Privacy Policy for detailed information about:</p>
              <ul>
                <li>How we collect, use, and protect your personal information</li>
                <li>Your rights regarding your personal data</li>
                <li>How we share information with employers and university officials</li>
                <li>Our security measures and data retention policies</li>
              </ul>
              <p>By using our platform, you consent to the collection and use of your information as described in our Privacy Policy.</p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="terms-section">
            <div className="section-header">
              <FileText className="section-icon" />
              <h2>Intellectual Property</h2>
            </div>
            <div className="section-content">
              <p>The platform and its content are protected by intellectual property laws:</p>
              <ul>
                <li><strong>Platform Content:</strong> All text, graphics, logos, and software are owned by CGC University</li>
                <li><strong>User Content:</strong> You retain ownership of your uploaded content but grant us license to use it for platform purposes</li>
                <li><strong>Trademarks:</strong> CGC University logos and trademarks may not be used without permission</li>
                <li><strong>Copyright:</strong> Respect copyright laws when uploading or sharing content</li>
              </ul>
            </div>
          </section>

          {/* Service Availability */}
          <section className="terms-section">
            <div className="section-header">
              <AlertTriangle className="section-icon" />
              <h2>Service Availability & Limitations</h2>
            </div>
            <div className="section-content">
              <p>We strive to provide reliable service, but please note:</p>
              <ul>
                <li>The platform may experience downtime for maintenance or technical issues</li>
                <li>We do not guarantee job placement or interview opportunities</li>
                <li>Information provided by employers is their responsibility, not ours</li>
                <li>University reserves the right to modify or discontinue services</li>
                <li>We are not liable for technical issues that may affect your use of the platform</li>
              </ul>
            </div>
          </section>

          {/* Termination */}
          <section className="terms-section">
            <div className="section-header">
              <Users className="section-icon" />
              <h2>Account Termination</h2>
            </div>
            <div className="section-content">
              <p>Account termination may occur under the following circumstances:</p>
              <ul>
                <li><strong>Voluntary:</strong> You may delete your account at any time</li>
                <li><strong>Graduation:</strong> Student accounts may be converted to alumni status</li>
                <li><strong>Policy Violation:</strong> Accounts may be suspended or terminated for violations</li>
                <li><strong>Inactivity:</strong> Dormant accounts may be archived after extended periods</li>
              </ul>
              <p>Upon termination, your access to the platform will cease, though some information may be retained as required by university policies.</p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="terms-section">
            <div className="section-header">
              <Clock className="section-icon" />
              <h2>Changes to Terms</h2>
            </div>
            <div className="section-content">
              <p>We reserve the right to update these terms at any time:</p>
              <ul>
                <li>Users will be notified of significant changes via email or platform notifications</li>
                <li>Continued use of the platform after changes indicates acceptance</li>
                <li>The effective date will be updated to reflect when changes were made</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="terms-section">
            <div className="section-header">
              <Shield className="section-icon" />
              <h2>Contact Us</h2>
            </div>
            <div className="section-content">
              <p>If you have any questions about these Terms of Service, please contact us:</p>
              <div className="contact-info">
                <div className="contact-item">
                  <strong>Email:</strong> <a href="mailto:support@cgcuni.edu">support@cgcuni.edu</a>
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
        <div className="terms-footer">
          <p>
            These Terms of Service are effective as of {new Date().toLocaleDateString()} and may be updated from time to time. 
            Please review them periodically for any changes.
          </p>
        </div>
      </div>
    </div>
  );
}