import { Badge, Box, HStack, Image, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Button, Ratio } from 'react-bootstrap'
import { MdDelete, MdEdit, MdSchool, MdShuffle, MdStar, MdTimer, MdViewList, MdWarning } from 'react-icons/md'
import { courses } from '../Challenges/data'
dayjs.locale('pt-br')
dayjs.extend(relativeTime)

export default function Challenges({ challenge, handleEditButton, handleDeleteButton }: any) {
  challenge.courseName = challenge.course?.map((course: string) => {
    return courses.find((c: any) => c.value === +course)?.name || course
  })

  challenge.courseNames = challenge.courseName?.length > 0 ? challenge.courseName.join(', ') : 'Todas as disciplinas'

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" display="flex" flexDirection="column">
      <Ratio aspectRatio="16x9">
        <Image src={challenge.image || '/img/challenge-placeholder.svg'} alt={''} objectFit="cover" fallbackSrc="/img/challenge-placeholder.svg" />
      </Ratio>

      <Box p={3} display="flex" flexDirection="column" height="100%">
        <Text noOfLines={2} fontWeight={500} title={challenge.question}>{challenge.question}</Text>
        <Box my={1} title={challenge.topic}><Badge>{challenge.topic}</Badge></Box>

        <Box fontSize="sm">
          <HStack spacing={2} w="100%" color="blue.500" fontWeight={500}>
            <Box><MdSchool /></Box>
            <Box w="100%" title={challenge.courseNames}><Text noOfLines={3}>{challenge.courseNames}</Text></Box>
          </HStack>

          <HStack spacing={2} w="100%" color="green.500">
            <Box><MdTimer /></Box>
            <Box w="100%">{challenge.time} segundos</Box>
          </HStack>

          <HStack spacing={2} w="100%" color="purple.500">
            <Box><MdViewList /></Box>
            <Box w="100%">{challenge.alternatives.length} alternativas</Box>
          </HStack>

          <HStack spacing={2} w="100%" color="orange.500" hidden={!challenge.randomizeAlternatives}>
            <Box><MdShuffle /></Box>
            <Box w="100%">Misturar alternativas</Box>
          </HStack>

          <HStack spacing={2} w="100%" color="red.500" hidden={challenge.alternatives.some((alternative: any) => alternative.correct)}>
            <Box><MdWarning /></Box>
            <Box w="100%">Nenhuma alternativa correta selecionada</Box>
          </HStack>

          <HStack
            spacing={2}
            mt={1}
            w="100%"
            color="gray.500"
            fontSize="xs"
            title={`Criado em ${dayjs(challenge.createdAt).format('DD/MM/YYYY HH:mm:ss')}`}
            hidden={!challenge.createdAt}
          >
            <Box><MdStar /></Box>
            <Box w="100%">{dayjs(challenge.createdAt).fromNow()}</Box>
          </HStack>

          <HStack
            spacing={2}
            w="100%"
            color="gray.500"
            fontSize="xs"
            title={`Editado em ${dayjs(challenge.updatedAt).format('DD/MM/YYYY HH:mm:ss')}`}
            hidden={!challenge.updatedAt}
          >
            <Box><MdEdit /></Box>
            <Box w="100%">{dayjs(challenge.updatedAt).fromNow()}</Box>
          </HStack>
        </Box>

        <HStack spacing={1} mt={2} display="flex" flexGrow={1} alignItems="end">
          <Button variant="outline-primary" title="Editar" onClick={handleEditButton}><MdEdit /></Button>
          <Button variant="outline-danger" title="Excluir" onClick={handleDeleteButton}><MdDelete /></Button>
        </HStack>
      </Box>
    </Box>
  )
}