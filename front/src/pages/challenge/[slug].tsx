import React from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import _Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const Swal = withReactContent(_Swal)
import axios from '@/api/index'
import { Header, Question, Alternatives } from '@/components/index'
import { Props } from '@/interface/index';

const Challenge: NextPage<Props> = ({ api }) => {
  const router = useRouter()
  const { slug } = router.query

  const [selectedAlternatives, setSelectedAlternatives]: [number[], Function] = useState([])
  let [loading, setLoading] = useState(false)
  let [redirect, setRedirect] = useState(false)

  const handleKeyDown = (e: any) => {
    if (loading) return
    const key = parseInt(e.key)
    if (key > api.alternatives.length) return
    if (key) setSelectedAlternatives([...selectedAlternatives, key])
  }

  const handleKeyUp = (e: any) => {
    if (loading) return
    const key = parseInt(e.key)
    if (key > api.alternatives.length) return
    const alternatives = selectedAlternatives.filter(a => a !== key)
    if (!alternatives.length && key) return answer(key)
    if (key) setSelectedAlternatives(alternatives)
  }

  async function answer(key: any) {
    setLoading(true)
    Swal.fire({
      imageUrl: 'https://c.tenor.com/gvx0Ukr-9zkAAAAj/dm4uz3-foekoe.gif',
      text: 'Que rufem os tambores...',
      showConfirmButton: false
    })

    try {
      const STATUS: any = {
        CORRECT: ['Parabéns!', 'success'],
        INCORRECT: ['Que pena!', 'error'],
        TIMEOUT: ['Ops!', 'warning']
      }
      const { data } = await axios.post('/challenge/check', {
        studentRegistration: slug,
        challengeID: api._id,
        choiceID: api.alternatives[key - 1]?._id || null
      })

      Swal.fire({
        title: STATUS[data.status][0],
        text: data.message,
        icon: STATUS[data.status][1],
        showConfirmButton: false,
        timer: 2000 //temp
      })

      setRedirect(true)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false) //temp
      setSelectedAlternatives([]) //temp
    }
  }

  // useEffect(() => {
  //   if (redirect) setTimeout(() => {
  //     router.push(`/`)
  //   }, 5000)
  // })

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
      <div
        style={{
          height: '100vh',
          maxHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Header />
        <Question {...api} answer={answer} />
        <Alternatives {...api} selected={selectedAlternatives} />
      </div>
    </>
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
