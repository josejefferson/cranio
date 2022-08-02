import { Heading } from '@chakra-ui/react'
import FormField from '../EditModal/FormField'

export default function HighlightEditForm() {
	return (
		<>
			<Heading mb={2} size="md">Dados do anúncio</Heading>

			<FormField mt={2} label="Título" name="title" size="lg" autoFocus />

			<FormField mt={2} label="Descrição" name="description" />

			<FormField mt={2} label="URL da imagem" name="image" placeholder="https://..." isRequired />

			<FormField mt={2} label="Data final" name="endDateRaw" type="datetime-local" />
		</>
	)
}