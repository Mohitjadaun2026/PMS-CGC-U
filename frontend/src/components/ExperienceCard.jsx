import React from "react";

const ExperienceCard = ({ exp, darkMode }) => {
  return (
    <div
      className={`min-w-[300px] p-4 rounded-xl shadow-md cursor-pointer transition hover:shadow-lg no-underline ${
        darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h3 className="text-lg font-semibold"> {exp.companyName || "Unknown Company"} </h3>
      <p className="text-sm"> {exp.role || "Role not specified"} </p>
      <p className="text-xs text-gray-400"> {exp.graduationYear} • {exp.branch} </p>

      <div className="flex items-center mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={exp.rating >= star ? "text-yellow-400" : "text-gray-400"}>
            ★
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {exp.tags?.slice(0, 3).map((tag, i) => (
          <span key={i} className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
            {tag}
          </span>
        ))}
        {exp.tags?.length > 3 && (
          <span className="px-2 py-1 text-xs bg-gray-400 text-white rounded-full">
            +{exp.tags.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
