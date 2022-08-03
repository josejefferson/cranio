import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import { Formik, Form } from 'formik'

export default function EditModal({ title, data, editing = false, handleSubmit, isOpen, handleClose, error, children }: any) {
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') e.preventDefault()
  }

  return (
    <Modal isOpen={isOpen} onClose={() => { }} scrollBehavior="inside" preserveScrollBarGap blockScrollOnMount={false}>
      <ModalOverlay />
      <Formik initialValues={data} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form onKeyPress={handleKeyPress}>
            <ModalContent maxW="2xl">
              <ModalHeader borderBottomWidth="1px">{editing ? 'Editar' : 'Adicionar'} {title}</ModalHeader>
              <ModalCloseButton onClick={handleClose} />
              <ModalBody>{children}</ModalBody>
              <ModalFooter borderTopWidth="1px">
                <Text color="red" hidden={!error}>Erro: {error}</Text>
                <Button variant="ghost" mr={3} onClick={handleClose}>Cancelar</Button>
                <Button isLoading={isSubmitting} type="submit" colorScheme="blue">Salvar</Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}