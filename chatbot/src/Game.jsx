import React, { useState, useEffect } from "react";
import "./Game.css";

const emojis = ["😂", "😍", "🤔", "🙄", "👀", "🤣", "🤯", "🥳", "😜", "🤡"];

function Game() {
  const [sequence, setSequence] = useState([]);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    startRound();
  }, []);

  const startRound = () => {
    const newSequence = [...sequence];
    newSequence.push(getRandomEmoji());
    setSequence(newSequence);
    setRound(round + 1);
    playSequence(newSequence);
  };

  const getRandomEmoji = () => {
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const playSequence = (sequence) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i >= sequence.length) {
        clearInterval(interval);
        return;
      }
      const button = document.getElementById(sequence[i]);
      if (button) {
        button.classList.add("highlight");
        setTimeout(() => {
          button.classList.remove("highlight");
        }, 500);
      }
      i++;
    }, 1000);
  };

  const handleButtonClick = (emoji) => {
    const expectedEmoji = sequence[0];
    if (emoji === expectedEmoji) {
      const newSequence = [...sequence];
      newSequence.shift();
      setSequence(newSequence);
      setScore(score + 1);
      if (newSequence.length === 0) {
        startRound();
      }
    } else {
      setGameOver(true);
    }
  };

  return (
    <div className="game-container">
      <h1 className="text-4xl font-bold mb-4">Memory Game</h1>
      <p className="text-lg mb-2">Round: {round}</p>
      <p className="text-lg mb-4">Score: {score}</p>
      <div className="flex flex-wrap justify-center">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            id={emoji}
            className="emoji-button p-4 m-2 text-4xl rounded-lg bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={() => handleButtonClick(emoji)}
            disabled={gameOver}
          >
            {emoji}
          </button>
        ))}
      </div>
      {gameOver && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="bg-gray-700 opacity-80 absolute inset-0"></div>
          <div className="bg-white p-8 rounded-lg z-20">
            <h2 className="text-2xl font-bold mb-2">Game Over</h2>
            <p className="text-lg mb-4">Your final score was {score}</p>
            <button
              className="px-4 py-2 text-lg font-bold rounded-lg bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={() => window.location.reload()}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
