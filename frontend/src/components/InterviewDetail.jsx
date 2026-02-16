import React from "react";
import "./interviewExperience.css";

export default function InterviewDetail({ experience, onBack }) {
  if (!experience) return null;
  return (
    <div className="ie-detail-page fade-in">
      <button className="ie-back-btn" onClick={onBack}>&larr; Back</button>
      <div className="ie-detail-card">
        <h2 className="ie-detail-title">{experience.company} - {experience.role}</h2>
        <div className="ie-detail-meta">
          <span className="ie-detail-company">Company: <b>{experience.company}</b></span>
          <span className="ie-detail-role">Role: <b>{experience.role}</b></span>
        </div>
        <div className="ie-detail-body">
          <h3>Full Experience</h3>
          <p>{experience.experience}</p>
        </div>
      </div>
    </div>
  );
}
