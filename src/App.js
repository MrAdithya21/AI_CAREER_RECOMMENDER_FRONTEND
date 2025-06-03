import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingChatAssistant from "./components/FloatingChatAssistant";
import MainTabs from "./components/MainTabs";
import "./App.css";

function App() {
  return (
    <div className="relative flex flex-col min-h-screen text-white font-sans overflow-hidden">
      {/* 🧩 Pixelated Background Grid */}
      <div className="absolute inset-0 -z-30 bg-[url('https://www.transparenttextures.com/patterns/squares.png')] opacity-[0.03]" />

      {/* 💫 Animated Gradient Glow */}
      <div className="absolute inset-0 -z-40">
        <div className="w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-500/20 via-indigo-700/10 to-transparent blur-3xl" />
        <div className="absolute top-20 left-16 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl animate-ping-slow" />
        <div className="absolute bottom-20 right-12 w-60 h-60 bg-blue-500/20 rounded-full blur-2xl animate-ping-slow" />
      </div>

      {/* 🔝 Header with blur */}
      <Header />

      {/* 🔮 Main Content Area with full-page blur glass effect */}
      <main className="flex-grow flex flex-col items-center justify-start px-4 py-10 
        backdrop-blur-2xl bg-white/5 border-y border-white/10 
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] z-10">
        <MainTabs />
        <FloatingChatAssistant />
      </main>

      {/* 👣 Footer with consistent blur and blend */}
      <Footer />
    </div>
  );
}

export default App;
