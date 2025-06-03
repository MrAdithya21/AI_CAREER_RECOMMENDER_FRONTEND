import React from "react";

const Footer = () => (
  <footer className="bg-[#0b0b0d]/80 border-t border-white/10 py-8 px-4 text-center text-sm text-gray-400 backdrop-blur-lg shadow-inner">
    <p className="mb-1">
      © 2025 <span className="font-semibold text-white">AI Career Recommender</span>. All rights reserved.
    </p>
    <p className="text-xs leading-relaxed">
      Built with ❤️ using{" "}
      <span className="text-purple-400 font-semibold">React</span>,{" "}
      <span className="text-blue-400 font-semibold">TailwindCSS</span>, and{" "}
      <span className="text-pink-400 font-semibold">Google-powered AI</span>.
    </p>
  </footer>
);

export default Footer;
