import React, {useEffect, useState} from 'react';
import './style.css';
import Square from './Square'
import EnemyPostAttack from './Enemy';
import CalcWinner from './CalcWineer';
import { ChakraProvider, Box, VStack, Heading, Button, Grid, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
import { GameResult } from './types';
import LoadingIndicator from './LoadingIndicator';
import { motion } from 'framer-motion';

const MotionModalContent = motion(ModalContent);

type ResultModalProps = {
  isOpen: boolean;
  onClose: () => void;
  result: GameResult;
  isAlone: boolean;
}

const ResultModal: React.FC<ResultModalProps> = ({isOpen, onClose, result, isAlone}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay bg="rgba(0, 0, 0, 0.7)"/>
    <MotionModalContent initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      bg="rgba(255, 255, 255, 0.7)" // モーダル自体も透過
    >
      <ModalHeader>{result === 'draw' ? "It's a Draw!" : `Winner: ${result}`}</ModalHeader>
      <ModalBody>
      <Text>
          {isAlone
            ? (result === 'draw' 
                ? "AI match: draw..." 
                : (result === 'X' ? "AI match: You WIN!!!!!!" : "AI match: You LOSE..."))
            : (result === 'draw' 
                ? "Local match: draw..." 
                : `Local match: ${result} WIN!!!!!!`)}
        </Text>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </MotionModalContent>
  </Modal>
);

export default function Board(): JSX.Element {
  // 親コンポーネント側で子コンポーネントのデータを保持したほうがいいらしい。
  // = 親コンポーネントへのリフトアップ
  
  // いまxの番か？
  const [xIsNext, setIsNext] = useState<boolean>(true);
  //1 playerか？
  const [isAlone, setIsAlone] = useState<boolean>(true);
  // 各スクエアのoかxを保存してる -> ゲームの勝利判定に使える
  const [squares, setSquares] = useState<('X' | 'O' | null)[]>(Array(9).fill(null));
  // ゲームの結果
  const [result, setResult] = useState<GameResult>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isWeak, setIsWeak] = useState<boolean>(false); // 接待モード

  // 結果が決まったらリザルト画面表示
  useEffect(() => {
    console.log('result updated:', result);
    if (result !== null) {
      console.log('modal open');
      setIsModalOpen(true);
    };
  }, [result]);

  // squaresが更新されたら状況判断してaiが打つ
  useEffect(() => {
    const calcRes: GameResult = CalcWinner(squares);
    console.log('res:', calcRes);
    if (calcRes) {
      console.log('game finished', calcRes);
      setResult(calcRes);
    } else if (isAlone && !xIsNext) {
      aiPlayer();
    };
  }, [squares]);

  const closeModal = () => {
    setIsModalOpen(false);
    handleReset();
  };

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
    setResult(null);
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

  const handleWeak = () => {
    console.log('toggle ai diff');
    setIsWeak(!isWeak);
  }

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
  const aiPlayer = async () => {
    setLoading(true);
    console.log('ai plays')
    const pos: number | null = EnemyPostAttack(squares, isWeak);
    // タイムアウトで考えてる感をだす
    setTimeout(()=>{
      console.log('pos:',pos);
      const aiSquares = squares.slice();
      if (pos !== null) aiSquares[pos] = 'O';
      setSquares(aiSquares);
      setLoading(false);
      setIsNext(true);
    }, 500);
  }

  return (
    <ChakraProvider>
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" mx="auto" p={4}>
        <VStack spacing={4} maxW="100%" maxH="100%">
          <Heading as="h1" size="2xl">Tic-Tac-Toe</Heading>
          <Box>
            <Button onClick={handlePlayer} mr={4} width='200px' height='40px'>
              {isAlone ? 'Switch to Local Match' : 'Switch to AI Match'}
            </Button>
            {isAlone && <Button onClick={handleWeak} mr={4}>{isWeak ? 'Swich Hard' : 'Swich Easy'}</Button>}
            <Button onClick={handleReset}>Reset Game</Button>
          </Box>
          <Text fontSize="xl" fontWeight="bold">
            {isAlone ? `AI Match: ${xIsNext ? 'Your Turn' : 'AI Turn'}` : `Local Match: Next is ${xIsNext ? 'X' : 'O' }`}
          </Text>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            {squares.map((value, i) => (
              <Square key={i} value={value} onClick={() => handleSquareClick(i)} />
            ))}
          </Grid>
          {loading && <LoadingIndicator />}
        </VStack>
      </Box>
      <Box as="footer" py={4} textAlign="center" borderTop="1px" borderColor="gray.200">
        <Button
          as="a"
          href="https://github.com/kai336/react-tutorial"
          target="_blank"
          rel="noopener noreferrer"
          colorScheme="blue"
        >
          View Source Code
        </Button>
      </Box>
      <ResultModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        result={result}
        isAlone={isAlone}
      />
    </ChakraProvider>
  );
};