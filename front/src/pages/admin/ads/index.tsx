import { Header } from '@/components/index'
import Head from 'next/head'
import { Heading, Center } from '@chakra-ui/react'
import axios from '@/api/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card, Container, Row, Col, Ratio, ButtonGroup } from 'react-bootstrap'
import { MdEdit, MdDelete, MdOutlineArrowBack, MdOutlineArrowForward } from 'react-icons/md'
import React from 'react'
import _Swal from 'sweetalert2'
import swalReact from 'sweetalert2-react-content'
const Swal = swalReact(_Swal)

export default function Ads() {
  const [ads, setAds] = React.useState<any>(null)

  function loadAds() {
    axios.get('/ads', {
      auth: {
        username: typeof window !== 'undefined' ? localStorage.getItem('cranio.backend.username') || '' : '',
        password: typeof window !== 'undefined' ? localStorage.getItem('cranio.backend.password') || '' : ''
      }
    }).then((res) => {
      setAds(res.data)
    }).catch(async (err) => {
      if (err.response.status === 401) {
        const { value: username } = await Swal.fire({
          title: 'Fazer login',
          input: 'text',
          inputLabel: 'Digite seu usuário',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancelar'
        })

        const { value: password } = await Swal.fire({
          title: 'Fazer login',
          input: 'password',
          inputLabel: 'Digite sua senha',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancelar'
        })

        localStorage.setItem('cranio.backend.username', username)
        localStorage.setItem('cranio.backend.password', password)
        loadAds()
      }
    })
  }
  if (!ads) loadAds()

  const Ad = ({ ad }: any) => (
    <Col className="g-2" sm={12} md={4} lg={3} xl={2}>
      <Card style={{ width: '100%', height: '100%' }}>
        <Ratio aspectRatio="16x9">
          <Card.Img variant="top" src={ad.image} style={{ objectFit: 'cover' }} />
        </Ratio>
        <Card.Body className="d-flex flex-column">
          <Card.Title>{ad.title || '(Sem título)'}</Card.Title>
          <Card.Text>{ad.description}</Card.Text>
          <div className="d-inline-flex flex-grow-1 align-items-end mt-3">
            <ButtonGroup>
              <Button variant="outline-secondary"><MdOutlineArrowBack /></Button>
              <Button variant="outline-primary"><MdEdit /></Button>
              <Button variant="outline-danger"><MdDelete /></Button>
              <Button variant="outline-secondary"><MdOutlineArrowForward /></Button>
            </ButtonGroup>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )

  return (
    <>
      <style>{'body{ background: white; }'}</style>
      <Head>
        <title>Anúncios</title>
      </Head>
      <Header />
      <Center>
        <Heading mt={3}>Anúncios</Heading>
      </Center>
      <Container className="my-3">
        <Row>
          <Heading as="h3" size="lg" mt={5} mb={2} p={0}>Anúncios ativos</Heading>
          {ads?.filter((ad: any) => new Date(ad.endDate) > new Date())
            .map((ad: any, i: number) => (
              <Ad ad={ad} key={i} />
            )) || (
              <>Carregando...</>
            )}
        </Row>

        <Row>
          <Heading as="h3" size="lg" mt={5} mb={2} p={0}>Anúncios passados</Heading>
          {ads?.filter((ad: any) => new Date(ad.endDate) <= new Date())
            .map((ad: any, i: number) => (
              <Ad ad={ad} key={i} />
            )) || (
              <>Carregando...</>
            )}
        </Row>
      </Container>
    </>
  )
}