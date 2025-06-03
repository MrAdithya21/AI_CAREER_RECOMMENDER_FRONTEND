// Enhanced StepTracker.jsx with glow effects & tooltips
import React from "react";

const steps = [
  { label: "Upload Resume", tip: "Start by uploading your PDF resume" },
  { label: "Extract Skills", tip: "AI will detect your key skills" },
  { label: "AI Career Match", tip: "Discover career suggestions based on your profile" }
];

const StepTracker = ({ currentStep = 0 }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto mb-8">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isDone = index < currentStep;

        return (
          <div key={index} className="flex-1 flex items-center group">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300
                ${isDone ? "bg-green-500 text-white shadow-md shadow-green-400/30" :
                  isActive ? "bg-purple-600 text-white shadow-lg shadow-purple-400/40 animate-pulse" :
                  "bg-gray-700 text-gray-300"}`}
              title={step.tip}
            >
              {index + 1}
            </div>
            <div className="ml-3 text-sm text-white whitespace-nowrap" title={step.tip}>
              {step.label}
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepTracker;
