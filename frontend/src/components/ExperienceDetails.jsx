import React from "react";
import { useParams, Link } from "react-router-dom";
import { useExperiences } from "../context/ExperienceContext";

const ExperienceDetails = ({ darkMode }) => {
  const { id } = useParams();
  const { experiences } = useExperiences();

  // Find the experience by id
  const exp = experiences.find((e) => String(e._id) === id);

  if (!exp) {
    return (
      <div className="p-6">
        <p className="text-red-500">Experience not found.</p>
        <Link to="/interview-experience/browse" className="text-blue-500 underline">
          ← Back to all experiences
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Link to="/interview-experience/browse" className="text-blue-500 underline block mb-4">
        ← Back to Experiences
      </Link>

      <div
        className={`max-w-3xl mx-auto rounded-2xl shadow-lg p-6 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-2xl font-bold mb-2">{exp.companyName}</h1>
        <p className="text-lg mb-4">{exp.role}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><strong>Name:</strong> {exp.name}</p>
          <p><strong>Email:</strong> {exp.email}</p>
          <p><strong>Branch:</strong> {exp.branch}</p>
          <p><strong>Graduation Year:</strong> {exp.graduationYear}</p>
          <p><strong>CTC:</strong> {exp.ctc || "N/A"}</p>
          <p><strong>Stipend:</strong> {exp.stipend || "N/A"}</p>
          <p><strong>Date:</strong> {exp.interviewDate}</p>
          <p><strong>Submitted At:</strong> {new Date(exp.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-1">Experience</h3>
          <p className="text-sm">{exp.experience}</p>
        </div>

        {exp.rounds?.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Rounds</h3>
            {exp.rounds.map((r, i) => (
              <div key={i} className="border p-3 rounded-lg mb-2">
                <p><strong>{r.title || `Round ${i + 1}`}</strong></p>
                <p>Difficulty: {r.difficulty}</p>
                <p className="text-sm mt-1">{r.description}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {exp.tags?.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs bg-blue-600 text-white rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;
