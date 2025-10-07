import React, { useState, useEffect } from "react";
import { useExperiences } from "../context";
import ExperienceCard from "./ExperienceCard";
import ExperienceModal from "./ExperienceDetails";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react"

const BrowseExperiences = ({ darkMode }) => {
  const { experiences } = useExperiences();
  const [selectedExp, setSelectedExp] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [pagenumber, setPagenumber] = useState(1);
  const [selectedPageExperience, setSelectedPageExperience] = useState([]);

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

  useEffect(() => {
    setPagenumber(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const itemsPerPage = 10;
    const startIndex = (pagenumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentExperiences = filteredExperiences.slice(startIndex, endIndex);

    setSelectedPageExperience(currentExperiences);
  }, [pagenumber,filteredExperiences])

  function handleNextPage() {
    const maxPage = Math.ceil(filteredExperiences.length / 10);
    setPagenumber(prev => {
      if (prev >= maxPage) return prev;
      return prev + 1;
    })
  }
  function handlePrevPage() {
    setPagenumber(prev => {
      if (prev <= 1) return prev;
      return prev - 1;
    });
  }
  function handlePageClick(num) {
    setPagenumber(num);
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
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
        <div className="flex flex-col gap-[10px]">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedPageExperience.map((exp, idx) => (
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

          <div className="w-full flex gap-[15px] flex-row items-center justify-center m-[10px]">
            <button
              onClick={handlePrevPage}
              disabled={pagenumber === 1}
              className={`!hover:cursor-default !p-0 h-[40px] w-[40px] rounded-[2px] flex items-center justify-center text-xl !border !border-black !bg-white !text-black ${pagenumber == 1 ? "!opacity-50 !cursor-not-allowed" : "cursor-pointer"}`}
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: Math.ceil(filteredExperiences.length / 10) }, (_, i) => (
              <button
                key={i}
                className={`!hover:cursor-default !p-0 h-[40px] w-[40px] cursor-pointer rounded-[2px] flex items-center justify-center text-xl border border-black
    ${pagenumber === i + 1
                    ? "bg-[var(--marron-500)] text-white"
                    : "!bg-white !border !border-black !text-black"
                  }`}
                onClick={() => handlePageClick(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={pagenumber === Math.ceil(filteredExperiences.length)}
              className={`!p-0 !hover:cursor-default h-[40px] w-[40px] cursor-pointer rounded-[2px] flex items-center justify-center !border !border-black !bg-white !text-black ${pagenumber == Math.ceil(experiences.length / 10) ? "!opacity-50 !cursor-not-allowed" : "cursor-pointer"}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>

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
