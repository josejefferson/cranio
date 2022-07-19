import { CheckboxGroup, Checkbox, Text, FormControl, FormLabel, SimpleGrid } from '@chakra-ui/react'
import { FastField } from 'formik'
import { courses } from './data'

export default function Courses() {
  return (
    <FormControl mt={2}>
      <FormLabel>Cursos</FormLabel>
      <CheckboxGroup>
        <SimpleGrid columns={[1, 2, 3, 4]}>
          {courses.map(({ name, value }: any, i: number) => (
            <FastField type="checkbox" name="courses" value={value.toString()} key={i}>
              {({ field, form }: any) => (
                <Checkbox {...field} value={field.value} checked={field.checked} disabled={form.isSubmitting}>
                  <Text noOfLines={1}>{name}</Text>
                </Checkbox>
              )}
            </FastField>
          ))}
        </SimpleGrid>
      </CheckboxGroup>
    </FormControl>
  )
}