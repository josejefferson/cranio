import { Box, HStack, Image, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Button, Ratio } from 'react-bootstrap'
import { MdDelete, MdEdit, MdCalendarToday, MdStar } from 'react-icons/md'
dayjs.locale('pt-br')
dayjs.extend(relativeTime)

export default function Highlights({ highlight, handleEditButton, handleDeleteButton }: any) {

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" display="flex" flexDirection="column">
      <Ratio aspectRatio="16x9">
        <Image src={highlight.image || '/img/highlight-placeholder.svg'} alt={''} objectFit="cover" fallbackSrc="/img/highlight-placeholder.svg" />
      </Ratio>

      <Box p={3} display="flex" flexDirection="column" height="100%">
        <Text noOfLines={2} fontWeight={500} title={highlight.title}>{highlight.title}</Text>
        <Text noOfLines={3} mb={1} fontSize="sm" title={highlight.description}>{highlight.description}</Text>
        
        <Box fontSize="sm">
          <HStack spacing={2} w="100%" color="purple.500">
            <Box><MdCalendarToday /></Box>
            <Box w="100%">{dayjs(highlight.endDate).fromNow()}</Box>
          </HStack>
          
          <HStack spacing={2} w="100%" color="purple.500">
            <Box><MdCalendarToday /></Box>
            <Box w="100%">{dayjs(highlight.endDate).format('DD/MM/YYYY HH:mm:ss')}</Box>
          </HStack>

          <HStack spacing={2} w="100%" color="gray.500" fontSize="xs" title="Criado há" mt={1}>
            <Box><MdStar /></Box>
            <Box w="100%">{dayjs(highlight.createdAt).fromNow()}</Box>
          </HStack>

          <HStack spacing={2} w="100%" color="gray.500" fontSize="xs" title="Editado há">
            <Box><MdEdit /></Box>
            <Box w="100%">{dayjs(highlight.updatedAt).fromNow()}</Box>
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