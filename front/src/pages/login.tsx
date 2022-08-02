import axios from '@/api/index'
import { Footer, Header, SplashScreen } from '@/components/index'
import { useLoadingContext } from '@/contexts/loading'
import { Iuser } from '@/interface/index'
import * as popups from '@/utils/popups'
import { Button, Flex, FormControl, Heading, Input, Progress, Stack, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { BsAsterisk } from 'react-icons/bs'
import _Swal from 'sweetalert2'
import swalReact from 'sweetalert2-react-content'
const Swal = swalReact(_Swal)

export default function Login(): JSX.Element {
  const router = useRouter()
  const { test } = router.query
  const loading = useLoadingContext()

  const TIME: number = 30
  const [registration, setRegistration] = React.useState('')
  const [time, setTime] = React.useState(TIME)
  const [isActive, setIsActive] = React.useState(true)
  const [searchLoading, setSearchLoading] = React.useState(false)

  React.useEffect(() => {
    if (isActive && time > 0) {
      var timer = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      if (!test) loading(true, 'Carregando anúncios')
      if (!test) router.push('/').then(() => loading(false))
      setIsActive(false)
    }
    return () => clearTimeout(timer)
  }, [isActive, time, router, loading, test])

  async function onSubmitHandler(event?: React.FormEvent): Promise<void> {
    event?.preventDefault()
    try {
      setIsActive(false)
      setSearchLoading(true)
      const { data } = await axios.get<Iuser>(`/student/find/${registration}`)

      const { isConfirmed } = await popups.studentConfirm({ data })
      if (!isConfirmed) {
        setIsActive(true)
        return
      }

      if (data.canPlayToday) {
        loading(true, 'Procurando um desafio')
        router.push({
          pathname: '/challenge/[slug]',
          query: { slug: data.registration }
        }).then(() => loading(false))
      } else {
        await popups.cantPlayToday()
        setIsActive(true)
      }
    } catch (error: any) {
      await popups.studentNotFound()
      setIsActive(true)
    } finally {
      setSearchLoading(false)
    }
  }

  // Tecla pressionada
  const handleKeyUp = (event: any) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return
    if (Swal.isVisible()) {
      if (event.key === '*') Swal.clickConfirm()
      if (event.key === '#') {
        Swal.clickCancel()
        setRegistration('')
      }
    } else {
      if (event.key === '*') onSubmitHandler()
      if (event.key === '#') setRegistration('')
    }
    setTime(TIME)
  }

  // Eventos do teclado
  React.useEffect(() => {
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keyup', handleKeyUp)
    }
  })

  return (
    <>
      <Head>
        <title>O Crânio | Login</title>
      </Head>
      <Header />
      <Progress max={TIME} value={time} size="xs" colorScheme="blue" className="progress" />
      <Flex
        minH={'73vh'}
        h="calc(93vh - 0.25rem)"
        align={'center'}
        justify={'center'}
        overflow={'hidden'}
        direction="column"
        style={{ backgroundColor: '#202024' }}
      >
        <Stack
          id="loginAnimation"
          as="form"
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg="gray.800"
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          onSubmit={onSubmitHandler}
          mt={7}
        >
          <Heading lineHeight={1.1} color="white" fontSize={{ base: '2xl', md: '3xl' }}>
            Digite sua matrícula
          </Heading>
          <Text color="white" fontSize={{ base: '1xl', md: '2xl' }}>
            Resolva um desafio para testar seus conhecimentos!
          </Text>

          <FormControl>
            <Input
              placeholder="Sua matrícula..."
              type="number"
              autoFocus
              value={registration}
              onChange={(e) => setRegistration(e.target.value)}
              color="white"
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              leftIcon={<BsAsterisk />}
              isLoading={searchLoading}
              type={'submit'}
              bg={'blue.400'}
              color={'white'}
              size="md"
              height="48px"
              width="100%"
              _hover={{ bg: 'blue.500' }}
            >
              Confirmar
            </Button>
          </Stack>
        </Stack>
        <Footer />
      </Flex>

      <SplashScreen />
    </>
  )
}
