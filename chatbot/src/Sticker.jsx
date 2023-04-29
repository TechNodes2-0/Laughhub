import { useState } from "react";
import axios from "axios";
import { GiphyFetch } from "@giphy/js-fetch-api";

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const gf = new GiphyFetch("PXIsdPEMsHY3Wu5VKF77YnAgXi7SOsD9");

  const handleShare = async (url) => {
    try {
      // Check if the navigator.share API is available
      if (window.navigator.share) {
        await window.navigator.share({
          title: "Share GIF",
          url: url,
        });
      } else {
        // If the API is not available, show a share menu
        const options = [
          {
            label: "Instagram",
            url: `https://www.instagram.com/create/collection/?source_url=${encodeURIComponent(
              url
            )}&media_type=gif`,
          },
          {
            label: "Facebook",
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              url
            )}`,
          },
          {
            label: "Twitter",
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              "Check out this GIF!"
            )}&url=${encodeURIComponent(url)}`,
          },
          {
            label: "Snapchat",
            url: `snapchat://share?url=${encodeURIComponent(url)}`,
          },
          {
            label: "Telegram",
            url: `https://telegram.me/share/url?url=${encodeURIComponent(url)}`,
          },
        ];

        const chosenOption = await showShareMenu(options);

        // Handle the share action for the chosen option
        if (chosenOption) {
          window.open(chosenOption.url, "_blank");
        }
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  // Helper function to show a share menu with custom options
  const showShareMenu = async (options) => {
    const buttons = options.map((option) => {
      return {
        label: option.label,
        onClick: () => {
          closeMenu(option);
        },
      };
    });

    const closeMenu = (option) => {
      menu.destroy();
      resolve(option);
    };

    const menu = new window.Menus({
      buttons: buttons,
    });

    const result = await new Promise((resolve) => {
      menu.showAtCursor();
      menu.on("cancel", () => {
        resolve(null);
      });
    });

    return result;
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user message to state
    setMessages((messages) => [...messages, { text: input, isUser: true }]);

    try {
      let messageText = "";

      if (input.toLowerCase().includes("gif")) {
        // Search for a random GIF related to the user input
        const gifResponse = await axios.get(
          `https://api.giphy.com/v1/gifs/search?api_key=PXIsdPEMsHY3Wu5VKF77YnAgXi7SOsD9&q=${input
            .replace("gif", "")
            .trim()}&limit=25&offset=0&rating=g&lang=en`
        );
        const gifData = gifResponse.data.data;
        const gifUrl =
          gifData[Math.floor(Math.random() * gifData.length)].images.original
            .url;
        // const { data } = await gf.search(input.replace('gif', '').trim(), { sort: "relevant", lang: "en" ,rating:"g"});
        // const gifUrl =
        //   data[Math.floor(Math.random() * data.length)].images.original.url;

        messageText = gifUrl;
      } else if (input.toLowerCase().includes("sticker")) {
        // Search for a random sticker related to the user input
        const stickerResponse = await axios.get(
          `https://api.giphy.com/v1/stickers/search?api_key=PXIsdPEMsHY3Wu5VKF77YnAgXi7SOsD9&q=${input
            .replace("sticker", "")
            .trim()}&limit=1&offset=0&rating=g&lang=en`
        );
        console.log(stickerResponse);
        const stickerData = stickerResponse.data.data;
        const stickerUrl =
          stickerData[Math.floor(Math.random() * stickerData.length)].images
            .original.url;
        messageText = stickerUrl;
      } else if (input.toLowerCase().includes("emoji")) {
        const { data: emojis } = await gf.emoji(
          input.replace("emoji", "").trim(),
          { sort: "relevant", lang: "en" }
        );
        const emojiUrl =
          emojis[Math.floor(Math.random() * emojis.length)].images.original.url;

        messageText = emojiUrl;
      } else {
        const gifResponse = await axios.get(
          `https://api.giphy.com/v1/gifs/search?api_key=PXIsdPEMsHY3Wu5VKF77YnAgXi7SOsD9&q=${input
            .replace("gif", "")
            .trim()}&limit=1&offset=0&rating=g&lang=en`
        );
        const gifData = gifResponse.data.data;
        const gifUrl =
          gifData[Math.floor(Math.random() * gifData.length)].images.original
            .url;

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

    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-messages bg-no-repeat bg-cover">
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
                <div className="gif-container relative">
                  <img src={message.text} alt="meme" />
                  <button
                    className="absolute top-2 right-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-200 ease-in-out h-[60px] w-[70px]"
                    onClick={() => handleShare(message.text)}
                  >
                    <img
                      src={
                        "https://cdn-icons-png.flaticon.com/512/2099/2099085.png"
                      }
                      alt="Share"
                      className="h-full w-full object-contain"
                    />
                    <i className="fas fa-share-alt text-gray-500"></i>
                  </button>
                </div>
              )}
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
            if (event.key === "Enter") {
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
