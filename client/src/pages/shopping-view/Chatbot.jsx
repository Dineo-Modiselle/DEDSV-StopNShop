import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: "user" },
    ]);

    try {
      const response = await axios.post("https://dedsv-stopnshop-backend.onrender.com/api/chatbot", {
        message: input,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.reply, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4">
      {isOpen && (
        <div className="w-96 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 bg-[#6C6A61] text-white">
            <h2 className="text-lg font-bold">The DEDSV Chatbot</h2>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-[#181A1B] text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C6A61]"
            />
            <button
              onClick={handleSendMessage}
              className="mt-2 w-full px-4 py-2 bg-[#6C6A61] text-white rounded-lg hover:bg-[#6C6A61] focus:outline-none focus:ring-2 focus:ring-[#6C6A61]"
            >
              Send
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mt-4 px-4 py-2 bg-[#6C6A61] text-white rounded-lg hover:bg-[#6C6A61] focus:outline-none focus:ring-2 focus:ring-[#45423D]"
      >
        {isOpen ? "Close Chat" : "Open Chat"}
      </button>
    </div>
  );
};

export default Chatbot;
