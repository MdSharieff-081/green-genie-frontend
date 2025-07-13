import React, { useState, useRef, useEffect } from "react";
import { Trash2, Send } from "lucide-react";
import { postData } from "../services/api";
import ChatMessage from "../components/ChatMessage";
import Suggestions from "../components/Suggestions";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! I’m Green Genie, your renewable energy assistant. Ask me anything!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await postData(inputMessage);
      const botResponse = {
        id: messages.length + 2,
        type: "bot",
        content: response.answer || "Sorry, I didn’t get that.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          type: "bot",
          content: "Oops! Something went wrong.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: "bot",
        content: "Hello! I’m Green Genie, your renewable energy assistant. Ask me anything!",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div>
          <h1>Renewable Energy Chat Assistant</h1>
          <p>Get instant answers about clean energy solutions</p>
        </div>
        <button onClick={clearChat} className="btn-clear">
          <Trash2 size={16} />
          <span>Clear Chat</span>
        </button>
      </div>

      <div className="chat-area">
        <div className="messages-container">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isTyping && (
            <div className="message bot typing-indicator">
              <div className="typing-dots">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <div className="input-container">
            <textarea
              className="chat-input"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about renewable energy..."
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="btn-send"
            >
              <Send size={16} />
            </button>
          </div>
        </div>

        <Suggestions onSelect={setInputMessage} />
      </div>
    </div>
  );
};

export default ChatbotPage;