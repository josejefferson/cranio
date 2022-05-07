import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import axios from '../../api'
import _Swal from 'sweetalert2'
import swalReact from 'sweetalert2-react-content'
const Swal = swalReact(_Swal)

import Header from '../../components/Header'
import Question from '../../components/Challenge/Question'
import Alternatives from '../../components/Challenge/Alternatives'
// import { Header, Question, Alternatives } from '../../components'

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
    correct: boolean;
    _id: string
  }>;
  _id: string
}

interface Props {
  api: Data;
  _id: string;
}

const Challenge: NextPage<Props> = ({ api }) => {
  const router = useRouter()
  const { slug, test } = router.query

  // Responder pergunta
  const answer = useCallback(async (key: any) => {
    // Mensagens
    const STATUS: any = {
      CORRECT: ['Parabéns!', 'Certa resposta!', 'success'],
      INCORRECT: ['Que pena!', 'Você errou!', 'error'],
      TIMEOUT: ['Ops!', 'Tempo esgotado!', 'warning']
    }

    setLoading(true)

    // Que rufem os tambores...
    if (key) Swal.fire({
      imageUrl: 'https://c.tenor.com/gvx0Ukr-9zkAAAAj/dm4uz3-foekoe.gif',
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
        showConfirmButton: false
      })

      // Redireciona
      if (!test) setTimeout(() => {
        console.log('Redirecionando...')
        router.push('/').then(() => {
          Swal.close()
        })
      }, 2000)
    } catch (err) {
      console.log(err)
    } finally {
      if (test) setLoading(false) //temp
      if (test) setSelectedAlternatives([]) //temp
    }
  }, [api, slug, router, test])

  // Timer
  const [timer, setTimer] = useState(api.time)
  const [isActive, setIsActive] = useState(true)
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
    },
  }
}

export default Challenge