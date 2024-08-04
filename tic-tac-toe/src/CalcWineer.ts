import { GameResult } from "./types";

const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
export default function calcWinner(squares: GameResult[]): GameResult {

    for (let [a, b, c] of lines) {
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every(square => square !== null)) {
      return 'draw';
    };
    return null;
  }