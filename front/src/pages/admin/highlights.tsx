/* eslint-disable @next/next/no-html-link-for-pages */
import Highlight from '@/components/Admin/Highlights/Highlight'
import DeleteModal from '@/components/Admin/HighlightsEdit/HighlightDeleteModal'
import EditModal from '@/components/Admin/HighlightsEdit/HighlightEditModal'
import { Header } from '@/components/index'
import { loginAndGetData } from '@/utils/login-and-get-data'
import { Box, Button, Center, CircularProgress, Heading, SimpleGrid, useToast } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Head from 'next/head'
import React from 'react'
import { Container } from 'react-bootstrap'
import { MdAdd } from 'react-icons/md'

export default function Highlights() {
  const toast = useToast()
  const [highlights, setHighlights] = React.useState<any>()
  const [currentEditing, setCurrentEditing] = React.useState()
  const [editModalOpen, setEditModalOpen] = React.useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false)
  if (!highlights) loginAndGetData('/highlights', highlights, setHighlights)

  const activeHighlights = highlights?.filter((highlight: any) => new Date(highlight.endDate) >= new Date())
  const inactiveHighlights = highlights?.filter((highlight: any) => new Date(highlight.endDate) < new Date())

  /** Ação ao clicar no botão Adicionar */
  const handleAdd = () => {
    setCurrentEditing(undefined)
    setEditModalOpen(true)
  }

  /** Ação ao clicar no botão Editar Anúncio */
  const handleEdit = (highlight: any) => {
    setCurrentEditing({ ...highlight })
    setEditModalOpen(true)
  }

  /** Ação ao clicar no botão Excluir Anúncio */
  const handleDelete = (highlight: any) => {
    setCurrentEditing(highlight)
    setDeleteModalOpen(true)
  }

  /** Ao finalizar a edição de um item */
  const handleEditDone = (data: any, editing = false) => {
    setCurrentEditing(undefined)
    toast({
      title: `O anúncio foi ${editing ? 'editado' : 'criado'} com sucesso!`,
      status: 'success'
    })

    if (!editing) setHighlights([...highlights, data])
    else setHighlights(
      highlights.map((highlight: any) => {
        if (highlight._id === data._id) return data
        return highlight
      })
    )
  }

  /** Ao excluir um anúncio */
  const handleDeleteDone = (data: any) => {
    setCurrentEditing(undefined)
    toast({
      title: 'O anúncio foi excluído com sucesso!',
      status: 'success'
    })
    setHighlights(highlights.filter((highlight: any) => highlight._id !== data._id))
  }

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest-admin.json" />
        <title>Anúncios</title>
      </Head>

      <a href="/admin"><Header /></a>

      <EditModal open={editModalOpen} setOpen={setEditModalOpen} data={currentEditing} onDone={handleEditDone} />
      <DeleteModal open={deleteModalOpen} setOpen={setDeleteModalOpen} data={currentEditing} onDone={handleDeleteDone} />

      <Center bg="blackAlpha.200">
        <Heading my={[5, 10]} fontWeight={200}>Anúncios</Heading>
      </Center>

      <Button
        size="lg"
        colorScheme="teal"
        rightIcon={<MdAdd />}
        borderRadius="1000"
        boxShadow="md"
        position="fixed"
        bottom="3"
        right="3"
        zIndex="1"
        onClick={handleAdd}
      >
        Adicionar
      </Button>

      <Container className="my-3">
        <Box hidden={activeHighlights || inactiveHighlights} textAlign="center">
          <CircularProgress isIndeterminate color="blue.500" trackColor="transparent" />
        </Box>

        <Box as="section" hidden={!activeHighlights}>
          <Heading as="h3" size="xl" color="blue.500" my={7} p={0}>
            Anúncios ativos ({activeHighlights?.length ?? '-'})
          </Heading>

          <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={2}>
            {
              activeHighlights?.map((highlight: any, i: number) =>
                <Highlight
                  highlight={highlight}
                  key={i}
                  handleEditButton={() => handleEdit(highlight)}
                  handleDeleteButton={() => handleDelete(highlight)}
                />
              )
            }
          </SimpleGrid>
        </Box>

        <Box as="section" hidden={!inactiveHighlights}>
          <Heading as="h3" size="xl" color="blue.500" my={7} p={0}>
            Anúncios passados ({inactiveHighlights?.length ?? '-'})
          </Heading>

          <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={2} opacity={0.6}>
            {
              inactiveHighlights?.map((highlight: any, i: number) =>
                <Highlight
                  highlight={highlight}
                  key={i}
                  handleEditButton={() => handleEdit(highlight)}
                  handleDeleteButton={() => handleDelete(highlight)}
                />
              )
            }
          </SimpleGrid>
        </Box>

        <Box h="60px" />
      </Container>
    </>
  )
}