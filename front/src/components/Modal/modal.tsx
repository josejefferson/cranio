import { useRouter } from 'next/router'
import { Button, Divider, Modal, ModalBody, Text, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { Iuser } from "../../pages/login"
type IModal = Iuser & {
	abrir: boolean;
	registration: string;
}

const ModalAlert = ({ abrir, name, courseName, registration }: IModal) => {
	const { onClose } = useDisclosure()
	const router = useRouter()
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
						<Button colorScheme='blue' mr={3} onClick={onClose}>
							Para fechar digite #
						</Button>
						<Button colorScheme='green' onClick={() => router.push(`/challenge/${registration}`)}>
							Para continuar digite *
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default ModalAlert