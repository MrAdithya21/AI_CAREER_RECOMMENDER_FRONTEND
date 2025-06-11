import React, { useState, useEffect, useRef } from "react";
import { uploadResume, compareJob, generateCoverLetterAndMessage } from "../api/api";
import MatchDonutChart from "./MatchDonutChart";
import { FaCloudUploadAlt } from "react-icons/fa";
import jsPDF from "jspdf";

const JobCompare = () => {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [experience, setExperience] = useState(0);
  const [jobText, setJobText] = useState("");
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [editedCoverLetter, setEditedCoverLetter] = useState("");
  const [editedLinkedInMsg, setEditedLinkedInMsg] = useState("");
  const [missingInfoPrompt, setMissingInfoPrompt] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const [userFix, setUserFix] = useState({
    full_name: "",
    job_title: "",
    company_name: "",
    company_address: ""
  });

  const detectMissingPlaceholders = (text) => {
    const placeholders = [/\[.*?\]/g, /{{.*?}}/g, /Your Name|Company Name|Job Title/i];
    return placeholders.some((regex) => regex.test(text));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (/\.(pdf|docx)$/i.test(droppedFile.name)) {
        setFile(droppedFile);
      } else {
        alert("Unsupported file type. Please upload PDF or DOCX.");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (/\.(pdf|docx)$/i.test(selectedFile.name)) {
        setFile(selectedFile);
      } else {
        alert("Unsupported file type. Please upload PDF or DOCX.");
      }
    }
  };

  // Auto-upload resume when file changes
  useEffect(() => {
    if (!file) return;

    const upload = async () => {
      try {
        const { text, experience } = await uploadResume(file);
        setResumeText(text);
        setExperience(experience);
      } catch (err) {
        console.error("Resume upload failed:", err);
        alert("Resume upload failed. Please try again.");
      }
    };

    upload();
  }, [file]);

  const handleCompare = async () => {
    if (!file || !jobText.trim()) {
      return alert("Please upload a resume file and paste the job description.");
    }
    setLoading(true);
    try {
      const result = await compareJob({
        resumeFile: file,
        job_text: jobText,
        experience: experience || 0,
      });
      setComparison(result);
    } catch (err) {
      console.error("compareJob failed:", err);
      alert("Comparison failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDocs = async () => {
    try {
      const result = await generateCoverLetterAndMessage({
        resume_text: resumeText,
        job_text: jobText,
        full_name: "Adithya Singupati",
        location: "Bloomington, IN",
        phone: "(930) 333-2369",
        email: "adisingu@iu.edu",
        degree: "Master of Science in Data Science",
        university: "Indiana University Bloomington",
        job_title: "Quality Data Analyst",
        company_name: "MVP Health Care",
        company_address: "625 State Street, Schenectady, NY"
      });

      setGenerated(result);
      setEditedCoverLetter(result.cover_letter || "");
      setEditedLinkedInMsg(result.linkedin_message || "");
      if (detectMissingPlaceholders(result.cover_letter) || detectMissingPlaceholders(result.linkedin_message)) {
        setMissingInfoPrompt(true);
      }
    } catch (error) {
      console.error("Generate Docs Error:", error);
      alert("Failed to generate cover letter or message.");
    }
  };

  const handleDownloadPDF = () => {
    if (!editedCoverLetter) return;
    const pdf = new jsPDF();
    pdf.setFontSize(12);
    const lines = pdf.splitTextToSize(editedCoverLetter, 180);
    pdf.text(lines, 15, 20);
    pdf.save("cover_letter.pdf");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gradient-to-br from-slate-800/70 to-gray-900/70 text-white rounded-3xl border border-white/10 shadow-xl backdrop-blur-2xl space-y-10 animate-slide-up">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400">
        Job Description Matcher
      </h2>

      {/* Drag and Drop Upload Form */}
      <form
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        className={`text-center border-2 border-dashed rounded-xl p-10 transition-all duration-300 ${
          dragActive ? "border-pink-400 bg-white/5" : "border-white/10"
        }`}
      >
        <input
          type="file"
          accept=".pdf,.docx"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <FaCloudUploadAlt className="mx-auto text-4xl text-purple-400 mb-4" />
        <p className="text-sm text-gray-300 mb-2">Drag & drop your resume PDF or DOCX here, or</p>
        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className="px-6 py-2 text-sm font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-full"
        >
          Browse File
        </button>
        {file && (
          <p className="mt-2 text-sm text-green-400">
            📄 Selected: <span className="font-semibold">{file.name}</span>
          </p>
        )}
      </form>

      {/* Paste JD and Compare Button */}
      <textarea
        rows={6}
        placeholder="Paste job description here..."
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
        className="w-full p-4 rounded-xl bg-gray-800 border border-white/10 text-white resize-none shadow"
      />

      <button
        onClick={handleCompare}
        disabled={!file || !jobText.trim() || loading}
        className={`w-full py-3 rounded-xl font-semibold transition duration-300 ${
          !file || !jobText.trim()
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg"
        }`}
      >
        {loading ? "Comparing..." : "Compare with Job"}
      </button>

      {/* Comparison Results */}
      {comparison && (
        <div className="mt-8 bg-gray-900 border border-gray-700 p-6 rounded-2xl space-y-6">
          <MatchDonutChart score={comparison.score} />

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="text-white font-semibold mb-1">Experience Summary</h4>
              <p><strong>Experience Match:</strong> {comparison.experience_match ? "✅ Yes" : "❌ No"}</p>
              <p><strong>Your Experience:</strong> {comparison.resume_experience} years</p>
              <p><strong>Required Experience:</strong> {comparison.job_required_experience} years</p>
            </div>
            {comparison.tool_experience && Object.keys(comparison.tool_experience).length > 0 && (
              <div>
                <h4 className="text-white font-semibold mb-1">Tool-Specific Requirements</h4>
                <ul className="list-disc ml-6 text-yellow-300">
                  {Object.entries(comparison.tool_experience).map(([tool, years], idx) => (
                    <li key={idx}>{tool}: {years} years</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-green-300 font-semibold mb-1">Matched Skills</h4>
              {comparison.matched.length === 0 ? (
                <p>No matched skills found.</p>
              ) : (
                <ul className="list-disc ml-6">
                  {comparison.matched.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h4 className="text-red-400 font-semibold mb-1">Missing Skills</h4>
              {comparison.missing.length === 0 ? (
                <p className="text-green-300">You meet all skill requirements.</p>
              ) : (
                <ul className="list-disc ml-6">
                  {comparison.missing.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-700 mt-6">
            <button
              onClick={handleGenerateDocs}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2 rounded-full shadow-lg"
            >
              Generate Cover Letter & LinkedIn Message
            </button>
          </div>

          {generated && (
            <div className="mt-6 space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">Edit Cover Letter</label>
                <textarea
                  rows={12}
                  value={editedCoverLetter}
                  onChange={(e) => setEditedCoverLetter(e.target.value)}
                  className="w-full p-4 bg-gray-800 border border-white/10 text-white rounded-xl resize-y"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Edit LinkedIn Referral Message</label>
                <textarea
                  rows={4}
                  value={editedLinkedInMsg}
                  onChange={(e) => setEditedLinkedInMsg(e.target.value)}
                  className="w-full p-4 bg-gray-800 border border-white/10 text-white rounded-xl resize-y"
                />
              </div>
              <button
                onClick={handleDownloadPDF}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow"
              >
                Download Edited Cover Letter PDF
              </button>
            </div>
          )}

          {missingInfoPrompt && (
            <div className="mt-6 p-4 bg-yellow-900/40 border border-yellow-600 rounded-xl space-y-4">
              <h3 className="text-lg font-bold text-yellow-300">Missing Details Detected</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {["full_name", "job_title", "company_name", "company_address"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                    value={userFix[field]}
                    onChange={(e) => setUserFix({ ...userFix, [field]: e.target.value })}
                    className="bg-gray-800 text-white p-2 rounded border border-gray-600"
                  />
                ))}
              </div>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded shadow"
                onClick={async () => {
                  const fixedResult = await generateCoverLetterAndMessage({
                    resume_text: resumeText,
                    job_text: jobText,
                    full_name: userFix.full_name || "Adithya Singupati",
                    location: "Bloomington, IN",
                    phone: "(930) 333-2369",
                    email: "adisingu@iu.edu",
                    degree: "Master of Science in Data Science",
                    university: "Indiana University Bloomington",
                    job_title: userFix.job_title || "Quality Data Analyst",
                    company_name: userFix.company_name || "MVP Health Care",
                    company_address: userFix.company_address || ""
                  });
                  setEditedCoverLetter(fixedResult.cover_letter || "");
                  setEditedLinkedInMsg(fixedResult.linkedin_message || "");
                  setMissingInfoPrompt(false);
                }}
              >
                Regenerate with Provided Info
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobCompare;
