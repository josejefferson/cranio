import React from 'react'
import { useRouter } from 'next/router'
import { Button, Divider, Modal, ModalBody, Text, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { Iuser } from '@/interface/index'
import { useLoadingContext } from '@/contexts/loading'
import { BsAsterisk, BsHash } from 'react-icons/bs'

type IModal = Iuser & {
	registration: string
}

const ModalAlert = ({ name, courseName, registration }: IModal) => {
	const { onClose, isOpen, onOpen } = useDisclosure()
	const router = useRouter()
	const loading = useLoadingContext()

	return (
		<>
			<Button id="Open" onClick={onOpen} display={'none'}>Open Modal</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Dados do estudante:</ModalHeader>
					<ModalBody>
						<Text>Nome: {name}</Text>
						<Divider />
						<Text>Curso:{courseName}</Text>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={onClose}
							id="close"
							leftIcon={<BsHash />}
						>
							Corrigir
						</Button>
						<Button colorScheme="green"
							id="router"
							leftIcon={<BsAsterisk />}
							onClick={() => {
								loading(true, 'Procurando um desafio')
								router.push({
									pathname: '/challenge/[slug]',
									query: { slug: registration }
								}).then(() => loading(false))
							}}
						>
							Continuar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default ModalAlert