import { Checkbox, FormControl, FormHelperText, FormLabel, SimpleGrid, Text } from '@chakra-ui/react'
import { FastField } from 'formik'
import { courses } from './data'

export default function Courses() {
  return (
    <FormControl mt={2}>
      <FormLabel mb={0}>Cursos</FormLabel>
      <FormHelperText mt={0} mb={2}>
        <small>Caso todos os cursos estejam desmarcados, serão considerados TODOS os cursos.</small>
      </FormHelperText>
      <SimpleGrid columns={[1, 2, 3, 4]}>
        {courses.map(({ name, value }: any, i: number) => (
          <FastField type="checkbox" name="course" value={value.toString()} key={i}>
            {({ field, form }: any) => (
              <Checkbox {...field} isChecked={field.checked} disabled={form.isSubmitting}>
                <Text noOfLines={1}>{name}</Text>
              </Checkbox>
            )}
          </FastField>
        ))}
      </SimpleGrid>
    </FormControl>
  )
}