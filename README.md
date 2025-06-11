# AI Career Recommender - Frontend

## Overview

This is the **frontend** repository for the **AI Career Recommender** web application. The app is designed to help users discover personalized career paths based on their uploaded resume and extracted skills. It uses AI-powered APIs to analyze resumes, extract relevant skills, estimate experience, and recommend suitable career options, presenting results through an interactive and user-friendly interface.

---

## Project Structure

- **public/**  
  Contains static assets such as `favicon.ico`, HTML template (`index.html`), and app logos (`logo192.png`, `logo512.png`).

- **src/**  
  The main source code directory containing:

  - **api/**  
    Contains `api.js`, which manages API calls to the backend services for uploading resumes, extracting skills, and getting career recommendations.

  - **assets/**  
    Holds static JSON or media assets like `loading.json` (for animations or visual effects).

  - **components/**  
    React components used throughout the app, including:  
    - `CareerCards.jsx` – displays recommended career cards dynamically.  
    - `CareerChatbot.jsx` – chatbot interface to discuss career options.  
    - `CoverLetterGenerator.jsx` – generates cover letters based on user data.  
    - `FloatingChatAssistant.jsx` – floating chat widget for interactive assistance.  
    - `Footer.jsx` and `Header.jsx` – page layout components.  
    - `JobCompare.jsx` – compares multiple job roles or offers.  
    - `MainTabs.jsx` – tab navigation for main sections of the app.  
    - `MatchDonutChart.jsx` and `SalaryChart.jsx` – data visualizations for skill match and salary insights.  
    - `RecommendationPage.jsx` – page that summarizes recommended careers.  
    - `ResumeUpload.jsx` – multi-step resume upload and processing flow.  
    - `SkillDisplay.jsx` – shows extracted skills in an interactive format.  
    - `StepTracker.jsx` – shows progress in multi-step workflows.

- **App.js**  
  The main React component rendering the overall app layout and managing global state.

- **App.css**  
  Global styles for the app.

---

## How It Works

1. **Resume Upload**  
   Users upload their resume PDF via the `ResumeUpload` component. It supports drag-and-drop or manual file selection.

2. **Resume Processing**  
   The uploaded file is sent to the backend via API (`uploadResume`), which extracts the resume text and estimates years of experience.

3. **Skill Extraction**  
   The extracted text is analyzed using AI-powered skill extraction (`extractSkills` API). Skills are displayed interactively to the user.

4. **Career Recommendations**  
   Based on the extracted skills and experience, AI generates personalized career recommendations (`recommendCareers` API). These careers are presented with detailed cards showing roles, skills match, and insights.

5. **Interactive Features**  
   - Users can chat with the AI career chatbot (`CareerChatbot.jsx`) for guidance or queries.  
   - Cover letter generation helps create tailored letters based on the resume data.  
   - Visual charts display skill match and salary insights, aiding decision-making.

---

## Technologies Used

- **React.js** – Frontend UI library for building interactive components.  
- **Tailwind CSS** – Utility-first CSS framework for styling.  
- **React Icons** – Iconography for UI elements.  
- **Confetti** – Celebration animations for user feedback.  
- **Custom APIs** – Interact with backend services for resume parsing, skill extraction, and career recommendation.  
- **React Hook `useWindowSize`** – Responsive design handling.

---

## How to Run Locally

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Ensure backend APIs are running and accessible.
4. Run `npm start` to launch the app on `localhost:3000`.

---

## Future Enhancements

- Add user authentication for saving personalized career profiles.
- Enable resume editing and real-time skill updates.
- Integrate more detailed salary and growth analytics.
- Enhance chatbot intelligence with multi-turn dialogue capabilities.

---

## Contact

For questions or collaboration, please reach out to aditya.singupati@gmail.com

---

Thank you for exploring the **AI Career Recommender** frontend project!
