import React from 'react'
import {
  Input,
  Button,
  Heading,
  Container,
  Textarea,
  Center,
  Box,
  Flex,
  Select
} from '@chakra-ui/react'
import axios from '@/api/index'
import { FaTrash } from 'react-icons/fa'

export default function Filter({ logs, setLogs }: any) {
  const [filter, setFilter] = React.useState('{}')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [conditions, setConditions] = React.useState<any[]>([])

  const checkInputValidity = () => {
    try {
      const result = JSON.parse(filter)
      return !Array.isArray(result) && result !== null
    } catch {
      return false
    }
  }

  const filterResults = async () => {
    if (!checkInputValidity()) return
    setLoading(true)
    const { data } = await axios.get('/logs/search', {
      params: { q: filter }, validateStatus: () => true
    })
    if (data.error) {
      setError(data.message)
    } else {
      setError('')
      setLogs(data.reverse())
    }
    setLoading(false)
  }


  const inputTypes: any = {
    String: (value: any, onChange: any) => <Input type="text" width="23%" value={value} onChange={onChange} />,
    Number: (value: any, onChange: any) => <Input type="number" width="23%" value={value} onChange={onChange} />,
    Date: (value: any, onChange: any) => <Input type="datetime-local" width="23%" value={value} onChange={onChange} />,
    Boolean: (value: any, onChange: any) => (
      <Select width="23%" value={value} onChange={onChange}>
        <option value="1">Verdadeiro</option>
        <option value="">Falso</option>
      </Select>
    )
  }

  const generateFilters = () => {
    const myFilter: any = {}
    for (let { property, comparation, valueType, value } of conditions) {
      let typedValue: any = value
      switch (valueType) {
        case 'Number': typedValue = Number(value); break
        case 'Boolean': typedValue = Boolean(value); break
        case 'Date': typedValue = new Date(value.toString()).toISOString(); break
      }
      myFilter[property] = { [comparation]: typedValue }
    }
    setFilter(JSON.stringify(myFilter))
  }

  return (
    <Container maxW="container.lg" mb="3">
      <Textarea
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        pr="4.5rem"
        placeholder="Filtro"
        isInvalid={!checkInputValidity()}
      />
      <Box hidden={!conditions.length}>
        <Heading as="h4" size="md" mt="3" mb="2" textAlign="center">Condições</Heading>
        <Flex mb="1" gap="1">
          <Center width="23%">Propriedade</Center>
          <Center width="23%">Comparação</Center>
          <Center width="23%">Tipo de valor</Center>
          <Center width="23%">Valor</Center>
          <Center width="8%">Rem.</Center>
        </Flex>
        {conditions.map((condition: any, i: number) => {
          return (
            <Flex gap="1" mb="1" key={i}>
              <Input
                type="text"
                list="properties"
                width="23%"
                value={condition.property}
                onChange={(e) => {
                  setConditions((conditions: any) => {
                    conditions[i].property = e.target.value
                    return [...conditions]
                  })
                }} />

              <datalist id="properties">
                <option value="date" />
                <option value="level" />
                <option value="title" />
                <option value="content" />
                <option value="details.status" />
                <option value="details.method" />
                <option value="details.url" />
              </datalist>

              <Select
                width="23%"
                value={condition.comparation}
                onChange={(e) => {
                  setConditions((conditions: any) => {
                    conditions[i].comparation = e.target.value
                    return [...conditions]
                  })
                }}
              >
                <option value="$eq">= Igual</option>
                <option value="$ne">≠ Diferente</option>
                <option value="$lt">&lt; Menor</option>
                <option value="$gt">&gt; Maior</option>
                <option value="$lte">≤ Menor ou igual</option>
                <option value="$gte">≥ Maior ou igual</option>
              </Select>

              <Select
                width="23%"
                value={condition.valueType}
                onChange={(e) => {
                  setConditions((conditions: any) => {
                    conditions[i].valueType = e.target.value
                    return [...conditions]
                  })
                }}
              >
                <option value="String">String</option>
                <option value="Number">Número</option>
                <option value="Boolean">Booleano</option>
                <option value="Date">Data</option>
              </Select>

              {inputTypes[condition.valueType](condition.value, (e: any) => {
                setConditions((conditions: any) => {
                  conditions[i].value = e.target.value
                  return [...conditions]
                })
              })}

              <Button colorScheme="red" width="8%" onClick={() => {
                setConditions((conditions: any) => {
                  conditions = [...conditions]
                  conditions.splice(i, 1)
                  return conditions
                })
              }}><FaTrash /></Button>
            </Flex>
          )
        })}
      </Box>
      <Box mt="2" textAlign="center">
        <Button
          colorScheme="green"
          mr="2"
          onClick={() => {
            setConditions((conditions: any) => [...conditions, {
              property: '', comparation: '$eq', valueType: 'String', value: ''
            }])
          }}
        >
          Adicionar condição
        </Button>
        <Button colorScheme="orange" mr="2" onClick={generateFilters} hidden={!conditions.length}>
          Gerar filtro
        </Button>
        <Button
          colorScheme="red"
          onClick={() => setFilter('{}')}
          mr="2"
        >
          Limpar filtros
        </Button>
        <Button
          colorScheme="blue"
          disabled={loading}
          onClick={() => filterResults()}
        >
          Filtrar
        </Button>
      </Box>
      <Box textAlign="center" color="red" display="block">{error}</Box>
      <Heading as="h5" size="sm" mt="3" textAlign="center">{logs.length} LOGS</Heading>
    </Container>
  )
}