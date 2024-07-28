import React, {useState} from 'react';
import './style.css';
import Square, {SquareProps} from './Square'

export default function Board(): JSX.Element {
  // 親コンポーネント側で子コンポーネントのデータを保持したほうがいいらしい。
  // = 親コンポーネントへのリフトアップ
  
  // いまxの番か？
  const [xIsNext, setIsNext] = useState(true);

  // 各スクエアのoかxを保存してる -> ゲームの勝利判定に使える
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsNext(true);
  }

  const handleClick = (i: number) => {
    if(squares[i] || calcWinner(squares)) return; // すでに印ある もしくは 決着ついてるなら終了
    const newSquares = squares.slice(); // 現在の状態をコピー
    newSquares[i] = xIsNext? 'X' : 'O'; // 条件式? 真の時の値 : 偽の時の値;
    setSquares(newSquares); // 更新
    setIsNext(!xIsNext);
  };

  const renderSquare = (i: number) => {
    // onClick=handleClick(i)とするとその時点で呼び出され、無限レンダリング列車編になってしまう
    // のでいったんアロー関数はさむ
    return <Square
      value={squares[i]}
      onClick={() => handleClick(i)}
    />;
  };

  // 勝利判定
  const winner: (string | null) = calcWinner(squares);
  console.log(winner);
  let status: string = winner? `Winner ${winner}` : `Next player: ${xIsNext? 'X' : 'O'}`;

  // 引き分け判定
  const isFull = (squares: Square[]): boolean => {
    return squares.every(square => square !== null);
  };
  if (!winner && isFull(squares)) {
    status = 'Draw';
  }

  return (
    <>
      <button onClick={handleReset}>Reset</button>
      <div className='status'>{status}</div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  );
};

function calcWinner(squares: (string | null)[]): (string | null) {
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
  for (let [a, b, c] of lines) {
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}