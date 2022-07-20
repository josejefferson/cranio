import React from 'react'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, FormControl, FormLabel, Heading, Stack, Switch } from '@chakra-ui/react'
import { FastField } from 'formik'
import FormField from '../EditModal/FormField'
import Alternatives from './Alternatives'
import Creators from './Creators'
import Courses from './Courses'

export default function ChallengeEditForm() {
	return (
		<>
			<Heading mb={2} size="md">Dados do desafio</Heading>

			<FormControl mt={2}>
				<FormLabel mb={1}>Ativo?</FormLabel>
				<FastField name="active">
					{({ field, form }: any) => (
						<Switch isChecked={field.value} {...field} disabled={form.isSubmitting} />
					)}
				</FastField>
			</FormControl>

			<FormField mt={2} label="Pergunta" name="question" size="lg" autoFocus isRequired />

			<FormField mt={2} label="Disciplina ou tópico" name="topic" isRequired inputProps={{ autoComplete: 'on' }} />

			<Stack mt={2} direction={['column', 'row']}>
				<FormField label="Tempo" name="time" type="number" right="segundos" placeholder="60" />

				<FormField label="Tempo de preparação" name="preparationTime" type="number" right="segundos" placeholder="5" />
			</Stack>

			<FormField mt={2} label="URL da imagem" name="image" placeholder="https://..." />

			<Alternatives />

			<FormField mt={2} name="randomizeAlternatives" checkbox="Misturar alternativas" />

			<Heading mt={4} mb={2} size="md">Destinatários</Heading>
			<Courses />

			<Heading mt={4} mb={2} size="md">Remetentes</Heading>
			<Creators />

			<Accordion allowToggle mt={5}>
				<AccordionItem>
					<AccordionButton>
						<Box flex="1" textAlign="left">Opções avançadas</Box><AccordionIcon />
					</AccordionButton>

					<AccordionPanel pb={4}>
						<FormField mt={2} label="Mensagem de preparação" name="preparationMessage" placeholder="O desafio já vai começar!" />

						<FormField mt={2} label="Mensagem de resposta correta" name="correctMessage" placeholder="Você respondeu corretamente! Continue assim." />

						<FormField mt={2} label="Mensagem de resposta incorreta" name="incorrectMessage" placeholder="Não fique triste, você deu o seu melhor! Volte amanhã." />

						<FormField mt={2} label="Mensagem de tempo esgotado" name="timeOutMessage" placeholder="Tic tac, o tempo acabou! Infelizmente você demorou muito e o relógio não parou. Amanhã você terá uma nova chance!" />
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</>
	)
}