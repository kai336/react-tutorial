import React from 'react';
import { Box, Spinner, Text } from '@chakra-ui/react';


const LoadingIndicator: React.FC = () => (
  <Box
    position="fixed"
    top="0"
    left="0"
    width="100vw"
    height="100vh"
    backgroundColor="rgba(0, 0, 0, 0.1)" // 半透明の黒
    display="flex"
    alignItems="center"
    justifyContent="center"
    zIndex="1000" // 他のコンテンツの上に表示
    textAlign='center'
    flexDirection='column'
  >
    <Spinner size="xl" color="blue.500" />
    <Text color='while' fontSize='lg'>AI is thinking...</Text>
  </Box>
);

export default LoadingIndicator;
