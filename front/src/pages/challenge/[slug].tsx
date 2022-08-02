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
import { Preparation } from '@/components/index'
import styles from '@/styles/Challenge.module.css'
import getMusic from '@/utils/get-music'
import { STATUS, ERRORS } from '@/utils/messages'
import * as popups from '@/utils/popups'

const Challenge: NextPage<Props> = ({ api }) => {
  const router = useRouter()
  const { slug, test } = router.query
  const [active, setActive] = useState(false)
  const [music, setMusic] = useState(getMusic(api.time))
  const [answered, setAnswered] = useState(false)
  const [selectedAlternatives, setSelectedAlternatives]: [number[], Function] = useState([])
  const [started, setStarted] = useState(false)

  // Responder pergunta
  const answer = useCallback(async (key: any) => {
    setActive(false)
    setAnswered(true)

    // Que rufem os tambores...
    setMusic('/music/end.mp3')
    if (key) popups.drum()
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
        popups.status({ data })
      }, key ? 2000 : 0)
    } catch (err) {
      // Erro
      console.log(err)
      popups.error()
    } finally {
      // Redireciona
      if (!test) setTimeout(() => {
        console.log('Redirecionando...')
        router.push('/').then(() => { Swal.close() })
      }, 5000)
      if (test) setAnswered(false)
      if (test) setSelectedAlternatives([])
    }
  }, [api, slug, router, test])

  // Quando a tecla for apertada
  const handleKeyDown = (e: any) => {
    if (answered || !started) return
    if (e.altKey || e.ctrlKey || e.metaKey) return
    const key = parseInt(e.key)
    if (key > api.alternatives.length) return
    if (key) setSelectedAlternatives([...selectedAlternatives, key])
  }

  // Quando a tecla for desapertada
  const handleKeyUp = (e: any) => {
    if (answered || !started) return
    if (e.altKey || e.ctrlKey || e.metaKey) return
    const key = parseInt(e.key)
    if (key > api.alternatives.length) return
    const alternatives = selectedAlternatives.filter(a => a !== key)
    if (!alternatives.length && key) return answer(key)
    if (key) setSelectedAlternatives(alternatives)
  }

  // Clique do mouse
  const handleClick = (alternativeIndex: any) => {
    if (!started) return
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
    <>
      <Head>
        <title>O Crânio | Desafio</title>
        <link rel="preload" as="image" href="/img/drum.gif" />
        <link rel="preload" as="image" href="/img/alarm.gif" />
      </Head>

      <Preparation {...api} callback={() => { setStarted(true); setActive(true) }} />

      <div className={styles.container}>
        <Header />
        <Question {...api} active={active} timeOutCallback={() => answer(null)} />
        <Alternatives  {...api} active={active} selected={selectedAlternatives} handleClick={handleClick} />
      </div>

      <div className={`${styles.waveWrapper} ${styles.waveAnimation}`}>
        <div className={`${styles.waveWrapperInner} ${styles.bgTop}`}>
          <div className={`${styles.wave} ${styles.waveTop}`}></div>
        </div>
        <div className={`${styles.waveWrapperInner} ${styles.bgMiddle}`}>
          <div className={`${styles.wave} ${styles.waveMiddle}`}></div>
        </div>
        <div className={`${styles.waveWrapperInner} ${styles.bgBottom}`}>
          <div className={`${styles.wave} ${styles.waveBottom}`}></div>
        </div>
      </div>

      <ReactAudioPlayer src={started ? music : ''} autoPlay />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, query }: any) => {
  try {
    const url = query.challenge
      ? `/challenge/${query.challenge}`
      : `/challenge/start/${params.slug}`
    const { data } = await axios.get<Props>(url)
    return { props: { api: data } }
  } catch (err: any) {
    const error = ERRORS[err?.response?.data?.code]
    if (!error) throw err

    const query = new URLSearchParams()
    if (error && error[0]) query.set('title', error[0])
    if (error && error[1]) query.set('description', error[1])

    return {
      redirect: {
        permanent: true,
        destination: '/500?' + query
      }
    }
  }
}

export default Challenge