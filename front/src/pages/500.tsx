import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router';
import {
  VStack, Heading, Text, Center,
  Img as Image, Box, Flex
} from '@chakra-ui/react'
import { MotionBox } from '@/components/index'

const Page500: NextPage = () => {
  const router = useRouter()
  React.useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }, [])
  return (
    <React.Fragment>
      <Head>
        <link rel="icon" href="/img/logo.png" />
        <title>404 | Tudo na vida tem um limite...</title>
      </Head>
      <Flex color='white' flexDirection="column" minHeight="100vh" width="full" align="center" justifyContent="center">
        <Box
          px={4}
          width="94%"
          maxWidth="900px"
          borderRadius="sm"
          textAlign="center"
          mt={10}
        >
          <Box p={4}>
            <MotionBox
              width={["100%", "70%", "60%", "60%"]}
              margin="0 auto"
              animate={{ y: 20 }}
              transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
            >
              <Center>
                <Image
                  w="full"
                  rounded="lg"
                  maxW="400px"
                  loading="lazy"
                  src="/img/astronaut-amico.svg"
                  alt="Página não encontrada"
                />
              </Center>
            </MotionBox>
            <VStack justify="center" spacing="4" textAlign="center" as="article" mt={5}>
              <Heading fontSize="3xl">404 | Desafio não encontrado :(</Heading>
              <Text fontSize={{ md: "xl" }}>
                Desculpamos, mas não encontramos nemhum desafio para você resolver
              </Text>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </React.Fragment>
  );
};

export default Page500;