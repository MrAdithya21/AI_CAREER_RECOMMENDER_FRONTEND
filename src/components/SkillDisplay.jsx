// src/components/SkillDisplay.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SkillDisplay({ resumeText, setSkills }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      const res = await axios.post('http://localhost:8000/extract-skills', { text: resumeText });
      setSkills(res.data.skills);
      setLoading(false);
    };

    fetchSkills();
  }, [resumeText]);

  if (loading) return <p> Extracting skills...</p>;

  return (
    <div className="my-4">
      <h2 className="text-xl font-bold"> Extracted Skills</h2>
      <pre className="bg-white p-3 rounded mt-2">{skills}</pre>
    </div>
  );
}
