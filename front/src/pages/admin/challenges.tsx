import Challenge from '@/components/Admin/Challenges/Challenge'
import DeleteModal from '@/components/Admin/ChallengesEdit/ChallengeDeleteModal'
import EditModal from '@/components/Admin/ChallengesEdit/ChallengeEditModal'
import { Header } from '@/components/index'
import { loginAndGetData } from '@/utils/login-and-get-data'
import { Box, Button, Center, Heading, SimpleGrid, Spinner, useToast } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Head from 'next/head'
import React from 'react'
import { Container } from 'react-bootstrap'
import { MdAdd } from 'react-icons/md'

export default function Challenges() {
  const toast = useToast()
  const [challenges, setChallenges] = React.useState<any>()
  const [currentEditing, setCurrentEditing] = React.useState()
  const [editModalOpen, setEditModalOpen] = React.useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false)
  if (!challenges) loginAndGetData('/challenges', challenges, setChallenges)

  const activeChallenges = challenges?.filter((challenge: any) => challenge.active)
  const inactiveChallenges = challenges?.filter((challenge: any) => !challenge.active)

  /** Ação ao clicar no botão Adicionar */
  const handleAdd = () => {
    setCurrentEditing(undefined)
    setEditModalOpen(true)
  }

  /** Ação ao clicar no botão Editar Desafio */
  const handleEdit = (challenge: any) => {
    setCurrentEditing(challenge)
    setEditModalOpen(true)
  }
  
  /** Ação ao clicar no botão Excluir Desafio */
  const handleDelete = (challenge: any) => {
    setCurrentEditing(challenge)
    setDeleteModalOpen(true)
  }

  /** Ao finalizar a edição de um item */
  const handleEditDone = (data: any, editing = false) => {
    setCurrentEditing(undefined)
    toast({
      title: `O desafio foi ${editing ? 'editado' : 'criado'} com sucesso!`,
      status: 'success'
    })

    if (!editing) setChallenges([...challenges, data])
    else setChallenges(
      challenges.map((challenge: any) => {
        if (challenge._id === data._id) return data
        return challenge
      })
    )
  }

  /** Ao excluir um desafio */
  const handleDeleteDone = (data: any) => {
    setCurrentEditing(undefined)
    toast({
      title: 'O desafio foi excluído com sucesso!',
      status: 'success'
    })
    setChallenges(challenges.filter((challenge:any) => challenge._id !== data._id))
  }

  return (
    <>
      <Head>
        <title>Desafios</title>
      </Head>

      <Header />

      <EditModal open={editModalOpen} setOpen={setEditModalOpen} data={currentEditing} onDone={handleEditDone} />
      <DeleteModal open={deleteModalOpen} setOpen={setDeleteModalOpen} data={currentEditing} onDone={handleDeleteDone} />

      <Center bg="blackAlpha.200">
        <Heading my={[5, 10]} fontWeight={200}>Desafios</Heading>
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
        <Box as="section">
          <Heading as="h3" size="xl" color="blue.500" my={7} p={0}>
            Desafios ativos ({activeChallenges?.length ?? '-'})
          </Heading>

          <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={2}>
            {
              activeChallenges?.map((challenge: any, i: number) =>
                <Challenge
                  challenge={challenge}
                  key={i}
                  handleEditButton={() => handleEdit(challenge)}
                  handleDeleteButton={() => handleDelete(challenge)}
                />
              ) || <Spinner />
            }
          </SimpleGrid>
        </Box>

        <Box as="section">
          <Heading as="h3" size="xl" color="blue.500" my={7} p={0}>
            Desafios resolvidos ou desativados ({inactiveChallenges?.length ?? '-'})
          </Heading>

          <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={2} opacity={0.6}>
            {
              inactiveChallenges?.map((challenge: any, i: number) =>
                <Challenge
                  challenge={challenge}
                  key={i}
                  handleEditButton={() => handleEdit(challenge)}
                  handleDeleteButton={() => handleDelete(challenge)}
                />
              ) || <Spinner />
            }
          </SimpleGrid>
        </Box>
      </Container>
    </>
  )
}