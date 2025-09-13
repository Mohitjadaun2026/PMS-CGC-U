
import React, { useState, useEffect } from "react";
import "./interviewExperience.css";
import InterviewDetail from "./InterviewDetail";
import { getAllInterviewExperiences, addInterviewExperience, deleteInterviewExperience, editInterviewExperience } from "../../api/interviews";

export default function InterviewExperience() {
  const [view, setView] = useState("read");
  const [filter, setFilter] = useState({ company: "", role: "" });
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({ company: "", role: "", experience: "" });
  const [selected, setSelected] = useState(null);
  const [editId, setEditId] = useState(null);
  const [debouncedFilter, setDebouncedFilter] = useState(filter);
  const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;

  useEffect(() => {
    fetchExperiences();
  }, []);

  // Debounce effect for filter
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 300);
    return () => clearTimeout(timer);
  }, [filter])

  // Fetch interview experiences
  const fetchExperiences = async () => {
    try {
      const data = await getAllInterviewExperiences();
      setExperiences(data);
      console.log(data)
    } catch (error) {
      console.error('Failed to fetch interview experiences:', error);
    }
  };

  // Delete experience handler
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    const confirmed = window.confirm('Are you sure you want to delete this experience?');
    if (!confirmed) return;
    try {
      await deleteInterviewExperience(id);
      setExperiences(prev => prev.filter(exp => exp._id !== id));
      alert('Experience deleted successfully.');
    } catch (error) {
      console.error('Failed to delete experience:', error);
      alert('Failed to delete experience: ' + (error.message || 'Unknown error'));
    }
  };

  const handleFilter = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filtered = experiences.filter(
    (exp) =>
      (!debouncedFilter.company || exp.company.toLowerCase().includes(debouncedFilter.company.toLowerCase())) &&
      (!debouncedFilter.role || exp.role.toLowerCase().includes(debouncedFilter.role.toLowerCase()))
  );

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Edit experience
      if (editId) {
        await editInterviewExperience(editId, form);
        setExperiences(prev =>
          prev.map(exp => exp._id === editId ? { ...exp, ...form } : exp)
        );
        alert("Interview Experience updated.");
        setEditId(null);
        setForm({ company: "", role: "", experience: "" });
        setView("read");
      }
      else {
        // Save experience
        const newExp = await addInterviewExperience(form); // send to backend
        setExperiences([...experiences, newExp]); // update local state
        alert('Succesfully added. ')
        setForm({ company: "", role: "", experience: "" }); // reset form
        setView("read"); // switch to read view
      }
    } catch (error) {
      console.error("Failed to submit experience:", error);
    }
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
            <button type="submit">{editId ? "Save Experience" : "Submit Experience"}</button>
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
              <li key={exp._id} className="ie-item ie-card" onClick={() => setSelected(exp)}>
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
                  {exp.createdBy === userId ? (
                    <>
                      <button className="ie-delete-btn" onClick={e => handleDelete(exp._id, e)}>
                        Delete
                      </button>
                      <button className="ie-edit-btn" onClick={e => {
                        e.stopPropagation(); setForm({
                          company: exp.company,
                          role: exp.role,
                          experience: exp.experience
                        }); setView("add"); setEditId(exp._id)
                      }}>
                        Edit
                      </button>

                    </>
                  ) : (
                    <button className="ie-view-btn" onClick={e => { e.stopPropagation(); setSelected(exp); }}>Read</button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
