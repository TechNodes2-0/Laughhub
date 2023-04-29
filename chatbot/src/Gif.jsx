import { useState, useEffect } from "react";
import axios from "axios";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { GiphyContextProvider, GiphyContext } from "@giphy/react-components";
import { Grid } from "@giphy/react-components";
import alanBtn from "@alan-ai/alan-sdk-web";

// Set up GIPHY API key and instance
const gf = new GiphyFetch("PXIsdPEMsHY3Wu5VKF77YnAgXi7SOsD9");

function Chat() {
  const [input, setInput] = useState(""); 
  const [messages, setMessages] = useState([]);

  // Set up Alan AI
  useEffect(() => {
    const alan = alanBtn({
      key: "YOUR_ALAN_API_KEY",
      onCommand: (commandData) => {
        if (commandData.command === "storeInput") {
          setInput(commandData.data.input);
        }
      },
    });
    return () => {
      alan.destroy();
    };
  }, []);

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user message to state
    setMessages((messages) => [...messages, { text: input, isUser: true }]);

    // Search for a random meme related to the user input
    const { data } = await gf.search(input, { sort: "relevant", lang: "en" });
    const memeUrl =
      data[Math.floor(Math.random() * data.length)].images.original.url;

    // Add meme to state
    setMessages((messages) => [...messages, { text: memeUrl, isUser: false }]);

    setInput("");
  };

  return (
    <div className="">
      <div className="">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.isUser ? "user-message" : "bot-message"
            }`}
          >
            <div className="message-content">
              {message.isUser ? (
                message.text
              ) : (
                <img src={message.text} alt="meme" />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="m-10">
        <input
          type="text"
          value={input}
          placeholder="Enter Text"
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleSend();
            }
          }}
        />
        <button onClick={handleSend} className="chat-send-button orange">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
