import React, { useState } from "react";
import { sendChatMessage } from "../api/api";
import ReactMarkdown from "react-markdown";

const CareerChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
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
    <div className="bg-white shadow-md rounded-xl p-6 mt-12 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">💬 AI Career Assistant</h2>

      <div className="h-96 overflow-y-auto border border-gray-300 p-4 mb-4 rounded space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg whitespace-pre-wrap text-sm ${
              msg.sender === "user"
                ? "bg-blue-100 text-right self-end ml-auto"
                : "bg-gray-200 text-left self-start mr-auto"
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
          <div className="italic text-gray-400 text-sm">Bot is typing...</div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border px-3 py-2 rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about skills, careers, switching fields..."
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CareerChatbot;
