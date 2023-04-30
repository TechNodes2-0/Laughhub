import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";
import "animate.css";
import { doc, setDoc } from "firebase/firestore"; 

// Add a new document in collection "cities"

// import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging,getToken } from "firebase/messaging";

// Initialize Firebase
const App=initializeApp({
  apiKey: "AIzaSyDqOmdqmsGNhDOrjy_xEIjZ-JnKq7gMBlE",
  authDomain: "my-noob-7739a.firebaseapp.com",
  databaseURL: "https://my-noob-7739a-default-rtdb.firebaseio.com",
  projectId: "my-noob-7739a",
  storageBucket: "my-noob-7739a.appspot.com",
  messagingSenderId: "829264938526",
  appId: "1:829264938526:web:86fa140189c90fcfcbd00f",
  measurementId: "G-SLHR6BV766"
  // Your Firebase configuration goes here
});

const db =getFirestore(App);
const messaging = getMessaging(App);

function ChatBot() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  // Save a message to Google Cloud Firestore
  const saveMessage = async (message) => {
    console.log(message);
    try {

      // await setDoc(doc(db, "bonam", "info"), {
     
      //   answer:message
      // });
      // const docRef = await db.collection("messages").add(message);
      // console.log("Message saved with ID: ", docRef.id);
    } catch (error) {
      console.error(error);
    }
  };

  // Send a push notification using Firebase Cloud Messaging (FCM)
  
    
      //  const registrationToken = await getToken();
      // console.log("Registration token: ", registrationToken);

    //   const payload = {
    //     notification: {
    //       title: "New Chatbot Message",
    //       body: message.text,
    //       click_action: window.location.href,
    //       icon: "/favicon.ico",
    //     },
    //   };

    //   await messaging.sendToDevice(registrationToken, payload);
    //   console.log("Push notification sent");
    // } catch (error) {
    //   console.error(error);
    // }
  

  const sendMessage = async () => {
    if (!inputValue) return;
    const message = { text: inputValue };
    setMessages((messages) => [...messages, message]);
    setInputValue("");

    // Save the message to Google Cloud Firestore
    await saveMessage(message);
   
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
          console.log("call");
          // Send a push notification for the bot's response

          console.log(wait);
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
          const wait= await setDoc(doc(db, "messages", "Chats"), {
            prompt:inputValue,
            response:`${botMessage.text}`
          });
         
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
        placeholder="You can ask Anything useful Or You can give Image prompt with img"
          
        />
        <button className="" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
export  const requestForToken = () => {
  getToken(messaging, { vapidKey: "BOTCBlAA7vkwGn93Oi17NSRjCGkjkzeDkHYnyqb6xuU6aIIiFA25bI8HCYs7iRJAv7o7YvxO0Q2rUYFj6ARIpSo"})
   .then((currentToken) => {
     if (currentToken) {
       console.log('current token for client: ', currentToken);
       // Perform any other neccessary action with the token
     } else {
       // Show permission request UI
       console.log('No registration token available. Request permission to generate one.');
     }
   })
   .catch((err) => {
     console.log('An error occurred while retrieving token. ', err);
   });
};