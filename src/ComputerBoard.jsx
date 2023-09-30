import React from 'react';
import { ROW_LETTERS, COLUMN_NUMBERS } from './constants';

const ComputerBoard = ({ board, boardSize, getCellState, handleCellClick }) => {
  return (
    <>
      <h3>Enemy Board</h3>
      <div className="letters-row">
        {ROW_LETTERS.map((row, index) => (
          <p key={index}>{row}</p>
        ))}
      </div>
      <div className="computer-numbers-column">
        {COLUMN_NUMBERS.map((col) => (
          <p key={col}>{col}</p>
        ))}
      </div>
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
    </>
  );
};

export default ComputerBoard;
