import { useState } from 'react';
import axios from 'axios';
// import the CSS file

function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add user message to state
    setMessages((messages) => [
      ...messages,
      { text: input, isUser: true },
    ]);

    const response = await axios.post('http://localhost:5000', {
      prompt: input,
    });

    const botMessage = response.data.bot;

    // Add bot response to state
    setMessages((messages) => [
      ...messages,
      { text: botMessage, isUser: false },
    ]);

    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-content">
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSend();
            }
          }}
        />
        <button onClick={handleSend} className="chat-send-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
