import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import _Swal from 'sweetalert2'
import swalReact from 'sweetalert2-react-content'
const Swal = swalReact(_Swal)
import axios from '@/api/index'
import { Header, Question, Alternatives } from '@/components/index'
import { Props } from '@/interface/index'
import Head from 'next/head'

const Challenge: NextPage<Props> = ({ api }) => {
  const router = useRouter()
  const { slug, test } = router.query
  const [active, setActive] = useState(true)
  const [music, setMusic] = useState('/music/CountDown.mp3')
  const [answered, setAnswered] = useState(false)
  const [selectedAlternatives, setSelectedAlternatives]: [number[], Function] = useState([])

  // Responder pergunta
  const answer = useCallback(async (key: any) => {
    // Mensagens
    const STATUS: any = {
      CORRECT: ['Parabéns, você acertou!', 'Você respondeu corretamente! Continue assim.', 'success', '/music/Suspense.mp3'],
      INCORRECT: ['Que pena, resposta errada!', 'Não fique triste, você deu o seu melhor! Volte amanhã.', 'error', 'https://goldfirestudios.com/proj/howlerjs/sound.ogg'],
      TIMEOUT: ['Tempo esgotado!', 'Tic tac, o tempo acabou! Infelizmente você demorou muito e o relógio não parou. Amanhã você terá uma nova chance!', null, 'https://goldfirestudios.com/proj/howlerjs/sound.ogg', '/img/alarm.gif']
    }

    setActive(false)
    setAnswered(true)
    // Que rufem os tambores...
    setMusic('http://goldfirestudios.com/proj/howlerjs/sound.ogg')
    if (key) Swal.fire({
      imageUrl: '/img/drum.gif',
      text: 'Que rufem os tambores...',
      showConfirmButton: false
    })
    try {
      if (key) {
        var { data } = await axios.post('/challenge/check', {
          studentRegistration: slug,
          challengeID: api._id,
          choiceID: api.alternatives[key - 1]?._id || null
        })
      } else {
        var data: any = { status: 'TIMEOUT' }
      }

      // Exibe mensagem de sucesso/erro
      setTimeout(() => {
        setMusic(STATUS[data.status][3])
        Swal.fire({
          title: STATUS[data.status][0],
          text: data.message || STATUS[data.status][1],
          icon: STATUS[data.status][2],
          imageUrl: STATUS[data.status][4],
          imageHeight: 128,
          showConfirmButton: false
        })
        
      }, key ? 2000 : 0)
    } catch (err) {
      console.log(err)
      Swal.fire({
        title: 'Ocorreu um erro',
        icon: 'error',
        showConfirmButton: false
      })
    } finally {
      // Redireciona
      if (!test) setTimeout(() => {
        console.log('Redirecionando...')
        router.push('/').then(() => {
          Swal.close()
        })
      }, 5000)
      if (test) setAnswered(false)
      if (test) setSelectedAlternatives([])
    }
  }, [api, slug, router, test])

  // Quando a tecla for apertada
  const handleKeyDown = (e: any) => {
    if (answered) return
    const key = parseInt(e.key)
    if (key > api.alternatives.length) return
    if (key) setSelectedAlternatives([...selectedAlternatives, key])
  }

  // Quando a tecla for desapertada
  const handleKeyUp = (e: any) => {
    if (answered) return
    const key = parseInt(e.key)
    if (key > api.alternatives.length) return
    const alternatives = selectedAlternatives.filter(a => a !== key)
    if (!alternatives.length && key) return answer(key)
    if (key) setSelectedAlternatives(alternatives)
  }

  // Clique do mouse
  const handleClick = (alternativeIndex: any) => {
    answer(alternativeIndex + 1)
  }

  // Eventos do teclado
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  })

  return (
    <React.Fragment>
      <Head>
        <title>O Crânio | Desafio</title>
        <link rel="preload" as="image" href="/img/drum.gif" />
        <link rel="preload" as="image" href="/img/alarm.gif" />
      </Head>
      <div
        style={{
          height: '100vh',
          maxHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Header />
        <Question
          {...api}
          active={active}
          timeOutCallback={() => answer(null)}
        />
        <Alternatives
          {...api}
          active={active}
          selected={selectedAlternatives}
          handleClick={handleClick}
        />
      </div>
      <ReactAudioPlayer
        src={music}
        autoPlay
      // preload
      // onLoad={}
      // loop
      />
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
  console.log(params.slug)
  const { data } = await axios.get<Props>(`/challenge/start/${params.slug}`)
  return {
    props: {
      api: data
    }
  }
}

export default Challenge