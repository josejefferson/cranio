import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router'
import {
  RadioGroup, Text, Box,
  Progress, Container, Image,
  Radio, Stack, Heading, Center,
  useToast, Button, Flex
} from '@chakra-ui/react'
import axios from '../../api'

import React from 'react';
interface Data {
  question: string;
  createdBy: any;
  time: number;
  preparationTime: number;
  topic: string;
  image?: string;
  alternatives: Array<{
    title: string;
    description?: string;
    answer: number;
    _id: string
  }>;
  _id: string
}

interface Props {
  data: Data;
  _id: string;
}
const Challenge: NextPage<Props> = (data) => {
  if (data.data === null) return (<Box color={'white'}>Nenhum desafio</Box>) // temp

  const timeInMinutes = 1
  const router = useRouter()
  const { slug } = router.query
  const toast = useToast()
  const [time, setTime] = React.useState(timeInMinutes * Number(data.data.time));
  const [isActive, setIsActive] = React.useState(true);
  const [message, setMessage] = React.useState('');
  const [hasFinished, setHasFinished] = React.useState(false);
  const [value, setValue] = React.useState('')
  let percentTime = Math.floor(100 + ((time / (timeInMinutes * Number(data.data.time)) * (-100))))
  React.useEffect(() => {
    if (isActive && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      router.push(`/`)
      setHasFinished(true)
      setIsActive(false)
    }
  }, [isActive, time]);
  async function onSubmitHandler(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    const dataCheck = {
      studentRegistration: slug,
      challengeID: data.data._id,
      choiceID: value
    }
    console.log(dataCheck)
    try {
      const { data } = await axios.post('/challenge/check', dataCheck)
      setMessage(data.status)
      console.log(data.message)
      if (data.status === 'CORRECT') {
        toast({
          title: data.message,
          description: 'vamos enviar um email com suas informações!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      } if (data.status === 'INCORRECT') {
        toast({
          title: data.message,
          description: 'Não desista! Volte amanhã e tente novamente!',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        })
      } if (data.status === 'TIMEOUT') {
        toast({
          title: data.message,
          description: 'Seu tempo acabou!',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    if (message === 'INCORRECT') {
      setTimeout(() => {
        router.push(`/`)
      }, 100);
    }
  }, [message])
  return (
    <Box bg="gray.700" h='100vh'>
      <Progress value={percentTime} hasStripe colorScheme='green' rounded='base' />
      <Container maxW={'106ch'} as='form' onSubmit={onSubmitHandler}>
        <Heading color='white' mt={10} textAlign='center'>
          {data.data.question}
        </Heading>
        <Center>
          <Image
            w="400px"
            rounded="lg"
            loading="lazy"
            shadow="2xl"
            src={data.data.image}
            hidden={!data.data.image}
          />
        </Center>
        <RadioGroup onChange={setValue} value={value} >
          <Stack spacing={[1, 5]} direction={['column']} color='white'>
            {data.data.alternatives?.map((alternatives, index: number) => {
              return (
                <>
                  <Radio
                    key={index}
                    mt='4px'
                    value={alternatives._id}
                    onChange={(e) => setValue(e.target.value)}
                  >
                    {alternatives.title}
                  </Radio>
                </>
              )
            })}
          </Stack>
        </RadioGroup>
        <Flex
          align={'center'}
          justify={'center'}
          w={'full'}

        >
          <Stack spacing={6} maxW={'100ch'}>
            <Button
              bg={'blue.400'}
              color={'white'}
              type="submit"
              _hover={{
                bg: 'blue.500',
              }}>
              Enter
            </Button>
          </Stack>
        </Flex>
      </Container>
      <Text color='white' textAlign={'center'}>{data.data.createdBy.name}</Text>
      <Text color='white' textAlign={'center'}>{data.data.time}</Text>
    </Box>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  console.log(params.slug)
  const { data } = await axios.get<Props>(`/challenge/start/${params.slug}`)
  return {
    props: {
      data: data
    },
  }
}

export default Challenge
