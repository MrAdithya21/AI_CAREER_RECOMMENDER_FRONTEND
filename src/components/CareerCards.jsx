// Enhanced CareerCards Component with animations & design polish
import React, { useState } from "react";
import { fetchSalary, fetchMissingSkills } from "../api/api";
import SalaryChart from "./SalaryChart";
import { motion } from "framer-motion";

const CareerCards = ({ careers, skills }) => {
  const [salaryData, setSalaryData] = useState({});
  const [missing, setMissing] = useState({});
  const [loadingSalary, setLoadingSalary] = useState(null);
  const [loadingMissing, setLoadingMissing] = useState(null);

  const handleFetchSalary = async (title) => {
    setLoadingSalary(title);
    try {
      const salaries = await fetchSalary(title);
      setSalaryData((prev) => ({ ...prev, [title]: salaries }));
    } catch (err) {
      console.error("Failed to fetch salary data:", err);
    }
    setLoadingSalary(null);
  };

  const handleMissingSkills = async (career) => {
    setLoadingMissing(career.career);
    try {
      const res = await fetchMissingSkills({
        resume_skills: skills,
        job_skills: career.required_skills,
      });
      setMissing((prev) => ({ ...prev, [career.career]: res.missing_skills }));
    } catch (err) {
      console.error("Error getting missing skills:", err);
    }
    setLoadingMissing(null);
  };

  if (!careers.length) return null;

  return (
    <section className="mt-12 animate-slide-up">
      <h3 className="text-2xl font-bold mb-6 text-center text-pink-400">
         Your AI Career Recommendations
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
        {careers.map((career, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gradient-to-br from-slate-900/80 to-slate-800/90 border border-white/10 shadow-xl rounded-xl p-6 hover:shadow-2xl hover:scale-[1.02] transition-all"
          >
            <h3 className="text-2xl font-bold text-pink-400 mb-3">{career.career}</h3>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-300 mb-1"> Required Skills:</p>
              <div className="flex flex-wrap gap-2">
                {career.required_skills.map((skill, i) => (
                  <span key={i} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-300 mb-1"> Recommended Courses:</p>
              <ul className="space-y-1 list-disc ml-5 text-sm">
                {career.courses.map((course, i) => (
                  <li key={i}>
                    <a href={course.link} target="_blank" rel="noreferrer" className="text-blue-400 underline hover:text-blue-300">
                      {course.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              <button
                onClick={() => handleFetchSalary(career.career)}
                disabled={loadingSalary === career.career}
                className="bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-semibold px-4 py-2 rounded shadow"
              >
                {loadingSalary === career.career ? "Loading Salary..." : " Show Salary"}
              </button>

              <button
                onClick={() => handleMissingSkills(career)}
                disabled={loadingMissing === career.career}
                className="bg-gray-700 hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2 rounded shadow"
              >
                {loadingMissing === career.career ? "Checking Skills..." : " Show Missing Skills"}
              </button>
            </div>

            {salaryData[career.career] && (
              <div className="mt-4 text-sm text-white bg-yellow-100/10 border border-yellow-400/40 p-4 rounded-xl space-y-2 animate-fade-in-right">
                <h4 className="font-semibold text-yellow-300">💰 Salary Insights</h4>
                <ul className="list-disc list-inside text-yellow-100 ml-4">
                  {salaryData[career.career].map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
                <SalaryChart start={60000} end={200000} />
              </div>
            )}

            {missing[career.career] && (
              <div className="mt-4 text-sm bg-red-500/10 border border-red-400/30 p-4 rounded-xl text-red-300 animate-fade-in-right">
                <strong> Missing Skills:</strong>
                {missing[career.career].length === 0 ? (
                  <p className="mt-1"> You have all the required skills!</p>
                ) : (
                  <ul className="list-disc list-inside ml-4 mt-1">
                    {missing[career.career].map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CareerCards;
