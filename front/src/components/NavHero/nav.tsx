/* eslint-disable */
import React from 'react';
import { chakra, Heading, Center, Alert } from '@chakra-ui/react';

export default function NavHero() {
  return (
    <React.Fragment>
      <chakra.header
        borderTop="10px solid #8257e5"
        shadow="md"
        transition="all 0.5s ease-in-out"
        pos="fixed"
        top="0"
        zIndex="100"
        w="full"
        mb={20}
        boxShadow="none"
      >
        <Center>
          <Alert status='error' justifyContent={'center'}>
            <Heading fontSize={'3xl'}>Pressione qualquer tecla para jogar!</Heading>
          </Alert>
        </Center>
      </chakra.header>
    </React.Fragment >
  );
};
