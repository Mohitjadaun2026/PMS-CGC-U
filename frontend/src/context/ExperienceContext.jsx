import React, { createContext, useState, useContext, useEffect } from "react";
import { addInterviewExperience, getAllInterviewExperiences } from "../../api/interviews";

const ExperienceContext = createContext();

export const ExperienceProvider = ({ children }) => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await getAllInterviewExperiences();
        setExperiences(data);
      } catch (err) {
        console.error("Error fetching experiences:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchExperiences();
  }, []);

  const addExperience = async (newExp) => {
    try {
      const experience = await addInterviewExperience(newExp);
      setExperiences((prev) => [...prev, { ...experience}]);
    }
    catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <ExperienceContext.Provider value={{ experiences, addExperience, error, loading }}>
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperiences = () => useContext(ExperienceContext);
