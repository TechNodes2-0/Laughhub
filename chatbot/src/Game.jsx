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
      <h1 className="game-title">Memory Game</h1>
      <p className="game-text">Round: {round}</p>
      <p className="game-text">Score: {score}</p>
      <div className="button-container">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            id={emoji}
            className="emoji-button"
            onClick={() => handleButtonClick(emoji)}
            disabled={gameOver}
          >
            {emoji}
          </button>
        ))}
      </div>
      {gameOver && (
        <div className="game-over">
          <h2 className="game-over-title">Game Over</h2>
          <p className="game-over-text">Your final score was {score}</p>
          <button
            className="play-again-button"
            onClick={() => window.location.reload()}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default Game;
