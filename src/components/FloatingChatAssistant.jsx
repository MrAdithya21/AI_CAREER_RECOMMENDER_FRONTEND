import React, { useState } from "react";
import { sendChatMessage } from "../api/api";
import ReactMarkdown from "react-markdown";
import { FaCommentDots, FaTimes } from "react-icons/fa";

const funnyLoaders = [
  "Talking to the AI elves… ",
  "Cooking up a smart reply ",
  "Calibrating career wisdom ",
  "Unleashing GPT squirrels ",
  "Hang tight... checking the universe "
];

const FloatingChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaderMsg, setLoaderMsg] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const fun = funnyLoaders[Math.floor(Math.random() * funnyLoaders.length)];
    setLoaderMsg(fun);
    setLoading(true);

    try {
      const reply = await sendChatMessage(input);
      const botMsg = { sender: "bot", text: reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, I couldn't respond. Try again later." },
      ]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-24 right-6 z-50 flex items-center gap-2">
        {!isOpen && (
          <div className="bg-black/80 text-white text-xs font-medium px-3 py-1 rounded-lg shadow-lg animate-fade-in-right">
            💬 Ask Career Assistant
          </div>
        )}
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:scale-105 transition-all"
          title="Open Career Assistant"
        >
          <FaCommentDots className="text-xl" />
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 z-50 w-80 md:w-96 bg-white text-black rounded-xl shadow-2xl border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-t-xl">
            <h3 className="font-semibold">🎓 Career Assistant</h3>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-100 text-right ml-auto"
                    : "bg-gray-100 text-left mr-auto"
                }`}
              >
                {msg.sender === "bot" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            ))}
            {loading && (
              <div className="italic text-xs text-gray-500">
                {loaderMsg}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex p-3 border-t border-gray-200 gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border px-3 py-1 rounded-md text-sm"
              placeholder="Ask anything about careers..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatAssistant;
