import React from 'react'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
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
  const [timer, setTimer] = useState(api.time)
  const [isActive, setIsActive] = useState(true)

  // Responder pergunta
  const answer = useCallback(async (key: any) => {
    // Mensagens
    const STATUS: any = {
      CORRECT: ['Parabéns, você acertou!', 'Você respondeu corretamente! Continue assim.', 'success'],
      INCORRECT: ['Que pena, resposta errada!', 'Não fique triste, você deu o seu melhor! Volte amanhã.', 'error'],
      TIMEOUT: ['Tempo esgotado!', 'Tic tac, o tempo acabou! Infelizmente você demorou muito e o relógio não parou. Amanhã você terá uma nova chance!', null, '/img/alarm.gif']
    }

    setIsActive(false)
    setLoading(true)

    // Que rufem os tambores...
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
      Swal.fire({
        title: STATUS[data.status][0],
        text: data.message || STATUS[data.status][1],
        icon: STATUS[data.status][2],
        imageUrl: STATUS[data.status][3],
        imageHeight: 128,
        showConfirmButton: false
      })

      // Redireciona
      if (!test) setTimeout(() => {
        console.log('Redirecionando...')
        router.push('/').then(() => {
          Swal.close()
        })
      }, 5000)
    } catch (err) {
      console.log(err)
    } finally {
      if (test) setLoading(false) //temp
      if (test) setSelectedAlternatives([]) //temp
    }
  }, [api, slug, router, test])

  // Timer
  useEffect(() => {
    if (isActive && timer > 0) {
      const _timer = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
      return () => clearTimeout(_timer)
    } else if (isActive && timer === 0) {
      setIsActive(false)
      answer(null)
    }
  }, [isActive, timer, answer])

  // Seleção de alternativas
  const [loading, setLoading] = useState(false)
  const [selectedAlternatives, setSelectedAlternatives]: [number[], Function] = useState([])

  // Quando a tecla for apertada
  const handleKeyDown = (e: any) => {
    if (loading) return
    const key = parseInt(e.key)
    if (key > api.alternatives.length) return
    if (key) setSelectedAlternatives([...selectedAlternatives, key])
  }

  // Quando a tecla for desapertada
  const handleKeyUp = (e: any) => {
    if (loading) return
    const key = parseInt(e.key)
    if (key > api.alternatives.length) return
    const alternatives = selectedAlternatives.filter(a => a !== key)
    if (!alternatives.length && key) return answer(key)
    if (key) setSelectedAlternatives(alternatives)
  }

  const handleClick = (alternativeIndex: any) => {
    answer(alternativeIndex + 1)
  }

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
          currentTime={timer}
        />
        <Alternatives
          {...api}
          selected={selectedAlternatives}
          handleClick={handleClick}
        />
      </div>
    </React.Fragment>
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
      api: data
    }
  }
}

export default Challenge