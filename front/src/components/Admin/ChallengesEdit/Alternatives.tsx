import { useRef } from 'react'
import { Box, Button, FormControl, FormLabel, HStack, IconButton, Stack, VStack } from '@chakra-ui/react'
import { FieldArray, useFormikContext } from 'formik'
import { MdAdd, MdClose, MdDelete, MdDone } from 'react-icons/md'
import { emptyAlternative } from './data'
import FormField from '../EditModal/FormField'
import scrollList from '@/utils/scrollList'

export default function Alternatives() {
  const { isSubmitting } = useFormikContext()
  const listRef = useRef([])

  return (
    <FormControl mt={2}>
      <FormLabel>Alternativas</FormLabel>
      <FieldArray name="alternatives" render={(array) => (<>
        <VStack spacing={2}>
          {array.form.values.alternatives.map(Alternative(array, listRef, isSubmitting))}
        </VStack>

        {
          !array.form.values.alternatives.some((alternative: any) => alternative.correct) &&
          <Box color="red" fontSize="sm" mt={2}>Nenhuma alternativa correta selecionada</Box>
        }

        <Button
          mt={3}
          size="sm"
          colorScheme="green"
          onClick={() => array.push(emptyAlternative)}
          leftIcon={<MdAdd />}
          disabled={isSubmitting}
        >
          Adicionar alternativa
        </Button>
      </>)} />
    </FormControl>
  )
}

export function Alternative(array: any, listRef: any, isSubmitting: boolean) {
  return ({ title, correct }: any, i: number) => (
    <HStack spacing={3} w="100%" key={i} ref={(ref) => (listRef.current[i] = ref)}>
      <Box w="100%">
        <FormField
          name={`alternatives.${i}.title`}
          placeholder={`Resposta ${i + 1}`}
          isRequired
          size="sm"
          onKeyDown={(e: any) => scrollList(e, i, array, listRef)}
        />
      </Box>

      <Box>
        <label>
          <IconButton
            size="sm"
            variant="ghost"
            colorScheme={correct ? 'green' : 'red'}
            aria-label={correct ? 'Marcar como incorreto' : 'Marcar como correto'}
            disabled={isSubmitting}
            tabIndex={0}
            as="div"
          >
            {correct ? <MdDone /> : <MdClose />}
          </IconButton>

          <FormField
            name={`alternatives.${i}.correct`}
            type="checkbox"
            inputProps={{ style: { display: 'none' } }}
          />
        </label>
      </Box>

      <Box>
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