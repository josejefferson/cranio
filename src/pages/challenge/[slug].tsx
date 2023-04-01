import axios from '@/api/index'
import { Alternatives, Header, Preparation, Question } from '@/components/index'
import { Props } from '@/interface/index'
import ChallengeModel from '@/models/Challenge'
import Student from '@/models/Student'
import styles from '@/styles/Challenge.module.css'
import dbConnect from '@/utils/db-connect'
import getMusic from '@/utils/get-music'
import { ERRORS, STATUS } from '@/utils/messages'
import * as popups from '@/utils/popups'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import _Swal from 'sweetalert2'
import swalReact from 'sweetalert2-react-content'
const Swal = swalReact(_Swal)

const Challenge: NextPage<Props> = ({ api }) => {
  const router = useRouter()
  const { slug, test } = router.query
  const [active, setActive] = useState(false)
  const [music, setMusic] = useState(getMusic(api.time))
  const [answered, setAnswered] = useState(false)
  const [selectedAlternatives, setSelectedAlternatives]: [number[], Function] = useState([])
  const [started, setStarted] = useState(false)

  // Responder pergunta
  const answer = useCallback(
    async (key: any) => {
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
        setTimeout(
          () => {
            setMusic(STATUS[data.status][3])
            popups.status({ data })
          },
          key ? 2000 : 0
        )
      } catch (err) {
        // Erro
        console.log(err)
        popups.error()
      } finally {
        // Redireciona
        if (!test)
          setTimeout(() => {
            console.log('Redirecionando...')
            router.push('/').then(() => {
              Swal.close()
            })
          }, 5000)
        if (test) setAnswered(false)
        if (test) setSelectedAlternatives([])
      }
    },
    [api, slug, router, test]
  )

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
    const alternatives = selectedAlternatives.filter((a) => a !== key)
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

      <Preparation
        {...api}
        callback={() => {
          setStarted(true)
          setActive(true)
        }}
      />

      <div className={styles.container}>
        <Header />
        <Question {...api} active={active} timeOutCallback={() => answer(null)} />
        <Alternatives
          {...api}
          active={active}
          selected={selectedAlternatives}
          handleClick={handleClick}
        />
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
  await dbConnect()

  try {
    if (query.challenge) {
      const challenge = await ChallengeModel.findById(query.challenge)
      return { props: { api: JSON.parse(JSON.stringify(challenge)) } }
    }

    const registration = params.slug
    const student = await Student.findOne({ registration })
    if (!student)
      throw { error: true, code: 'STUDENT_NOT_FOUND', message: 'Estudante não encontrado' }
    if (!student.canPlayToday)
      throw { error: true, code: 'CANT_PLAY_TODAY', message: 'Você só pode jogar amanhã' }

    const challenge = await (ChallengeModel as any).findRandom(student.course, student.testUser)
    if (!challenge)
      throw {
        error: true,
        code: 'NO_CHALLENGES',
        message: 'Não há desafios disponíveis para o seu curso'
      }

    if (!student.testUser) student.playedToday()

    return {
      props: {
        api: JSON.parse(JSON.stringify(challenge))
      }
    }
  } catch (err: any) {
    const error = ERRORS[err?.code]
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
