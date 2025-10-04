import React, { useState } from "react";
import { useExperiences } from "../context";
import ExperienceCard from "./ExperienceCard";
import ExperienceModal from "./ExperienceDetails";
import { Link } from "react-router-dom";

const BrowseExperiences = ({ darkMode }) => {
  const { experiences } = useExperiences();
  const [selectedExp, setSelectedExp] = useState(null);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📚 Browse Experiences</h1>

      {experiences.length === 0 ? (
        <p className="text-gray-400">No experiences yet. Be the first to submit!</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            // ✅ Link styled like a card with no underline
           <Link
  key={exp._id}
  to={`/experience/${exp._id}`}
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
