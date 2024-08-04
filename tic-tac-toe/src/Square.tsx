import './style.css';
import { useColorModeValue, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

const MotionBox = motion(Box);

type Squareprops = {
    value: 'X' | 'O' | null;
    onClick: () => void;
};

const Square: React.FC<Squareprops> = ({value, onClick}) => {
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

export default Square;