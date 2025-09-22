import React from "react";
import { Shield, Users, Lock, FileText, Clock, Eye, CheckCircle, AlertTriangle } from "lucide-react";
import "./gdprCompliance.css";

export default function GdprCompliance() {
  return (
    <div className="gdpr-compliance-container">
      <div className="gdpr-compliance-content">
        {/* Header Section */}
        <div className="gdpr-header">
          <div className="gdpr-icon">
            <Shield size={48} />
          </div>
          <h1 className="gdpr-title">GDPR Compliance</h1>
          <p className="gdpr-subtitle">
            We are committed to protecting your privacy and ensuring compliance with the General Data Protection Regulation (GDPR).
          </p>
          <div className="last-updated">
            <Clock size={16} />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="gdpr-sections">
          
          {/* What is GDPR */}
          <section className="gdpr-section">
            <div className="section-header">
              <FileText className="section-icon" />
              <h2>What is GDPR?</h2>
            </div>
            <div className="section-content">
              <p>The General Data Protection Regulation (GDPR) is a legal framework that sets guidelines for the collection and processing of personal information from individuals who live in the European Union (EU). It also applies to organizations worldwide that process EU residents' data.</p>
              <div className="highlight-box">
                <p><strong>Effective Date:</strong> GDPR came into effect on May 25, 2018, and applies to all organizations that process personal data of EU residents, regardless of where the organization is located.</p>
              </div>
            </div>
          </section>

          {/* Your GDPR Rights */}
          <section className="gdpr-section">
            <div className="section-header">
              <Users className="section-icon" />
              <h2>Your Rights Under GDPR</h2>
            </div>
            <div className="section-content">
              <p>As a data subject under GDPR, you have the following rights regarding your personal data:</p>
              <ul>
                <li><strong>Right to Information:</strong> Be informed about how your data is being collected and used</li>
                <li><strong>Right of Access:</strong> Request access to your personal data and receive a copy</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete personal data</li>
                <li><strong>Right to Erasure (Right to be Forgotten):</strong> Request deletion of your personal data</li>
                <li><strong>Right to Restrict Processing:</strong> Limit how your data is processed</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong>Right to Object:</strong> Object to processing of your personal data for certain purposes</li>
                <li><strong>Rights related to Automated Decision Making:</strong> Protection from automated decisions including profiling</li>
              </ul>
            </div>
          </section>

          {/* How We Comply */}
          <section className="gdpr-section">
            <div className="section-header">
              <CheckCircle className="section-icon" />
              <h2>How We Ensure GDPR Compliance</h2>
            </div>
            <div className="section-content">
              <p>We have implemented the following measures to ensure full GDPR compliance:</p>
              <ul>
                <li><strong>Lawful Basis for Processing:</strong> We only process personal data when we have a lawful basis to do so</li>
                <li><strong>Consent Management:</strong> Clear and explicit consent mechanisms for data collection</li>
                <li><strong>Data Minimization:</strong> We collect only the data necessary for specific purposes</li>
                <li><strong>Purpose Limitation:</strong> Personal data is used only for the purposes it was collected</li>
                <li><strong>Storage Limitation:</strong> Data is retained only as long as necessary</li>
                <li><strong>Security Measures:</strong> Appropriate technical and organizational measures to protect data</li>
                <li><strong>Data Protection Impact Assessments:</strong> Regular assessments for high-risk processing activities</li>
                <li><strong>Staff Training:</strong> Regular GDPR training for all staff handling personal data</li>
              </ul>
            </div>
          </section>

          {/* Data Processing Activities */}
          <section className="gdpr-section">
            <div className="section-header">
              <Eye className="section-icon" />
              <h2>Our Data Processing Activities</h2>
            </div>
            <div className="section-content">
              <p>We process personal data for the following purposes with corresponding lawful bases:</p>
              <div className="processing-table">
                <div className="processing-item">
                  <h4>Student Registration & Profile Management</h4>
                  <p><strong>Lawful Basis:</strong> Performance of a contract (providing placement services)</p>
                  <p><strong>Data Types:</strong> Name, email, student ID, academic records, CV</p>
                </div>
                <div className="processing-item">
                  <h4>Job Matching & Applications</h4>
                  <p><strong>Lawful Basis:</strong> Performance of a contract and legitimate interests</p>
                  <p><strong>Data Types:</strong> Skills, preferences, application history</p>
                </div>
                <div className="processing-item">
                  <h4>Communication & Updates</h4>
                  <p><strong>Lawful Basis:</strong> Consent and legitimate interests</p>
                  <p><strong>Data Types:</strong> Contact information, communication preferences</p>
                </div>
                <div className="processing-item">
                  <h4>Analytics & Platform Improvement</h4>
                  <p><strong>Lawful Basis:</strong> Legitimate interests</p>
                  <p><strong>Data Types:</strong> Usage data, interaction patterns (anonymized where possible)</p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Transfers */}
          <section className="gdpr-section">
            <div className="section-header">
              <Lock className="section-icon" />
              <h2>International Data Transfers</h2>
            </div>
            <div className="section-content">
              <p>We may transfer your personal data to countries outside the European Economic Area (EEA). When we do so, we ensure appropriate safeguards are in place:</p>
              <ul>
                <li><strong>Adequacy Decisions:</strong> Transfers to countries with an adequacy decision from the European Commission</li>
                <li><strong>Standard Contractual Clauses:</strong> Using EU-approved contract terms for data transfers</li>
                <li><strong>Binding Corporate Rules:</strong> Internal rules for multinational organizations</li>
                <li><strong>Certification Schemes:</strong> Transfers covered by approved certification mechanisms</li>
              </ul>
              <div className="highlight-box">
                <p><strong>Important:</strong> We never transfer personal data to countries without adequate protection mechanisms in place.</p>
              </div>
            </div>
          </section>

          {/* Data Breaches */}
          <section className="gdpr-section">
            <div className="section-header">
              <AlertTriangle className="section-icon" />
              <h2>Data Breach Procedures</h2>
            </div>
            <div className="section-content">
              <p>In the unlikely event of a data breach, we have established procedures to:</p>
              <ul>
                <li><strong>Detection & Assessment:</strong> Rapid identification and assessment of the breach</li>
                <li><strong>Containment:</strong> Immediate steps to contain and mitigate the breach</li>
                <li><strong>Regulatory Notification:</strong> Report to supervisory authorities within 72 hours if required</li>
                <li><strong>Individual Notification:</strong> Inform affected individuals without undue delay if there is a high risk</li>
                <li><strong>Documentation:</strong> Maintain records of all data breaches for regulatory compliance</li>
                <li><strong>Review & Improvement:</strong> Analyze breaches to prevent future occurrences</li>
              </ul>
            </div>
          </section>

          {/* Exercise Your Rights */}
          <section className="gdpr-section">
            <div className="section-header">
              <Users className="section-icon" />
              <h2>How to Exercise Your Rights</h2>
            </div>
            <div className="section-content">
              <p>To exercise any of your GDPR rights, please contact us using the information below:</p>
              <div className="contact-info">
                <div className="contact-item">
                  <strong>Data Protection Officer:</strong> <a href="mailto:dpo@cgcuni.edu">dpo@cgcuni.edu</a>
                </div>
                <div className="contact-item">
                  <strong>General Contact:</strong> <a href="mailto:privacy@cgcuni.edu">privacy@cgcuni.edu</a>
                </div>
                <div className="contact-item">
                  <strong>Address:</strong> CGC University, Mohali, Punjab, India
                </div>
                <div className="contact-item">
                  <strong>Phone:</strong> +91-XXX-XXX-XXXX
                </div>
              </div>
              <div className="highlight-box">
                <p><strong>Response Time:</strong> We will respond to your request within 30 days. In complex cases, we may extend this period by an additional 60 days and will inform you of any delay.</p>
              </div>
            </div>
          </section>

          {/* Complaints */}
          <section className="gdpr-section">
            <div className="section-header">
              <FileText className="section-icon" />
              <h2>Filing a Complaint</h2>
            </div>
            <div className="section-content">
              <p>If you believe we have not handled your personal data in accordance with GDPR, you have the right to file a complaint with:</p>
              <ul>
                <li><strong>Our Data Protection Officer:</strong> Contact us first to resolve the issue</li>
                <li><strong>Your Local Supervisory Authority:</strong> The data protection authority in your EU member state</li>
                <li><strong>Indian Data Protection Authority:</strong> For Indian residents (when applicable)</li>
              </ul>
              <p>We encourage you to contact us first so we can address your concerns directly.</p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="gdpr-footer">
          <p>
            This GDPR compliance information is effective as of {new Date().toLocaleDateString()} and may be updated from time to time. 
            We will notify you of any significant changes that affect your rights.
          </p>
        </div>
      </div>
    </div>
  );
}