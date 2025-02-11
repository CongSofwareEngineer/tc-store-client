import { TextInput, TextInputProps } from '@mantine/core'
import React from 'react'
type InputFormProps = {
  form: any
  keyName?: string
  className?: string
} & TextInputProps
const InputForm = ({ form, keyName = '', className = '', ...props }: InputFormProps) => {
  return (
    <TextInput
      key={form.key(keyName)}
      className={className}
      {...props}
      {...form.getInputProps(keyName)}
    />
  )
}

export default InputForm
