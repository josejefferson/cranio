import React from 'react'
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Progress,
  Text,
  Center
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { BsAsterisk, BsHash } from 'react-icons/bs'
import _Swal from 'sweetalert2'
import swalReact from 'sweetalert2-react-content'
import axios from '@/api/index'
import { Header, Footer } from '@/components/index'
import { Iuser } from '@/interface/index'
import { useLoadingContext } from '@/contexts/loading'

export default function LoginChallenge(): JSX.Element {
  const Swal = swalReact(_Swal)
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

      const { isConfirmed } = await Swal.fire({
        title: `Você é <u>${data.shortName}</u>?`,
        html: `Você digitou a matrícula <b>${data.registration}</b> correspondente a(o) aluno(a) ` +
          `<b>${data.shortName}</b> do curso de <b>${data.courseName}</b>.<br><br>Caso esteja correta, ` +
          'pressione <b>*</b><br>Se você deseja corrigir, pressione <b>#</b>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: <Center><BsAsterisk /> SIM</Center>,
        cancelButtonText: <Center><BsHash /> NÃO</Center>,
        timer: 10000,
        timerProgressBar: true
      })

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
        await Swal.fire({
          title: 'Ops, você já jogou hoje!',
          text: 'Por favor, volte amanhã para mais desafios',
          icon: 'info',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
        setIsActive(true)
      }
    } catch (error: any) {
      await Swal.fire({
        title: 'Ops, estudante não encontrado!',
        text: 'Verifique se a sua matrícula está correta',
        icon: 'info',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      })
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
              _hover={{
                bg: 'blue.500'
              }}>
              Confirmar
            </Button>
          </Stack>
        </Stack>
        <Footer />
      </Flex>
    </>
  )
}
