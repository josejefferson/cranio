/* eslint-disable @next/next/no-html-link-for-pages */
import { Header } from '@/components/index'
import { Center, Heading, Box, Image } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Head from 'next/head'
import React from 'react'
import { Container } from 'react-bootstrap'

export default function Highlights() {
  return (
    <>
      <Head>
        <title>Administração do Crânio</title>
      </Head>

      <a href="/admin"><Header /></a>

      <Center bg="blackAlpha.200">
        <Heading my={[5, 10]} fontWeight={200}>Administração</Heading>
      </Center>

      <Container className="my-3">
        <Box display="flex" justifyContent="center" gap="3">
          <a href="/admin/challenges">
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" display="flex" flexDirection="column" maxWidth="300px">
              <Image
                src="/img/challenges-card.svg"
                fallbackSrc="/img/challenges-card.svg"
                alt="Imagem do anúncio"
                objectFit="cover"
              />
            </Box>
          </a>

          <a href="/admin/highlights">
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" display="flex" flexDirection="column" maxWidth="300px">
              <Image
                src="/img/highlights-card.svg"
                fallbackSrc="/img/highlights-card.svg"
                alt="Imagem do anúncio"
                objectFit="cover"
              />
            </Box>
          </a>
        </Box>
      </Container>
    </>
  )
}