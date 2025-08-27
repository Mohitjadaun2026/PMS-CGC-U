
import React, { useState } from "react";
import "./interviewExperience.css";
import InterviewDetail from "./InterviewDetail";

const dummyData = [
  {
    id: 1,
    company: "Google",
    role: "SDE",
    experience:
      "I had three rounds: 1st was DSA (leetcode-style), 2nd was system design, 3rd was HR. The DSA round was tough but fair, with questions on trees and dynamic programming. The system design round focused on designing a URL shortener. The HR round was friendly and focused on my projects and teamwork. My advice: practice DSA daily and be ready to explain your thought process.",
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Intern",
    experience:
    "The process had an online assessment, followed by two interviews. The OA was mostly MCQs and a couple of coding questions. The interviews were focused on problem-solving and my resume projects. They really liked when I explained my approach step by step.",
  },
  {
    id: 3,
    company: "Amazon",
    role: "SDE",
    experience:
    "There were two technical rounds and one bar-raiser. The first round was all about data structures, especially arrays and strings. The second round was a mix of coding and behavioral questions. ",
  },
  {
    id: 4,
    company: "Goldman Sachs",
    role: "Analyst",
    experience:
    "There was a hackerrank test, then a group discussion, and finally two interviews. The interviews were a mix of technical and HR. They asked about finance basics, puzzles, and my motivation for joining GS. Be confident and clear about why you want the role.",
  },
  {
    id: 5,
    company: "Google",
    role: "SWE",
    experience:
      "The process was long but rewarding. Four rounds: two technical, one design, one HR. The technical rounds were deep on algorithms and data structures. The design round was about scaling a chat app. The HR round was about my teamwork and leadership experiences. Practice mock interviews!",
  },
];


export default function InterviewExperience() {
  const [view, setView] = useState("read");
  const [filter, setFilter] = useState({ company: "", role: "" });
  const [experiences, setExperiences] = useState(dummyData);
  const [form, setForm] = useState({ company: "", role: "", experience: "" });
  const [selected, setSelected] = useState(null);

  // Delete experience handler
  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this experience?')) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const handleFilter = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filtered = experiences.filter(
    (exp) =>
      (!filter.company || exp.company.toLowerCase().includes(filter.company.toLowerCase())) &&
      (!filter.role || exp.role.toLowerCase().includes(filter.role.toLowerCase()))
  );

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setExperiences([
      ...experiences,
      { ...form, id: experiences.length + 1 },
    ]);
    setForm({ company: "", role: "", experience: "" });
    setView("read");
  };

  if (selected) {
    return <InterviewDetail experience={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="interview-experience-page fade-in">
      <h2 className="ie-title">Interview Experience Portal</h2>
      <p className="ie-desc">Share your interview journey or read others' experiences. Use the filters to find stories by company or role.</p>
      <div className="ie-nav">
        <button className={view === "add" ? "active" : ""} onClick={() => setView("add")}>Add Interview Experience</button>
        <button className={view === "read" ? "active" : ""} onClick={() => setView("read")}>Read Interview Experience</button>
      </div>
      {view === "add" && (
        <form className="ie-form ie-form-redesign" onSubmit={handleFormSubmit}>
          <div className="ie-form-row">
            <div className="ie-form-group">
              <label htmlFor="company">Company Name</label>
              <input
                id="company"
                name="company"
                placeholder="e.g. Google, Amazon"
                value={form.company}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="ie-form-group">
              <label htmlFor="role">Role</label>
              <input
                id="role"
                name="role"
                placeholder="e.g. SDE, Analyst"
                value={form.role}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>
          <div className="ie-form-group">
            <label htmlFor="experience">Your Experience</label>
            <textarea
              id="experience"
              name="experience"
              placeholder="Share your interview experience in detail..."
              value={form.experience}
              onChange={handleFormChange}
              required
              rows={7}
            />
          </div>
          <button type="submit">Submit Experience</button>
        </form>
      )}
      {view === "read" && (
        <div className="ie-read-section">
          <div className="ie-filters">
            <input
              name="company"
              placeholder="Filter by Company"
              value={filter.company}
              onChange={handleFilter}
            />
            <input
              name="role"
              placeholder="Filter by Role"
              value={filter.role}
              onChange={handleFilter}
            />
          </div>
          <ul className="ie-list ie-list-redesign">
            {filtered.length === 0 && <li className="ie-empty">No experiences found.</li>}
            {filtered.map((exp) => (
              <li key={exp.id} className="ie-item ie-card" onClick={() => setSelected(exp)}>
                <div className="ie-meta">
                  <span className="ie-company">{exp.company}</span>
                  <span className="ie-role">{exp.role}</span>
                </div>
                <p className="ie-text">
                  {exp.experience.length > 120
                    ? exp.experience.slice(0, 120) + "..."
                    : exp.experience}
                </p>
                <div className="ie-card-actions">
                  <button className="ie-view-btn" onClick={e => {e.stopPropagation(); setSelected(exp);}}>Read</button>
                  <button className="ie-delete-btn" onClick={e => handleDelete(exp.id, e)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
