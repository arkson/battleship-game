import {useEffect, useState} from 'react'
import PlayerBoard from './PlayerBoard';
import ComputerBoard from './ComputerBoard.jsx';
import './App.css'

const BoardSize = 10;

function App() {
  const [playerBoard, setPlayerBoard] = useState(Array(BoardSize * BoardSize).fill(0));
  const [computerBoard, setComputerBoard] = useState(Array(BoardSize * BoardSize).fill(0));
  const [message, setMessage] = useState("Fire a board position of your choice! 🚀");

  const placePlayerShips = () => {
    // Define the layout data
    const layoutData = {
      "shipTypes": {
        "carrier": { "size": 5, "count": 1 },
        "battleship": { "size": 4, "count": 1 },
        "cruiser": { "size": 3, "count": 1 },
        "destroyer": { "size": 2, "count": 1 },
        "submarine": { "size": 3, "count": 1 }
      },
      "layout": [
        { "ship": "carrier", "positions": [[2, 9], [3, 9], [4, 9], [5, 9], [6, 9]] },
        { "ship": "battleship", "positions": [[5, 2], [5, 3], [5, 4], [5, 5]] },
        { "ship": "cruiser", "positions": [[8, 1], [8, 2], [8, 3]] },
        { "ship": "submarine", "positions": [[3, 0], [3, 1], [3, 2]] },
        { "ship": "destroyer", "positions": [[0, 0], [1, 0]] }
      ]
    };

    // Iterate through the layout data and place ships on the player's board
    layoutData.layout.forEach((shipData) => {
      const shipType = shipData.ship;
      const positions = shipData.positions;

      positions.forEach((position) => {
        const [x, y] = position;
        const index = x * BoardSize + y;
        setPlayerBoard((prevPlayerBoard) => {
          const newBoard = [...prevPlayerBoard];
          newBoard[index] = 1; // Set cell as a ship cell
          return newBoard;
        });
      });
    });
  };

  const getCellState = (board, x, y) => {
    const index = x * BoardSize + y;
    if (board[index] === 1) {
      return 'ship';
    } else if (board[index] === -1) {
      return 'miss';
    } else if (board[index] === 2) {
      return 'hit';
    }
    return '';
  };

  const placeShipsRandomly = (board) => {
    const shipOptions = [5, 4, 3, 3, 2];
    shipOptions.forEach((shipType) => {
      while (true) {
        const x = Math.floor(Math.random() * BoardSize);
        const y = Math.floor(Math.random() * BoardSize);
        const isVertical = Math.random() < 0.5; // Randomly choose orientation

        if (canPlaceShip(board, x, y, shipType.length, isVertical)) {
          placeShip(board, x, y, shipType.length, isVertical);
          break;
        }
      }
    });
  };

// Function to check if a computer ship can be placed without overlapping
  const canPlaceShip = (board, x, y, shipLength, isVertical) => {
    if (isVertical) {
      if (x + shipLength > BoardSize) {
        return false;
      }
    } else {
      if (y + shipLength > BoardSize) {
        return false;
      }
    }

    for (let i = 0; i < shipLength; i++) {
      const index = isVertical ? (x + i) * BoardSize + y : x * BoardSize + (y + i);
      if (board[index]) {
        return false;
      }
    }

    return true;
  };

// Function to place a computer ship on the board
  const placeShip = (board, x, y, shipLength, isVertical) => {
    for (let i = 0; i < shipLength; i++) {
      const index = isVertical ? (x + i) * BoardSize + y : x * BoardSize + (y + i);
      board[index] = 1;
    }
  };

  useEffect(() => {
    placePlayerShips();

    // Place computer ships on the computer's board
    const newComputerBoard = [...computerBoard];
    placeShipsRandomly(newComputerBoard);
    setComputerBoard(newComputerBoard);
  }, []);

  return (
    <div className="App">
      <h1>Battleship Game</h1>
      <div className="game-container">
        <PlayerBoard
          board={playerBoard}
          boardSize={BoardSize}
          getCellState={getCellState}
        />
        <div className="separator"></div>
        <ComputerBoard
          board={computerBoard}
          boardSize={BoardSize}
          getCellState={getCellState}
        />
      </div>
      <div className="message">{message}</div>
    </div>
  )
}

export default App
