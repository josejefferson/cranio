import { Box, HStack, Image, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import React from 'react'
import { Button, Ratio } from 'react-bootstrap'
import { MdCalendarToday, MdDelete, MdEdit, MdStar } from 'react-icons/md'
dayjs.locale('pt-br')
dayjs.extend(relativeTime)

function Highlight({ highlight, handleEdit, handleDelete }: any) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      display="flex"
      flexDirection="column"
    >
      <Ratio aspectRatio="16x9">
        <Image
          src={highlight.image || '/img/highlight-placeholder.svg'}
          fallbackSrc="/img/highlight-placeholder.svg"
          alt="Imagem do anúncio"
          objectFit="cover"
        />
      </Ratio>

      <Box p={3} display="flex" flexDirection="column" height="100%">
        <Text noOfLines={2} fontWeight={500} title={highlight.title}>
          {highlight.title}
        </Text>
        <Text noOfLines={3} mb={1} fontSize="sm" title={highlight.description}>
          {highlight.description}
        </Text>

        <Box fontSize="sm">
          <HStack
            spacing={2}
            w="100%"
            color="purple.500"
            title="Data final"
            hidden={!highlight.endDate}
          >
            <Box>
              <MdCalendarToday />
            </Box>
            <Box w="100%">{dayjs(highlight.endDate).fromNow()}</Box>
          </HStack>

          <HStack
            spacing={2}
            w="100%"
            color="purple.500"
            title="Data final"
            hidden={!highlight.endDate}
          >
            <Box>
              <MdCalendarToday />
            </Box>
            <Box w="100%">{dayjs(highlight.endDate).format('DD/MM/YYYY HH:mm:ss')}</Box>
          </HStack>

          <HStack spacing={2} w="100%" color="purple.500" hidden={highlight.endDate}>
            <Box>
              <MdCalendarToday />
            </Box>
            <Box w="100%">Sem data final</Box>
          </HStack>

          <HStack
            spacing={2}
            mt={1}
            w="100%"
            color="gray.500"
            fontSize="xs"
            title={`Criado em ${dayjs(highlight.createdAt).format('DD/MM/YYYY HH:mm:ss')}`}
            hidden={!highlight.createdAt}
          >
            <Box>
              <MdStar />
            </Box>
            <Box w="100%">{dayjs(highlight.createdAt).fromNow()}</Box>
          </HStack>

          <HStack
            spacing={2}
            w="100%"
            color="gray.500"
            fontSize="xs"
            title={`Editado em ${dayjs(highlight.updatedAt).format('DD/MM/YYYY HH:mm:ss')}`}
            hidden={!highlight.updatedAt}
          >
            <Box>
              <MdEdit />
            </Box>
            <Box w="100%">{dayjs(highlight.updatedAt).fromNow()}</Box>
          </HStack>
        </Box>

        <HStack spacing={1} mt={2} display="flex" flexGrow={1} alignItems="end">
          <Button variant="outline-primary" title="Editar" onClick={() => handleEdit(highlight)}>
            <MdEdit />
          </Button>
          <Button variant="outline-danger" title="Excluir" onClick={() => handleDelete(highlight)}>
            <MdDelete />
          </Button>
        </HStack>
      </Box>
    </Box>
  )
}

export default React.memo(Highlight)
