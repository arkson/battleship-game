import React from 'react';

const PlayerBoard = ({ board, boardSize, getCellState }) => {

  return (
    <div className="board player-board">
      {board.map((cell, index) => (
        <div
          key={index}
          className={`cell ${getCellState(board, Math.floor(index / boardSize), index % boardSize)}`}
        >
        </div>
      ))}
    </div>
  );
};

export default PlayerBoard;
