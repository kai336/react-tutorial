import './style.css';
import { ChakraProvider, Box, VStack, Heading, Button, Grid, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Square = ({ value, onClick }) => {
  const bg = useColorModeValue('gray.100', 'gray.700');
  const color = useColorModeValue('black', 'white');

  return (
    <MotionBox
      as="button"
      height="100px"
      width="100px"
      bg={bg}
      color={color}
      fontSize="4xl"
      fontWeight="bold"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {value}
    </MotionBox>
  );
};

// export type SquareProps = {
//     value: string | null;
//     onClick: () => void;
// }

// function Square({value, onClick}: SquareProps): JSX.Element {
//     return (
//         <button className='square' onClick={onClick}>
//             {value}
//         </button>
//     );
// };

export default Square;