import { Header } from '@/components/index'
import Head from 'next/head'
import { Heading, Center, SimpleGrid, Spinner } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import React from 'react'
import Highlight from '@/components/Admin/Highlights'
import { loginAndGetData } from '@/utils/login-and-get-data'

export default function Highlights() {
  const [highlights, setHighlights] = React.useState<any>(null)
  if (!highlights) loginAndGetData('/highlight', highlights, setHighlights)

  const activeAds = highlights?.filter((h: any) => new Date(h.endDate) > new Date())
  const inactiveAds = highlights?.filter((h: any) => new Date(h.endDate) <= new Date())

  return (
    <>
      <style>{'body{ background: white; color: black; font-size: initial !important; }'}</style>
      <Head>
        <title>Anúncios</title>
      </Head>

      <Header />

      <Center>
        <Heading mt={3}>Anúncios</Heading>
      </Center>

      <Container className="my-3">
        <Heading as="h3" size="lg" mt={5} mb={2} p={0}>Anúncios ativos ({activeAds?.length || '-'})</Heading>
        <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={2}>
          {
            activeAds?.map((highlight: any, i: number) => <Highlight highlight={highlight} key={i} />) ||
            <><Spinner /></>
          }
        </SimpleGrid>

        <Heading as="h3" size="lg" mt={5} mb={2} p={0}>Anúncios passados ({inactiveAds?.length || '-'})</Heading>
        <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={2}>
          {
            inactiveAds?.map((highlight: any, i: number) => <Highlight highlight={highlight} key={i} />) ||
            <><Spinner /></>
          }
        </SimpleGrid>
      </Container>
    </>
  )
}