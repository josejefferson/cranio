import React from 'react'
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Progress
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AiOutlineSend } from 'react-icons/ai'
import _Swal from 'sweetalert2'
import swalReact from 'sweetalert2-react-content'
const Swal = swalReact(_Swal)
import axios from '@/api/index'
import { Header, ModalAlert } from '@/components/index'
import { Iuser } from '@/interface/index'

export default function LoginChallenge({ setLoading }: any): JSX.Element {
  const router = useRouter()
  const [registration, Setregistration] = React.useState('')
  const [name, setName] = React.useState('')
  const [cursoName, setCursoName] = React.useState('')
  const [time, setTime] = React.useState(1 * 60)
  const [isActive, setIsActive] = React.useState(true)
  let percentTime = Math.floor(100 + ((time / (1 * 60) * (-100))))
  let [redirect, setRedirect] = React.useState(false)
  let [searchLoading, setSearchLoading] = React.useState(false)
  React.useEffect(() => {
    if (isActive && time > 0) {
      setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      router.push('/')
      setIsActive(false)
    }
  }, [isActive, time, router])
  async function onSubmitHandler(event: React.FormEvent): Promise<void> {
    event.preventDefault()
    try {
      setSearchLoading(true)
      const { data } = await axios.get<Iuser>(`/student/find/${registration}`)
      console.log(data)
      Setregistration(data.registration)
      setName(data.name)
      setCursoName(data.courseName)
      if (data.canPlayToday) {
        document.getElementById('Open')?.click()
        const handleKeyDown = (event: any) => {
          if (event.key === '*') document.getElementById('router')?.click()
          if (event.key === '#') document.getElementById('close')?.click()
          setLoading(true)
          document.removeEventListener('keydown', handleKeyDown)
        }
        document.addEventListener('keydown', handleKeyDown)
      }
      if (!data.canPlayToday) {
        Swal.fire({
          title: 'Ops, você já jogou hoje!',
          text: 'Por favor, volte amanhã para mais desafios',
          icon: 'info',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
        // setRedirect(true)
      }
    } catch (error: any) {
      Swal.fire({
        title: 'Ops, estudante não encontrado!',
        text: 'Verifique se a sua matrícula está correta',
        icon: 'info',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      })
    } finally {
      setSearchLoading(false)
    }
  }
  React.useEffect(() => {
    if (redirect) {
      setTimeout(() => {
        router.push('/')
      }, 100)
    }
  }, [redirect, router])
  return (
    <>
      <Header />
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg="gray.600"
        overflow={'hidden'}
      >
        <ModalAlert
          name={name}
          courseName={cursoName}
          registration={registration}
          setLoading={setLoading}
        />
        <Stack
          as="form"
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg="gray.800"
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          onSubmit={onSubmitHandler}
          my={12}>
          <Heading lineHeight={1.1} color="white" fontSize={{ base: '2xl', md: '3xl' }}>
            Coloque sua matrícula
          </Heading>

          <FormControl>
            <Input
              placeholder="Usuário"
              type="number"
              autoFocus
              // disabled={!isActive}
              onChange={(e) => Setregistration(e.target.value)}
              color="white"
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              leftIcon={<AiOutlineSend />}
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
              Enter
            </Button>
          </Stack>
          <Progress value={percentTime} hasStripe colorScheme="green" rounded="base" />
        </Stack>
      </Flex>
    </>
  )
}