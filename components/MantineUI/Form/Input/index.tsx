import { TextInput } from '@mantine/core'
import React from 'react'
type InputFormProps = {
  form: any
  keyName?: string
  className?: string
}
const InputForm = ({ form, keyName = '', className = '' }: InputFormProps) => {
  return (
    <TextInput
      withAsterisk
      key={form.key(keyName)}
      className={className}
      {...form.getInputProps(keyName)}
    />
  )
}

export default InputForm
