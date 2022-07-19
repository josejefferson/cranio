import { Box, Button, FormControl, FormLabel, HStack, IconButton, Stack, VStack } from '@chakra-ui/react'
import { FieldArray, useFormikContext } from 'formik'
import { MdAdd, MdDelete } from 'react-icons/md'
import { emptyCreator } from './data'
import FormField from '../EditModal/FormField'

export default function Creators() {
  const { isSubmitting } = useFormikContext()

  return (
    <FormControl mt={2}>
      <FieldArray name="createdBy" render={(array) => (<>
        <VStack spacing={2}>
          {array.form.values.createdBy.map(Creator(array, isSubmitting))}
        </VStack>

        <Button
          mt={3}
          size="sm"
          colorScheme="green"
          onClick={() => array.push(emptyCreator)}
          leftIcon={<MdAdd />}
          disabled={isSubmitting}
        >
          Adicionar remetente
        </Button>
      </>)} />
    </FormControl>
  )
}

export function Creator(array: any, isSubmitting: boolean) {
  return ({ name, email }: any, i: number) => (
    <HStack spacing={3} w="100%" key={i}>
      <Stack direction={['column', 'row']} w="100%">
        <Box w="100%">
          <FormField label="Nome" name={`createdBy.${i}.name`} size="sm" isRequired inputProps={{ autoComplete: 'on' }} />
        </Box>

        <Box w="100%">
          <FormField label="E-mail" name={`createdBy.${i}.email`} type="email" size="sm" isRequired inputProps={{ autoComplete: 'on' }} />
        </Box>
      </Stack>

      <Box>
        <FormLabel>&nbsp;</FormLabel>
        <IconButton
          aria-label="Excluir"
          size="sm"
          colorScheme="red"
          onClick={() => array.remove(i)}
          disabled={isSubmitting}
        >
          <MdDelete />
        </IconButton>
      </Box>
    </HStack>
  )
}