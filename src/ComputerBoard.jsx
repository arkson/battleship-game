import React from 'react';

const ComputerBoard = ({ board, boardSize, getCellState, handleCellClick }) => {
  return (
    <div className="board computer-board">
      {board.map((cell, index) => (
        <div
          key={index}
          className={`cell ${getCellState(board, Math.floor(index / boardSize), index % boardSize)}`}
          onClick={() => handleCellClick(index)}
        >
        </div>
      ))}
    </div>
  );
};

export default ComputerBoard;
