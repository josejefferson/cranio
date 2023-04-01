/* eslint-disable @next/next/no-html-link-for-pages */
import { Header } from '@/components/index'
import { Box, Button, Center, Heading, Image, useToast } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Head from 'next/head'
import React from 'react'
import { Container } from 'react-bootstrap'

export default function Highlights() {
  const toast = useToast()
  const [login, setLogin] = React.useState<any>()
  const [password, setPassword] = React.useState<any>()
  const [hasLoginInformation, setHasLoginInformation] = React.useState(false)

  React.useEffect(() => {
    setLogin(localStorage.getItem('cranio.backend.username'))
    setPassword(localStorage.getItem('cranio.backend.password'))
    setHasLoginInformation(!(login === null && password === null))
  }, [login, password, hasLoginInformation])

  const logOut = () => {
    localStorage.removeItem('cranio.backend.username')
    localStorage.removeItem('cranio.backend.password')
    setHasLoginInformation(false)
    toast({
      title: 'As informações de login foram apagadas',
      status: 'info'
    })
  }

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest-admin.json" />
        <title>Administração do Crânio</title>
      </Head>

      <a href="/admin">
        <Header />
      </a>

      <Center bg="blackAlpha.200">
        <Heading my={[5, 10]} fontWeight={200}>
          Administração
        </Heading>
      </Center>

      <Container className="my-3">
        <Box display="flex" justifyContent="center" gap="3">
          <a href="/admin/challenges">
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              maxWidth="300px"
            >
              <Image
                src="/img/challenges-card.svg"
                fallbackSrc="/img/challenges-card.svg"
                alt="Imagem do anúncio"
                objectFit="cover"
              />
            </Box>
          </a>

          <a href="/admin/highlights">
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              maxWidth="300px"
            >
              <Image
                src="/img/highlights-card.svg"
                fallbackSrc="/img/highlights-card.svg"
                alt="Imagem do anúncio"
                objectFit="cover"
              />
            </Box>
          </a>
        </Box>

        <Box textAlign="center" hidden={!hasLoginInformation}>
          <Button mt={3} colorScheme="red" size="sm" onClick={logOut}>
            Esquecer informações de login
          </Button>
        </Box>
      </Container>
    </>
  )
}
