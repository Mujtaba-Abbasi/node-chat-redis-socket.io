"use client";
import React, { useState } from "react";
import { useSocket } from "./hooks";

const Chat = () => {
  const { sendMessage, messages } = useSocket();
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  console.log("The messages =>", messages);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg: any, index: number) => (
          <div key={index} className="chat-message">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button type="submit" className="chat-send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
