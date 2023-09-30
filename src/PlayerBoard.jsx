import React from 'react';
import { ROW_LETTERS, COLUMN_NUMBERS } from './constants';

const PlayerBoard = ({ board, boardSize, getCellState }) => {
  return (
    <>
      <h3>Your Board</h3>
      <div className="letters-row">
        {ROW_LETTERS.map((row, index) => (
          <p key={index}>{row}</p>
        ))}
      </div>
      <div className="player-numbers-column">
        {COLUMN_NUMBERS.map((col) => (
          <p key={col}>{col}</p>
        ))}
      </div>
      <div className="board player-board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${getCellState(board, Math.floor(index / boardSize), index % boardSize)}`}
          >
          </div>
        ))}
      </div>
    </>
  );
};

export default PlayerBoard;
