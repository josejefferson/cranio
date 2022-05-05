/* eslint-disable */
import React from 'react';
import { chakra, Heading, Stack, Text, LinkOverlay, Box, HStack } from '@chakra-ui/react';
// import { Stack } from 'react-bootstrap';

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
        boxShadow="none"
      >
        <HStack
          w='full'
          justifyContent='center'
          mb={22}
        >
          <Box
            as='article'
            bg='teal.100'
            color='teal.700'
            p={2}
            rounded='md'
            transition='transform 150ms ease-out'
            _hover={{ transform: 'scale(1.05, 1.05)' }}
          >
            <Stack direction={{ base: 'column', md: 'row' }} spacing={1}>
              <Text fontWeight='bold'>
                Pronto para um desafio? 🚀
              </Text>
              <Text>Aperte qualquer tecla</Text>
            </Stack>
          </Box>
        </HStack>
      </chakra.header>
    </React.Fragment >
  );
};
