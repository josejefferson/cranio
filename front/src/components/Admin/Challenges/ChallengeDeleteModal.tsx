import axios from '@/api/index'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'

export default function DeleteChallengeModal({ open, setOpen, data, onDone }: any) {
  const [error, setError] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Ao fechar o modal
  const handleClose = () => {
    setOpen(false)
    setIsSubmitting(false)
    setError('')
  }

  // Ao enviar o formulário
  const handleConfirm = () => {
    const auth = {
      username: localStorage.getItem('cranio.backend.username') || '',
      password: localStorage.getItem('cranio.backend.password') || ''
    }

    setIsSubmitting(true)
    axios.delete(`/admin/challenges/${data._id}`).then(success).catch(error)

    // Sucesso ao enviar o formulário
    function success() {
      setIsSubmitting(false)
      handleClose()
      onDone(data)
    }

    // Erro ao enviar o formulário
    function error(err: any) {
      setIsSubmitting(false)
      console.error(err)
      if (typeof err?.response?.data === 'object' && err?.response?.data?.error) {
        setError(`(${err?.response?.data?.code}) ${err?.response?.data?.message}`)
      } else {
        setError(err?.message)
      }
    }
  }

  return (
    <Modal isOpen={open} onClose={handleClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxW="2xl">
        <ModalHeader borderBottomWidth="1px">Excluir desafio</ModalHeader>
        <ModalCloseButton onClick={handleClose} />
        <ModalBody>
          Tem certeza que deseja excluir o seguinte desafio?<br />
          <b>&quot;{data?.question}&quot;</b>
        </ModalBody>
        <ModalFooter borderTopWidth="1px">
          <Text color="red" hidden={!error}>Erro: {error}</Text>
          <Button autoFocus variant="ghost" mr={3} onClick={handleClose}>Não</Button>
          <Button isLoading={isSubmitting} colorScheme="red" onClick={handleConfirm}>Sim</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}