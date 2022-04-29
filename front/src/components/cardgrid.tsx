import React from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { GrUpdate } from 'react-icons/gr';
import { AiFillSafetyCertificate } from 'react-icons/ai';
import {
  Container, chakra, Grid, Box, Flex, Heading, Text,
} from '@chakra-ui/react';
export default function CardGrid() {
  return (
    <Box
      as="section"
    >
      <Container py="120px" maxW="1280px" pt="0">
        <Box maxW="760px" mx="auto" textAlign="center" mb="56px">
          <chakra.h2 textStyle="heading" mb="5" fontSize={{ base: '2rem', md: '2.5rem' }}>
            O que mais nós oferecemos?
          </chakra.h2>
        </Box>
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
          gap={10}
          px={{ md: 12 }}
        >
          <Help />
          <Safety />
          <Update />
        </Grid>
      </Container>
    </Box>
  );
}

const Help = () => (
  <Box
    rounded="12px"
    shadow="base"
    p="40px"
    background="gray.300"
  >
    <Flex
      rounded="full"
      w="12"
      h="12"
      bg="teal.500"
      align="center"
      justify="center"
    >
      <FiHelpCircle />
    </Flex>
    <Heading as="h3" size="md" fontWeight="semibold" mt="1em" mb="0.5em">
      Suporte de qualidade
    </Heading>
    <Text fontSize="lg" opacity={0.7}>
      Contamos com atendimento ao usuário de sábado ao domingo
      das 7:00 às 21:00; também temos o suporte de terça à quinta...
    </Text>
  </Box>
);

const Safety = () => (
  <Box
    rounded="12px"
    shadow="base"
    p="40px"
    background="gray.300"
  >
    <Flex
      rounded="full"
      w="12"
      h="12"
      bg="teal.500"
      align="center"
      justify="center"
    >
      <AiFillSafetyCertificate />

    </Flex>
    <Heading as="h3" size="md" fontWeight="semibold" mt="1em" mb="0.5em">
      Segurança
    </Heading>
    <Text fontSize="lg" opacity={0.7}>
      Tenha as melhores práticas de segurança e com visibilidade e monitoria de todas as operações..
    </Text>
  </Box>
);

const Update = () => (
  <Box
    rounded="12px"
    shadow="base"
    p="40px"
    background="gray.300"
  >
    <Flex
      rounded="full"
      w="12"
      h="12"
      bg="teal.500"
      align="center"
      justify="center"
    >
      <GrUpdate />
    </Flex>
    <Heading as="h3" size="md" fontWeight="semibold" mt="1em" mb="0.5em">
      Atualização dos conteúdos
    </Heading>
    <Text fontSize="lg" opacity={0.7}>
      Estaremos atualizando novos conteúdo e um catálogo completo,
      atualizado com as principais novidades..
    </Text>
  </Box>
);