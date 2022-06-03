import { Header } from '@/components/index'
import Head from 'next/head'
import { Heading, Center, SimpleGrid, Spinner } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import React from 'react'
import { loginAndGetData } from '@/utils/login-and-get-data'
import Challenge from '@/components/Admin/Challenges'

export default function Challenges() {
  const [challenges, setChallenges] = React.useState<any>(null)
  if (!challenges) loginAndGetData('/challenges', challenges, setChallenges)

  const activeChallenges = challenges?.filter((challenge: any) => challenge.active)
  const inactiveChallenges = challenges?.filter((challenge: any) => !challenge.active)

  return (
    <>
      <style>{'body{ background: white; color: black; font-size: initial !important; }'}</style>
      <Head>
        <title>Desafios</title>
      </Head>

      <Header />

      <Center>
        <Heading mt={3}>Desafios</Heading>
      </Center>

      <Container className="my-3">
        <Heading as="h3" size="lg" mt={5} mb={2} p={0}>Desafios ativos ({activeChallenges?.length || '-'})</Heading>
        <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={2}>
          {
            activeChallenges?.map((challenge: any, i: number) => <Challenge challenge={challenge} key={i} />) ||
            <><Spinner /></>
          }
        </SimpleGrid>

        <Heading as="h3" size="lg" mt={5} mb={2} p={0}>Desafios resolvidos ({inactiveChallenges?.length || '-'})</Heading>
        <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={2}>
          {
            inactiveChallenges?.map((challenge: any, i: number) => <Challenge challenge={challenge} key={i} />) ||
            <><Spinner /></>
          }
        </SimpleGrid>
      </Container>
    </>
  )
}