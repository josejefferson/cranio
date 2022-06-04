import React from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from '../api/'
import { Box, Heading, chakra, Container, Text, Center, Flex, Image } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Carousel from 'react-bootstrap/Carousel'
import { useLoadingContext } from '@/contexts/loading'
import Marquee from 'react-fast-marquee'
import { IAds, Props } from '../interface'

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: ads } = await axios.get<IAds>('/ad/active')
  const { data: challenges } = await axios.get<IAds>('/challenge/active')
  return {
    props: {
      ads,
      challenges
    }
  }
}

const Home: NextPage<Props> = (props) => {
  const router = useRouter()
  const loading = useLoadingContext()

  // Pré-carrega a página de login
  React.useEffect(() => {
    router.prefetch('/login')
  })

  // Atualiza a lista de anúncios
  const refreshData = () => {
    router.replace(router.asPath)
  }

  React.useEffect(() => {
    const interval = setInterval(refreshData, 60000)
    return () => clearInterval(interval)
  })

  // Tecla pressionada
  React.useEffect(() => {
    document.addEventListener('keyup', handleKeyUp)
    return () => document.removeEventListener('keyup', handleKeyUp)
  })

  const handleKeyUp = (event: any) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return
    const KEYS = '0123456789*# '.split('')
    if (!KEYS.includes(event.key)) return
    loading(true)
    console.log('Abrindo login...')
    router.push('/login').then(() => {
      loading(false)
    })
  }

  const handleClick = () => {
    loading(true)
    console.log('Abrindo login...')
    router.push('/login').then(() => {
      loading(false)
    })
  }

  return (
    <Box>
      <Head>
        <title>O Crânio</title>
      </Head>

      <Carousel
        className="ads-carousel"
        pause={false}
        controls={false}
        interval={10000}
      >
        {props.ads?.map((ad: IAds, index: number) => {
          return (
            <Carousel.Item key={index} onClick={handleClick}>
              <img className="background-img" src={ad.image} alt={ad.title} />
              <img src={ad.image} alt={ad.title} />
              {!ad.title && !ad.description ? (
                <React.Fragment />
              ) : (
                <Carousel.Caption>
                  <Box
                    w="full"
                    shadow="lg"
                    rounded="lg"
                    overflow="hidden"
                  >
                    <Heading
                      py={2}
                      textAlign="center"
                      fontWeight="bold"
                      textTransform="uppercase"
                      color="white"
                      letterSpacing={1}
                      hidden={!ad.title}
                    >
                      {ad.title}
                    </Heading>
                    <chakra.span
                      fontWeight="bold"
                      color="gray.200"
                      textAlign={'center'}
                    >
                      {ad.description}
                    </chakra.span>
                  </Box>
                </Carousel.Caption>
              )}
            </Carousel.Item>
          )
        })}

        <Carousel.Item>
          <img className="background-img" src="/img/contact.png" alt="Contato" />
          <img src="/img/contact.png" alt="Contato" />
        </Carousel.Item>
      </Carousel>

      <Marquee
        style={{ color: 'white', fontSize: '2vh', backgroundColor: '#2c373d4d' }}
        speed={100}
        gradient={false}
      >
        {props.challenges.totalChallenges ? (
          <>
            {props.challenges.totalChallenges} desafios disponíveis:&nbsp;
            {Object.entries(props.challenges.challengesPerCourse).map(([course, count]: any) => `${course} (${count})`).join(' - ')}
            <div style={{ width: '20vh' }} />
          </>
        ) : (
          <>
            Nenhum desafio aberto no momento. Por favor, volte mais tarde
            <div style={{ width: '20vh' }} />
          </>
        )}

        Pronto para um desafio? Aperte qualquer tecla...
        <div style={{ width: '20vh' }} />
      </Marquee>
    </Box>
  )
}
export default Home
