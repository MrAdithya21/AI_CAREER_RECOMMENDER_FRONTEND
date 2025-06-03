import React, { useState } from "react";
import ResumeUpload from "./ResumeUpload";
import JobCompare from "./JobCompare";
import CoverLetterGenerator from "./CoverLetterGenerator";

const MainTabs = () => {
  const [activeTab, setActiveTab] = useState("recommender");

  return (
    <div className="relative min-h-screen w-full bg-[#0e0e10] overflow-hidden text-white font-sans">
      {/* Full-Screen Glassmorphic Background Layer */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,#9333ea22,transparent_40%),radial-gradient(circle_at_80%_80%,#ec489933,transparent_40%)] backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]" />

      {/* Page Content */}
      <div className="relative z-10 flex flex-col items-center px-4 pt-10 md:pt-14 space-y-10 min-h-screen">
        {/* Hero Section */}
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 animate-gradient-x drop-shadow-md">
            Your AI Career Recommender
          </h1>
          <p className="text-gray-300 mt-4 text-lg leading-relaxed">
            Discover your ideal career path with AI-powered insights. Upload your resume, compare jobs, and generate tailored cover letters — all in one sleek, intelligent workspace.
          </p>
        </div>

        {/* Main Glass Panel */}
        <div className="w-full max-w-6xl px-6 py-10 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] animate-slide-up space-y-10">
          {/* Tab Buttons */}
          <div className="flex justify-center flex-wrap gap-4">
            {[
              { id: "recommender", label: "Career Recommender" },
              { id: "matcher", label: "Job Match Checker" },
              { id: "coverletter", label: "Cover Letter Generator" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "bg-white/10 text-gray-300 border border-white/10 hover:bg-white/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="w-full animate-slide-up">
            {activeTab === "recommender" && <ResumeUpload />}
            {activeTab === "matcher" && <JobCompare />}
            {activeTab === "coverletter" && <CoverLetterGenerator />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTabs;
