import React from "react";

const Header = () => (
  <header className="bg-black/50 border-b border-white/10 backdrop-blur-md text-white py-4 shadow-lg sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <h2 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent animate-gradient-x">
        AI Career Recommender
      </h2>
      <span className="hidden md:inline text-sm text-gray-400">
        Empowering Careers with Intelligence 💼✨
      </span>
    </div>
  </header>
);

export default Header;
