import {
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon
} from '@chakra-ui/react'
import { FastField } from 'formik'

export default function FormField({
  label,
  name,
  type,
  placeholder,
  size,
  autoFocus,
  checkbox = false,
  fieldProps = {},
  inputProps = {},
  left,
  right,
  ...props
}: any) {
  return (
    <FormControl {...props}>
      {label && <FormLabel>{label}</FormLabel>}
      <FastField name={name} {...fieldProps}>
        {({ field, meta, form }: any) => (
          <InputGroup>
            {left && <InputLeftAddon children={left} />}
            {!checkbox && (
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                size={size}
                autoFocus={autoFocus}
                isInvalid={meta.error && meta.touched}
                autoComplete="off"
                disabled={form.isSubmitting}
                {...inputProps}
              />
            )}
            {checkbox && (
              <Checkbox {...field} {...inputProps} disabled={form.isSubmitting}>
                {checkbox}
              </Checkbox>
            )}
            {right && <InputRightAddon children={right} />}
          </InputGroup>
        )}
      </FastField>
    </FormControl>
  )
}
