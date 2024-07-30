import React, {useEffect, useState} from 'react';
import './style.css';
import Square, {SquareProps} from './Square'
import EnemyPostAttack from './Enemy';
import CalcWinner from './CalcWineer';

export default function Board(): JSX.Element {
  // 親コンポーネント側で子コンポーネントのデータを保持したほうがいいらしい。
  // = 親コンポーネントへのリフトアップ
  
  // いまxの番か？
  const [xIsNext, setIsNext] = useState(true);

  //1 playerか？
  const [isAlone, setIsAlone] = useState(false);

  // 各スクエアのoかxを保存してる -> ゲームの勝利判定に使える
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));

  // squaresが更新されたら状況判断してaiが打つ
  useEffect(() => {
    if (isAlone && !xIsNext && !CalcWinner(squares)) {
      aiPlayer();
    }
  }, [squares]);

  const handlePlayer = () => {
    setIsAlone(!isAlone);
    console.log(isAlone);
    console.log(xIsNext, isAlone, CalcWinner(squares));
    if (!xIsNext && isAlone && !CalcWinner(squares)){
      console.log('ai mode my turn');
      aiPlayer(); // 切り替え時にaiの番なら打つ
    };
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsNext(true);
  };

  const handleSquareClick = (i: number) => {
    if (!isAlone) {
      console.log('multi player')
      humanPlayer(i);
    }
    else if (xIsNext) {
      console.log('ai mode your turn')
      humanPlayer(i);
    }
  };

  // 指定したposにXかOを置く タイムアウトなし
  const humanPlayer = (pos: number) => {
    if(squares[pos] || CalcWinner(squares)) return; // すでに印ある もしくは 決着ついてるなら終了
    const newSquares = squares.slice(); // 現在の状態をコピー
    newSquares[pos] = xIsNext? 'X' : 'O'; // 条件式? 真の時の値 : 偽の時の値;
    console.log(newSquares);
    setSquares(newSquares); // 更新
    setIsNext(!xIsNext);
    //if(isAlone) aiPlayer(); // ここでaiを起動するとsquaresが更新される前の状態で実行される
  }

  // 指定したposにOを置く タイムアウトあり
  const aiPlayer = () => {
    console.log('ai plays')
    const pos: number = EnemyPostAttack(squares);
    if (pos === -1) return;
    // タイムアウトで考えてる感をだす
    setTimeout(()=>{
      console.log(pos);
      const aiSquares = squares.slice();
      aiSquares[pos] = 'O';
      setSquares(aiSquares);
      setIsNext(true);
    }, 1000);
  }

  const renderSquare = (i: number) => {
    // onClick=handleClick(i)とするとその時点で呼び出され、無限レンダリング列車編になってしまう
    // のでいったんアロー関数はさむ
    return <Square
      value={squares[i]}
      onClick={() => handleSquareClick(i)}
    />;
  };

  // 勝利判定
  const winner: (string | null) = CalcWinner(squares);
  let status: string = winner? `Winner ${winner}` : `Next player: ${xIsNext? 'X' : 'O'}`;

  // 引き分け判定
  const isFull = (squares: (string | null)[]): boolean => {
    return squares.every(square => square !== null);
  };
  if (!winner && isFull(squares)) {
    status = 'Draw';
  }

  return (
    <>
      <button onClick={handlePlayer}>Toggle mode</button>
      <button onClick={handleReset}>Reset</button>
      <div className='status'>{!isAlone && status}{isAlone && 'ai mode'}</div>
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