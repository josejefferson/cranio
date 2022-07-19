import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { Formik, Form } from 'formik'

export default function EditModal({ title, data, editing = false, handleSubmit, isOpen, handleClose, children }: any) {
  return (
    <Modal isOpen={isOpen} onClose={() => { }} scrollBehavior="inside">
      <ModalOverlay />
      <Formik initialValues={data} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <ModalContent maxW="2xl">
              <ModalHeader borderBottomWidth="1px">{editing ? 'Editar' : 'Adicionar'} {title}</ModalHeader>
              <ModalCloseButton onClick={handleClose} />
              <ModalBody>{children}</ModalBody>
              <ModalFooter borderTopWidth="1px">
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