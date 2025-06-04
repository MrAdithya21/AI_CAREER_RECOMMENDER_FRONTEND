// Refactored ResumeUpload.jsx – Multi-Step Flow with Drag & Drop
import React, { useState, useRef } from "react";
import { uploadResume, extractSkills, recommendCareers } from "../api/api";
import { FaMagic, FaBrain, FaCloudUploadAlt } from "react-icons/fa";
import CareerCards from "./CareerCards";
import StepTracker from "./StepTracker";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

const ResumeUpload = ({ setStarted }) => {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [experience, setExperience] = useState(0);
  const [skills, setSkills] = useState([]);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [width, height] = useWindowSize();
  const inputRef = useRef();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setStatus("Uploading resume...");
    try {
      const res = await uploadResume(file);
      setText(res.text);
      setExperience(res.experience);
      setStep(1);
      setStarted(true);
    } catch (err) {
      console.error("Upload failed:", err);
    }
    setLoading(false);
  };

  const handleExtractSkills = async () => {
    setLoading(true);
    setStatus("Extracting skills...");
    try {
      const raw = await extractSkills(text);
      const parsed = Array.isArray(raw) ? raw : raw.split(",").map((s) => s.trim());
      setSkills(parsed);
      setStep(2);
    } catch (err) {
      console.error("Skill extraction failed:", err);
    }
    setLoading(false);
  };

  const handleRecommendCareers = async () => {
    setLoading(true);
    setStatus("Recommending careers...");
    try {
      const result = await recommendCareers(skills, experience);
      setCareers(result);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
      setStep(3);
    } catch (err) {
      console.error("Career recommendation failed:", err);
    }
    setLoading(false);
  };

  const resetAll = () => {
    setFile(null);
    setText("");
    setSkills([]);
    setExperience(0);
    setCareers([]);
    setStatus("");
    setStep(0);
    setStarted(false);
  };

  return (
<div className="w-full px-4 md:px-8 py-8 bg-gradient-to-br from-slate-900/80 to-black/70 border border-white/10 rounded-2xl backdrop-blur-xl shadow-xl space-y-10 animate-slide-up">
      {showConfetti && <Confetti width={width} height={height} numberOfPieces={250} recycle={false} />}
      <StepTracker currentStep={step} />

      {step === 0 && (
        <form
          onDragEnter={handleDrag}
          onSubmit={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          className={`text-center border-2 border-dashed rounded-xl p-10 transition-all duration-300 ${dragActive ? "border-pink-400 bg-white/5" : "border-white/10"}`}
        >
          <input
            type="file"
            accept=".pdf"
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <FaCloudUploadAlt className="mx-auto text-4xl text-purple-400 mb-4" />
          <p className="text-sm text-gray-300 mb-2">Drag & drop your resume PDF here, or</p>
          <button
            type="button"
            onClick={() => inputRef.current.click()}
            className="px-6 py-2 text-sm font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-full"
          >
            Browse File
          </button>
          {file && <p className="mt-2 text-sm text-green-400">📄 Selected: {file.name}</p>}
          <div className="mt-6">
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:scale-105 transition font-semibold"
            >
              {loading ? status : "Upload Resume"}
            </button>
          </div>
        </form>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="flex items-center gap-2 text-green-400 text-xl font-bold">
              <FaMagic /> Extracted Resume Text
            </h3>
            <textarea
              value={text}
              readOnly
              className="w-full bg-black/40 text-white border border-white/20 p-4 rounded-xl resize-none mt-2"
              rows={8}
            />
            <p className="text-sm text-indigo-300 mt-2">
               Estimated Experience: <strong>{experience} years</strong>
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleExtractSkills}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow"
            >
              {loading ? status : "Extract Skills"}
            </button>
            <button onClick={resetAll} className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl shadow">
              Reset
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-slide-up space-y-6">
          <div>
            <h3 className="flex items-center gap-2 text-indigo-300 text-xl font-semibold mb-2">
              <FaBrain /> Extracted Skills
            </h3>
            <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto">
              {skills.map((skill, idx) => (
                <span key={idx} className="bg-indigo-700/80 text-white px-3 py-1 rounded-full text-sm shadow">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={handleRecommendCareers}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 rounded-xl shadow-lg"
          >
            {loading ? status : "Recommend Careers"}
          </button>
        </div>
      )}

      {step === 3 && <CareerCards careers={careers} skills={skills} />}
    </div>
  );
};

export default ResumeUpload;
