import { useState } from 'react';
import axios from 'axios';
import { GiphyFetch } from '@giphy/js-fetch-api'

function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const gf = new GiphyFetch('PXIsdPEMsHY3Wu5VKF77YnAgXi7SOsD9')
  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add user message to state
    setMessages((messages) => [
      ...messages,
      { text: input, isUser: true },
    ]);

    try {
      let messageText = '';

      if (input.toLowerCase().includes('gif')) {
        // Search for a random GIF related to the user input
        const gifResponse = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=PXIsdPEMsHY3Wu5VKF77YnAgXi7SOsD9&q=${input.replace('gif', '').trim()}&limit=25&offset=0&rating=g&lang=en`);
        const gifData = gifResponse.data.data;
        const gifUrl = gifData[Math.floor(Math.random() * gifData.length)].images.original.url;
        // const { data } = await gf.search(input.replace('gif', '').trim(), { sort: "relevant", lang: "en" ,rating:"g"});
        // const gifUrl =
        //   data[Math.floor(Math.random() * data.length)].images.original.url;
    
        messageText = gifUrl;
      } else if (input.toLowerCase().includes('sticker')) {
        // Search for a random sticker related to the user input
        const stickerResponse = await axios.get(`https://api.giphy.com/v1/stickers/search?api_key=PXIsdPEMsHY3Wu5VKF77YnAgXi7SOsD9&q=${input.replace('sticker', '').trim()}&limit=1&offset=0&rating=g&lang=en`);
        console.log(stickerResponse)
        const stickerData = stickerResponse.data.data;
        const stickerUrl = stickerData[Math.floor(Math.random() * stickerData.length)].images.original.url;
        messageText = stickerUrl;
      }
       else if (input.toLowerCase().includes('emoji')) {
        
        const { data: emojis} = await gf.emoji(input.replace('emoji', '').trim(), { sort: "relevant", lang: "en" })
        const emojiUrl=emojis[Math.floor(Math.random() * emojis.length)].images.original.url;

        messageText = emojiUrl;
      }
       else {
        const gifResponse = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=PXIsdPEMsHY3Wu5VKF77YnAgXi7SOsD9&q=${input.replace('gif', '').trim()}&limit=1&offset=0&rating=g&lang=en`);
        const gifData = gifResponse.data.data;
        const gifUrl = gifData[Math.floor(Math.random() * gifData.length)].images.original.url;
    
        messageText = gifUrl;
      }

      // Add GIF/sticker/emoji to state
      setMessages((messages) => [
        ...messages,
        { text: messageText, isUser: false },
      ]);
    } catch (error) {
      console.error(error);
    }

    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-messages bg-no-repeat bg-cover">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-content">
              {message.isUser ? message.text : <img src={message.text} alt="meme" />}
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
