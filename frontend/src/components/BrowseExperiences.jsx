import React, { useState, useEffect } from "react";
import { useExperiences } from "../context";
import ExperienceCard from "./ExperienceCard";
import ExperienceModal from "./ExperienceDetails";
import { Link } from "react-router-dom";

const BrowseExperiences = ({ darkMode }) => {
  const { experiences } = useExperiences();
  const [selectedExp, setSelectedExp] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  const filteredExperiences = experiences.filter((exp) => {
    const term = debouncedSearchTerm.toLowerCase();
    const companyName = exp.companyName?.toLowerCase() || "";
    const tags = exp.tags?.map((tag) => tag.toLowerCase()) || [];

    return (
      companyName.includes(term) ||
      tags.some((tag) => tag.includes(term))
    );
  });

  return (
    <div className="max-w-5xl mx-auto p-6 w-[1100px]">
      <h1 className="text-2xl font-bold mb-6 text-center">📚 Browse Experiences</h1>
      <input
        type="search"
        placeholder="Search by company or tags..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="min-w-[500px] mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--maroon-500)] mx-auto block"
      />

      {experiences.length === 0 ? (
        <p className="text-gray-400">No experiences yet. Be the first to submit!</p>
      ) : filteredExperiences.length === 0 ? (
        <p className="text-gray-400">
          No experiences match your search. Try different keywords.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.map((exp, idx) => (
            <Link
              key={idx}
              to={`/experience/${exp.id}`}
              className="block no-underline hover:no-underline focus:no-underline"
              style={{ textDecoration: "none" }}
            >
              <ExperienceCard exp={exp} darkMode={darkMode} />
            </Link>
          ))}
        </div>
      )}

      {/* Keep this for backward compatibility if needed */}
      {selectedExp && (
        <ExperienceModal
          exp={selectedExp}
          darkMode={darkMode}
          onClose={() => setSelectedExp(null)}
        />
      )}
    </div>
  );
};

export default BrowseExperiences;
