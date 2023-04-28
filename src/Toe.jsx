import React, { useState, useEffect } from "react";
import "./Toe.css";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [botPlayer, setBotPlayer] = useState("O");

  useEffect(() => {
    if (player === botPlayer) {
      const botMove = getBotMove();
      handleCellClick(botMove);
    }
  }, [player]);

  const checkWinner = (board) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (board.every((cell) => cell !== null)) {
      return "tie";
    }
    return null;
  };

  const handleCellClick = (index) => {
    if (board[index] || gameOver) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    const winner = checkWinner(newBoard);
    if (winner) {
      setWinner(winner);
      setGameOver(true);
    } else {
      setPlayer(player === "X" ? botPlayer : "X");
    }
  };

  const handleResetClick = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
    setGameOver(false);
    setWinner(null);
  };

  const getBotMove = () => {
    const availableCells = board.reduce((acc, curr, index) => {
      if (!curr) {
        acc.push(index);
      }
      return acc;
    }, []);
    return availableCells[Math.floor(Math.random() * availableCells.length)];
  };

  const renderCell = (index) => {
    return (
      <div
        className={`cell ${board[index]}`}
        onClick={() => handleCellClick(index)}
      >
        {board[index]}
      </div>
    );
  };

  const renderBoard = () => {
    return (
      <div className="board">
        {board.map((cell, index) => renderCell(index))}
      </div>
    );
  };

  const renderStatus = () => {
    if (gameOver) {
      if (winner === "tie") {
        return <p className="status">It's a tie!</p>;
      } else {
        return <p className="status">{winner} wins!</p>;
      }
    } else {
      if (player === botPlayer) {
        return <p className="status">Bot is thinking...</p>;
      } else {
        return <p className="status">{player}'s turn</p>;
      }
    }
  };

  const renderResetButton = () => {
    if (gameOver) {
      return <button onClick={handleResetClick}>Play Again</button>;
    }
  };

  const botPlay = () => {
    const emptyCells = board.reduce((acc, cell, index) => {
      if (!cell) acc.push(index);
      return acc;
    }, []);
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    handleCellClick(emptyCells[randomIndex]);
  };

  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      {renderStatus()}
      {renderBoard()}
      {renderResetButton()}
    </div>
  );
}

export default TicTacToe;
