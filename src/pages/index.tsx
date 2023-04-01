import { useLoadingContext } from '@/contexts/loading'
import Challenge from '@/models/Challenge'
import Highlight from '@/models/Highlight'
import dbConnect from '@/utils/db-connect'
import { Box, chakra, Heading } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Marquee from 'react-fast-marquee'
import { IHighlights, Props } from '../interface'

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect()
  const currentDate = new Date().toISOString()
  const highlights = await Highlight.find({
    $or: [{ endDate: { $gte: currentDate } }, { endDate: null }]
  })

  const rawChallenges = await Challenge.find({ active: true })
  let challengesPerCourse: any = {}

  for (const challenge of rawChallenges) {
    if (!challenge.courseName) continue
    for (let courseName of challenge.courseName) {
      courseName = courseName.trim()
      challengesPerCourse[courseName] = challengesPerCourse[courseName] || 0
      challengesPerCourse[courseName]++
    }
  }

  const challenges = {
    totalChallenges: rawChallenges.length,
    challengesPerCourse
  }

  return {
    props: {
      highlights,
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

      <Carousel className="highlights-carousel" pause={false} controls={false} interval={10000}>
        {props.highlights?.map((highlight: IHighlights, index: number) => {
          return (
            <Carousel.Item key={index} onClick={handleClick}>
              <img className="background-img" src={highlight.image} alt={highlight.title} />
              <img src={highlight.image} alt={highlight.title} />
              {!highlight.title && !highlight.description ? (
                <React.Fragment />
              ) : (
                <Carousel.Caption>
                  <Box w="full" shadow="lg" rounded="lg" overflow="hidden">
                    <Heading
                      py={2}
                      textAlign="center"
                      fontWeight="bold"
                      textTransform="uppercase"
                      color="white"
                      letterSpacing={1}
                      hidden={!highlight.title}
                    >
                      {highlight.title}
                    </Heading>
                    <chakra.span fontWeight="bold" color="gray.200" textAlign={'center'}>
                      {highlight.description}
                    </chakra.span>
                  </Box>
                </Carousel.Caption>
              )}
            </Carousel.Item>
          )
        })}

        <Carousel.Item onClick={handleClick}>
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
            {Object.entries(props.challenges.challengesPerCourse)
              .map(([course, count]: any) => `${course} (${count})`)
              .join(' - ')}
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
