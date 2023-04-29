import Gif from "./Gif";
import Toe from "./Toe";
import Home from "./pages/Home";
import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sticker from "./Sticker";
import Stone from "./componets/Stone";
import alanBtn from "@alan-ai/alan-sdk-web";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import Joke from "./voice/Joke";
import Question from "./Question";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/Main"
          element={
            <div className="App">
              {/* <Basic /> */}

              <Home />

              {/* <Sticker /> */}
              {/* <Game />}

     
 
      {/* <Gif />
      <Sticker /> */}
              {/* <Chatbot/> */}
            </div>
          }
        />

        <Route path="/" element={<Homepage />} />

        {/* <Route path="/stone" element={<Stone />} /> */}
      </Routes>
    </div>
  );
}

export default App;
