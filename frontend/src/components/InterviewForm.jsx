import React, { useState } from "react";
import { useExperiences } from "../context"; // ✅ Use global context
import toast from "react-hot-toast"; // ✅ Import toast

const branches = [
  "CSE", "CSE AIML", "CSE DS", "IT", "Electrical", 
  "Electronics & Telecommunication", "Mechanical", 
  "Chemical", "Mathematics and Computing",
];

const difficulties = ["Easy", "Medium", "Hard"];

const InterviewForm = ({ user, darkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "",
    contact: "",
    branch: "",
    graduationYear: "",
    companyName: "",
    role: "",
    ctc: "",
    stipend: "",
    interviewDate: "",
    experience: "",
    rating: 0,
    tags: [],
    customTag: "",
    rounds: [],
  });

  const { addExperience } = useExperiences(); // ✅ get addExperience from context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRating = (rating) => {
    setFormData({ ...formData, rating });
  };

  const addRound = () => {
    setFormData({
      ...formData,
      rounds: [
        ...formData.rounds,
        { title: "", difficulty: "Medium", description: "" },
      ],
    });
  };

  const removeRound = (idx) => {
    const updated = formData.rounds.filter((_, index) => index !== idx);
    setFormData({ ...formData, rounds: updated });
  };

  const addTag = () => {
    if (formData.customTag.trim()) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.customTag.trim()],
        customTag: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      name: formData.name.trim() === "" ? "Anonymous" : formData.name,
      submittedAt: new Date().toISOString(), // ✅ timestamp
    };

    addExperience(finalData); // ✅ save in context + localStorage
    toast.success("Experience submitted successfully!");

    // ✅ reset form
    setFormData({
      name: "",
      email: user?.email || "",
      contact: "",
      branch: "",
      graduationYear: "",
      companyName: "",
      role: "",
      ctc: "",
      stipend: "",
      interviewDate: "",
      experience: "",
      rating: 0,
      tags: [],
      customTag: "",
      rounds: [],
    });
  };

  const inputClasses = `border p-2 rounded-lg w-full bg-transparent placeholder-gray-400 ${
    darkMode ? "text-white border-gray-600" : "text-black border-gray-400"
  }`;

  const sectionCard = `rounded-xl p-4 shadow-md ${
    darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
  }`;

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-3xl mx-auto p-6 space-y-8 rounded-2xl shadow-lg ${
        darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      {/* Personal Info */}
      <div className={sectionCard}>
        <h2 className="text-xl font-semibold mb-2 !text-black dark:!text-black">
          👤 Personal Information
        </h2>
        <p className="text-sm mb-4 text-gray-400">
          Name and contact details are optional. Leave blank for anonymous submission.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name (optional)"
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className={`${inputClasses} cursor-not-allowed`}
            />
            <p className="text-xs text-gray-400 mt-1">
              This email is automatically filled from your login and will be used for notifications.
            </p>
          </div>
          <div>
            <label className="block mb-1">Contact Number</label>
            <input
              type="text"
              name="contact"
              placeholder="Optional"
              value={formData.contact}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
        </div>
      </div>

      {/* Academic Info */}
      <div className={sectionCard}>
        <h2 className="text-xl font-semibold mb-4 !text-black dark:!text-black">
          🎓 Academic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Branch</label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className={inputClasses}
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Graduation Year</label>
            <select
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              required
              className={inputClasses}
            >
              <option value="">Select Year</option>
              {Array.from({ length: 6 }, (_, i) => {
                const year = new Date().getFullYear() + i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div className={sectionCard}>
        <h2 className="text-xl font-semibold mb-4 !text-black dark:!text-black">
          🏢 Company & Role Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "companyName", label: "Company Name", placeholder: "e.g., Google" },
            { name: "role", label: "Role", placeholder: "e.g., Software Engineer" },
            { name: "ctc", label: "CTC (₹)", placeholder: "e.g., 1200000" },
            { name: "stipend", label: "Stipend (₹)", placeholder: "e.g., 30000" },
            { name: "interviewDate", label: "Interview Date", type: "date" },
          ].map(({ name, label, placeholder, type = "text" }) => (
            <div key={name}>
              <label className="block mb-1">{label}</label>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className={sectionCard}>
        <h2 className="text-xl font-semibold mb-4 !text-black dark:!text-black">
          📝 Interview Experience
        </h2>
        <label className="block mb-1">Your Experience</label>
        <textarea
          name="experience"
          placeholder="Share your detailed interview experience..."
          value={formData.experience}
          onChange={handleChange}
          required
          className={`${inputClasses} h-32`}
        />
        <div className="mt-4">
          <p className="mb-1">Overall Rating</p>
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2 text-4xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`cursor-pointer ${
                    formData.rating >= star ? "text-yellow-400" : "text-gray-400"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            {formData.rating > 0 && (
              <span className="text-lg font-semibold !text-black dark:!text-black">
                ({formData.rating}/5)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Rounds */}
      <div className={sectionCard}>
        <h2 className="text-xl font-semibold mb-4 !text-black dark:!text-black">
          🔄 Interview Rounds
        </h2>
        {formData.rounds.map((round, idx) => (
          <div
            key={idx}
            className={`p-4 mb-4 rounded-lg shadow border ${
              darkMode ? "border-gray-600 bg-gray-800" : "border-gray-300 bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold !text-black dark:!text-black">
                Round {idx + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeRound(idx)}
                className="text-red-500 hover:text-red-700"
                aria-label="Remove Round"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <label className="block mb-1">Round Name</label>
            <input
              type="text"
              placeholder="e.g., Technical Round"
              value={round.title}
              onChange={(e) => {
                const updated = [...formData.rounds];
                updated[idx].title = e.target.value;
                setFormData({ ...formData, rounds: updated });
              }}
              className={inputClasses}
            />
            <label className="block mt-3 mb-1">Difficulty</label>
            <select
              value={round.difficulty}
              onChange={(e) => {
                const updated = [...formData.rounds];
                updated[idx].difficulty = e.target.value;
                setFormData({ ...formData, rounds: updated });
              }}
              className={inputClasses}
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <label className="block mt-3 mb-1">Description</label>
            <textarea
              placeholder="Describe what happened..."
              value={round.description}
              onChange={(e) => {
                const updated = [...formData.rounds];
                updated[idx].description = e.target.value;
                setFormData({ ...formData, rounds: updated });
              }}
              className={`${inputClasses} h-24`}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addRound}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Round
        </button>
      </div>

      {/* Tags */}
      <div className={sectionCard}>
        <h2 className="text-xl font-semibold mb-4 !text-black dark:!text-black">
          🏷️ Tags
        </h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {[
            "on-campus", "off-campus", "internship", "full-time", "product",
            "service", "startup", "mnc", "remote", "hybrid", "sde", "analyst", "consultant",
          ].map((tag) => (
            <span
              key={tag}
              onClick={() =>
                setFormData({
                  ...formData,
                  tags: formData.tags.includes(tag)
                    ? formData.tags.filter((t) => t !== tag)
                    : [...formData.tags, tag],
                })
              }
              className={`px-3 py-1 border rounded-full cursor-pointer shadow-sm ${
                formData.tags.includes(tag)
                  ? "bg-blue-500 text-white"
                  : darkMode
                  ? "bg-gray-600 text-white border-gray-500"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            name="customTag"
            placeholder="Enter custom tag"
            value={formData.customTag}
            onChange={handleChange}
            className={inputClasses}
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Add
          </button>
        </div>
      </div>

      {/* Submit */}
      <div className="text-center">
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          🚀 Submit Experience
        </button>
      </div>
    </form>
  );
};

export default InterviewForm;
