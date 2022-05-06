import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router'
import {
  RadioGroup, Text, Box,
  Progress, Container, Image,
  Radio, Stack, Heading, Center,
  useToast, Button, Flex
} from '@chakra-ui/react'
import axios from '../../api'
import Header from '../../components/Header'
import Question from '../../components/Challenge/Question'
import Alternatives from '../../components/Challenge/Alternatives'
import { useState, useEffect } from 'react'

// import { Header, Question, Alternatives } from '../../components'

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
  api: Data;
  _id: string;
}
const Challenge: NextPage<Props> = ({ api }) => {
  const [selectedAlternatives, setSelectedAlternatives]: [number[], Function] = useState([])
  const [loading, setLoading] = useState(false)

  const handleKeyDown = (e: any) => {
    if (loading) return
    const key = parseInt(e.key)
    if (key) setSelectedAlternatives([...selectedAlternatives, key])
  }
  const handleKeyUp = (e: any) => {
    const key = parseInt(e.key)
    const alternatives = selectedAlternatives.filter(a => a !== key)
    if (key) setSelectedAlternatives(alternatives)
    if (!alternatives.length && key) console.log(api.alternatives[key - 1])
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
    <>
      <div
        style={{
          height: '100vh',
          maxHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Header />
        <Question {...api} />
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
