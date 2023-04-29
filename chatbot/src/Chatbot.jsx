import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";
import "animate.css";

function ChatBot() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!inputValue) return;
    const message = { text: inputValue };
    setMessages((messages) => [...messages, message]);
    setInputValue("");

    if (inputValue.includes("img")) {
      // If the input contains an image file name, make a call to localhost:5000

      try {
        const response = await axios.post("https://codecompanionvinayak.onrender.com/img", {
          prompt: inputValue,
        });

        if (response.data.botimage) {
          const botMessage = { image: response.data.botimage, isBot: true };
          setMessages((messages) => [...messages, botMessage]);
        } else {
          const botMessage = { text: response.data.bot, isBot: true };
          setMessages((messages) => [...messages, botMessage]);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // If the input does not contain an image file name, make a call to localhost:5002
      try {
        const response = await axios.post(
          "https://codecompanionvinayak.onrender.com",
          {
            prompt: inputValue,
          }
        );

        if (response.data.bot) {
          const botMessage = { text: response.data.bot, isBot: true };
          setMessages((messages) => [...messages, botMessage]);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chatbot</h2>
      </div>
      <div className="chat-messages" id="uniq">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.isBot
                ? "bot-message animate__animated animate__fadeInLeft"
                : "user-message animate__animated animate__fadeInRight"
            }
          >
            {message.image ? (
              <img src={message.image} alt="DALL-E2 generated image" />
            ) : (
              message.text
            )}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
