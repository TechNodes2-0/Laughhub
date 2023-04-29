import React, { useState, useEffect, useRef } from "react";
import Sticker from "../Sticker";
import Game from "../Game";
import ChatBot from "../Chatbot";
import Toe from "../Toe";
import ReactCanvasConfetti from "react-canvas-confetti";
import Stone from "../componets/Stone";
import Question from "../Question";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useAuth0 } from "@auth0/auth0-react";
import Notification from "../Notification";
function App() {
  const [greetingWasSaid, setgreetingWasSaid] = useState(false);
  const alanBtnRef = useRef({}).current;
  useEffect(() => {
    var alanBtnInstance = alanBtn({
      key: "08a166d1453c12e6bdd4654d5969a9712e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "go:back") {
          // handle "go:back" command here
        }
      },
      onButtonState: async function (status) {
        if (status === "ONLINE") {
          if (!greetingWasSaid) {
            await alanBtnInstance.activate();
            if(user)
            {
              alanBtnInstance.playText(
                ` Hello Namaste ${user.name} ?`
              );
              setgreetingWasSaid(true);
            }
            else
            {
              alanBtnInstance.playText(
                ` Hello Namaste Sir ?`
              );
              setgreetingWasSaid(true);
            }
           
          }
        }
      },
      rootEl: document.getElementById("alan-btn"),
    });
  }, []);
  const [mode, setMode] = useState("chat"); // initial mode is chat
  const [gameMode, setGameMode] = useState("game1"); // initial game mode is game1
  const [showMoreGames, setShowMoreGames] = useState(false); // default is false, not showing more games

  // function to handle mode change and trigger confetti animation
  const handleModeChange = (newMode) => {
    // trigger confetti animation
    fire();

    setMode(newMode);
  };

  // function to handle game mode change
  const handleGameModeChange = (newGameMode) => {
    setGameMode(newGameMode);
  };

  // function to handle hover on game button
  const handleGameButtonHover = () => {
    setShowMoreGames(true);
  };

  // function to handle leaving the game button hover
  const handleGameButtonLeave = () => {
    setShowMoreGames(false);
  };

  // determine the background color based on the current mode
  let bgColor = "";
  switch (mode) {
    case "chat":
      bgColor = "bg-pink-300";
      break;
    case "memes":
      bgColor = "bg-purple-300";
      break;
    case "game":
    case "stone":
      bgColor = "bg-blue-300";
      break;
    default:
      bgColor = "bg-gray-100";
  }

  const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  };

  let animationInstance = null;

  const makeShot = (particleRatio, opts) => {
    animationInstance &&
      animationInstance({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  };

  const fire = () => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const getInstance = (instance) => {
    animationInstance = instance;
  };

  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${bgColor} pt-10 pb-20`}
    >
      <div className="flex mb-8">
        {/* Buttons to switch between modes */}
        <button
          className={`mx-2 py-2 px-4 rounded ${
            mode === "chat"
              ? "bg-pink-500 text-white"
              : "bg-white text-pink-500"
          }`}
          onClick={() => handleModeChange("chat")}
        >
          Chat{" "}
          <span role="img" aria-label="chat">
            💬
          </span>
        </button>
        <button
          className={`mx-2 py-2 px-4 rounded ${
            mode === "memes"
              ? "bg-purple-500 text-white"
              : "bg-white text-purple-500"
          }`}
          onClick={() => handleModeChange("memes")}
        >
          Memes{" "}
          <span role="img" aria-label="memes">
            🤣
          </span>
        </button>
        <button
          className={`mx-2 py-2 px-4 rounded ${
            mode === "game"
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          }`}
          onClick={() => handleModeChange("game")}
        >
          Game{" "}
          <span role="img" aria-label="game">
            🎮
          </span>
        </button>
        <button
          className={`mx-2 py-2 px-4 rounded ${
            mode === "stone"
              ? "bg-green-500 text-white"
              : "bg-white text-green-500"
          }`}
          onClick={() => handleModeChange("stone")}
        >
          Stone{" "}
          <span role="img" aria-label="stone">
            ✌
          </span>
        </button>
      </div>
      {/* Render different components based on the current mode */}
      {mode === "chat" && <><ChatBot /><Notification/></>}
      {mode === "memes" && <Sticker />}
      {mode === "game" && (
        <div className="flex flex-col items-center justify-center">
          {/* Game buttons */}
          <div className="flex mb-8">
            <button
              className={`mx-2 py-2 px-4 rounded ${
                gameMode === "game1"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
              onClick={() => handleGameModeChange("game1")}
            >
              Emoji Game
            </button>
            <button
              className={`mx-2 py-2 px-4 rounded ${
                gameMode === "game2"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
              onClick={() => {
                console.log("Button2 clicked");
                handleGameModeChange("game2");
              }}
            >
              Tic Tac Toe
            </button>
            <button
              className={`mx-2 py-2 px-4 rounded ${
                gameMode === "game3"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
              onClick={() => {
                console.log("Button clicked");
                handleGameModeChange("game3");
              }}
            >
              Trival Game
            </button>
          </div>

          {/* Render different games based on the current game mode */}
          {gameMode === "game1" && <Game />}
          {gameMode === "game2" && <Toe />}
          {gameMode === "game3" && (
            <>
              <Question />
            </>
          )}
        </div>
      )}
      {mode === "stone" && <Stone />}
      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={canvasStyles}
        particleCount={1000}
        spread={360}
        origin={{ y: 0.6 }}
        colors={["#ff0000", "#00ff00", "#0000ff"]}
      />
    </div>
  );
}

export default App;
