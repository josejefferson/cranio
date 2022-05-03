import { Button, Divider, Modal, ModalBody, Text, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { Iuser } from "../pages/login"
type IModal = Iuser & {
	abrir: boolean
}
export const ModalAlert = ({ abrir, name, courseName }: IModal) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Modal isOpen={abrir} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Dados do estudante:</ModalHeader>
					<ModalBody>
						<Text>Nome: {name}</Text>
						<Divider />
						<Text>Curso:{courseName}</Text>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='blue' mr={3}>
							Para fechar digite #
						</Button>
						<Button colorScheme='green'>
							Para continuar digite *
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}