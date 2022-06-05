import React from 'react'
import { Heading } from '@chakra-ui/react'
import axios from '@/api/index'
import { Header } from '@/components/index'
import Table from '@/components/Admin/Logs/Table'
import Filter from '@/components/Admin/Logs/Filter'

function App() {
  const defaultLog = {
    date: Date.now(),
    title: 'Carregando',
    level: 'LOADING',
    contents: ['Carregando logs, aguarde...']
  }
  const [logs, setLogs] = React.useState([defaultLog])
  React.useEffect(() => {
    axios.get('/logs').then((res) => {
      setLogs(res.data.reverse())
    })
  }, [])

  return (
    <>
      <style>{'body{ background: white; color: black; }'}</style>
      <Header />
      <Heading as="h1" my="3" textAlign="center">Logs do site</Heading>
      <Filter logs={logs} setLogs={setLogs} />
      <Table logs={logs} />
    </>
  )
}

export default App
