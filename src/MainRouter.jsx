import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import RecommendationPage from "./components/RecommendationPage";
import CareerChatbot from "./components/CareerChatbot";

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recommendations" element={<RecommendationPage />} />
        <Route path="/chat" element={<CareerChatbot />} />
      </Routes>
    </Router>
  );
}