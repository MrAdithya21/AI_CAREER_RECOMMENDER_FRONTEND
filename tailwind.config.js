/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
      },
      colors: {
        primary: "#6366f1",   // Indigo-500
        secondary: "#8b5cf6", // Violet-500
        accent: "#ec4899",    // Pink-500
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "fade-in-right": {
          "0%": { opacity: 0, transform: "translateX(20px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        "slide-up": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "bounce-in": {
          "0%": { opacity: 0, transform: "scale(0.95) translateY(20px)" },
          "60%": { opacity: 1, transform: "scale(1.02) translateY(-4px)" },
          "100%": { transform: "scale(1) translateY(0)" },
        },
        "ping-slow": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.3" },
          "50%": { transform: "scale(1.1)", opacity: "0.6" },
        },
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "fade-in-right": "fade-in-right 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "bounce-in": "bounce-in 0.6s ease-out",
        "ping-slow": "ping-slow 6s ease-in-out infinite",
        "gradient-x": "gradient-x 6s ease infinite",
      },
    },
  },
  plugins: [],
};
