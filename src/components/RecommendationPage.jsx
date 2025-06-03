import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchSalary, fetchMissingSkills } from "../api/api";
import SalaryChart from "./SalaryChart";

const RecommendationPage = () => {
  const { state } = useLocation();
  const { skills, careers, experience = 0 } = state || {}; // ✅ Add experience
  const navigate = useNavigate();

  const [salaryData, setSalaryData] = useState({});
  const [missingSkills, setMissingSkills] = useState({});
  const handleFetchSalary = async (careerTitle) => {
    const result = await fetchSalary(careerTitle);
    setSalaryData((prev) => ({ ...prev, [careerTitle]: result }));
  };

  const handleMissingSkills = async (career) => {
    const result = await fetchMissingSkills({
      resume_skills: skills,
      job_skills: career.required_skills,
    });
    setMissingSkills((prev) => ({
      ...prev,
      [career.career]: result.missing_skills,
    }));
  };

  const estimateRequiredExperience = (careerTitle) => {
    // Optionally extract based on known titles
    const lower = careerTitle.toLowerCase();
    if (lower.includes("junior") || lower.includes("entry")) return 0;
    if (lower.includes("mid")) return 2;
    if (lower.includes("senior") || lower.includes("lead")) return 5;
    return 3; // default guess
  };

  if (!careers) {
    return (
      <p className="text-center mt-20 text-xl text-gray-400">
        No recommendations found.
      </p>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-black text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-400">Your Career Matches</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={() => navigate("/")}
        >
          🔁 Try Again
        </button>
      </div>

      <p className="mb-4 text-indigo-300 text-sm">
         <strong>Estimated Experience from Resume:</strong> {experience} year{experience !== 1 && "s"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {careers.map((career, index) => {
          const requiredExp = estimateRequiredExperience(career.career);
          const hasEnoughExp = experience >= requiredExp;

          return (
            <div key={index} className="card-glow p-6 rounded bg-white/5 border border-white/20 shadow-lg">
              <h2 className="text-xl font-semibold text-pink-400">{career.career}</h2>

              <div className="flex flex-wrap gap-2 my-4">
                {career.required_skills?.map((skill, idx) => (
                  <span key={idx} className="bg-indigo-800 text-white px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="space-y-1 mb-4 text-sm">
                {career.courses?.map((course, idx) => (
                  <a
                    key={idx}
                    href={course.link}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-400 hover:text-blue-200 block"
                  >
                    📘 {course.title}
                  </a>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                  className="w-full bg-yellow-500 text-black font-medium py-2 rounded hover:scale-105 transition"
                  onClick={() => handleFetchSalary(career.career)}
                >
                   Show Salary Insights
                </button>

                <button
                  className="w-full bg-slate-800 text-white font-medium py-2 rounded hover:scale-105 transition"
                  onClick={() => handleMissingSkills(career)}
                >
                   Show Missing Skills
                </button>
              </div>

              {/* Experience feedback */}
              <div className="mt-3 text-sm">
                <strong>Experience Match:</strong>{" "}
                {hasEnoughExp ? (
                  <span className="text-green-400">✅ Suitable for your level</span>
                ) : (
                  <span className="text-red-400">
                     Estimated {requiredExp}+ years required
                  </span>
                )}
              </div>

              {/* Salary Insights */}
              {salaryData[career.career] && (
                <div className="mt-4 text-sm">
                  <h4 className="font-semibold"> Salary Samples:</h4>
                  <ul className="list-disc list-inside ml-4">
                    {salaryData[career.career].map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                  <SalaryChart start={60000} end={200000} />
                </div>
              )}

              {/* Missing Skills */}
              {missingSkills[career.career] && (
                <div className="mt-4 text-sm bg-red-50/10 p-3 rounded text-red-300 border border-red-500/30">
                  <strong>❗ Missing Skills:</strong>
                  {missingSkills[career.career].length === 0 ? (
                    <p> You have all the required skills!</p>
                  ) : (
                    <ul className="list-disc list-inside ml-2">
                      {missingSkills[career.career].map((skill, i) => (
                        <li key={i}>{skill}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationPage;
