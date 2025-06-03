// ✅ FULL FIXED COMPONENT: CoverLetterGenerator.jsx

import React, { useState } from "react";
import { uploadResume, generateCoverLetterAndMessage } from "../api/api";
import jsPDF from "jspdf";

const CoverLetterGenerator = () => {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [experience, setExperience] = useState(0);
  const [jobText, setJobText] = useState("");
  const [generated, setGenerated] = useState(null);
  const [editedCoverLetter, setEditedCoverLetter] = useState("");
  const [editedLinkedInMsg, setEditedLinkedInMsg] = useState("");
  const [missingInfoPrompt, setMissingInfoPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userFix, setUserFix] = useState({
    full_name: "",
    job_title: "",
    company_name: "",
    company_address: "",
    location: "",
    phone: "",
    email: "",
    degree: "",
    university: ""
  });

  const detectMissingPlaceholders = (text) => {
    const placeholders = [/\[.*?\]/g, /{{.*?}}/g, /Your Name|Company Name|Job Title/i];
    return placeholders.some((regex) => regex.test(text));
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a resume PDF.");
    try {
      const { text, experience } = await uploadResume(file);
      setResumeText(text);
      setExperience(experience);
    } catch (err) {
      console.error("Resume upload failed:", err);
      alert("Resume upload failed. Please try again.");
    }
  };

  const handleGenerateDocs = async () => {
    if (!resumeText || !jobText) return;
    setIsLoading(true);
    try {
      const result = await generateCoverLetterAndMessage({
        resume_text: resumeText,
        job_text: jobText,
        ...userFix
      });

      const coverLetter = result.cover_letter || "";
      const linkedInMsg = result.linkedin_message || "";
      setGenerated(result);
      setEditedCoverLetter(coverLetter);
      setEditedLinkedInMsg(linkedInMsg);
      if (detectMissingPlaceholders(coverLetter) || detectMissingPlaceholders(linkedInMsg)) {
        setMissingInfoPrompt(true);
      }
    } catch (error) {
      console.error("Generate Docs Error:", error);
      alert("Failed to generate cover letter or message.");
    }
    setIsLoading(false);
  };

  const handleDownloadPDF = () => {
    if (!editedCoverLetter) return;
    const pdf = new jsPDF();
    pdf.setFont("Times", "Normal");
    pdf.setFontSize(12);
    const lines = pdf.splitTextToSize(editedCoverLetter, 180);
    let y = 20;
    lines.forEach((line) => {
      pdf.text(line, 15, y, { align: "justify", maxWidth: 180 });
      y += 7;
    });
    pdf.save("cover_letter.pdf");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto text-white space-y-6">
      <h2 className="text-3xl font-bold text-purple-300 mb-4">Cover Letter Generator</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full px-3 py-2 border bg-gray-800 text-sm text-white rounded"
      />
      <button onClick={handleUpload} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">
        Upload Resume
      </button>
      {resumeText && (
        <p className="text-sm text-green-400">
          Resume uploaded. Estimated experience: <span className="font-semibold">{experience} years</span>
        </p>
      )}

      <textarea
        rows={6}
        placeholder="Paste job description here..."
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
        className="w-full p-4 rounded bg-gray-800 border text-white resize-none"
      />

      {/* Additional user input fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(userFix).map(([key, value]) => (
          <input
            key={key}
            type="text"
            placeholder={key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
            value={value}
            onChange={(e) => setUserFix((prev) => ({ ...prev, [key]: e.target.value }))}
            className="bg-gray-700 text-white p-2 rounded border border-gray-500"
          />
        ))}
      </div>

      <button
        onClick={handleGenerateDocs}
        disabled={!resumeText || !jobText || isLoading}
        className={`w-full py-3 rounded font-semibold flex items-center justify-center ${
          isLoading ? "bg-gray-500" : "bg-gradient-to-r from-purple-500 to-pink-600 hover:to-pink-700"
        } text-white`}
      >
        {isLoading ? "Generating..." : "Generate Cover Letter & LinkedIn Message"}
      </button>

      {generated && (
        <div className="mt-6 space-y-6">
          <div>
            <label className="block font-semibold mb-2">Edit Cover Letter</label>
            <textarea
              rows={12}
              value={editedCoverLetter}
              onChange={(e) => setEditedCoverLetter(e.target.value)}
              className="w-full p-4 bg-gray-800 border rounded resize-y"
              style={{ textAlign: "justify" }}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Edit LinkedIn Referral Message</label>
            <textarea
              rows={4}
              value={editedLinkedInMsg}
              onChange={(e) => setEditedLinkedInMsg(e.target.value)}
              className="w-full p-4 bg-gray-800 border rounded resize-y"
            />
          </div>
          <button onClick={handleDownloadPDF} className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded">
            Download Edited Cover Letter PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default CoverLetterGenerator;
