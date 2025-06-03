import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000";

// ✅ Upload resume and get both text & experience
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_BASE}/upload-resume`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return {
    text: response.data.text,
    experience: response.data.experience,
  };
};

// ✅ Extract skills from resume text
export const extractSkills = async (resumeText) => {
  const formData = new FormData();
  formData.append("text", resumeText);

  const response = await axios.post(`${API_BASE}/extract-skills`, formData);
  return response.data.skills;
};

// ✅ Recommend careers based on skills + experience
export const recommendCareers = async (skills, experience = 0) => {
  const formData = new FormData();
  formData.append("skills", skills.join(", "));
  formData.append("experience", experience);

  const response = await axios.post(`${API_BASE}/recommend-careers`, formData);
  return response.data.careers;
};

// ✅ Fetch salary insights
export const fetchSalary = async (jobTitle) => {
  const response = await axios.get(`${API_BASE}/salary`, {
    params: { job_title: jobTitle },
  });
  return response.data.salaries;
};

// ✅ Find missing skills between resume and job requirement
export const fetchMissingSkills = async ({ resume_skills, job_skills }) => {
  const response = await axios.post(`${API_BASE}/missing-skills`, {
    resume_skills,
    job_skills,
  });
  return response.data;
};

// ✅ Chatbot for career-related Q&A
export const sendChatMessage = async (message) => {
  const res = await axios.post(`${API_BASE}/chatbot`, { message });
  return res.data.answer;
};

// ✅ Resume vs Job Description comparator
export const compareJob = async ({ resume_text, job_text, experience }) => {
  const response = await axios.post("http://127.0.0.1:8000/compare-job", {
    resume_text,
    job_text,
    experience: parseInt(experience),
  });
  return response.data;
};
export const generateCoverLetterAndMessage = async (payload) => {
  const response = await axios.post("http://127.0.0.1:8000/generate-docs", payload);
  return response.data;
};

