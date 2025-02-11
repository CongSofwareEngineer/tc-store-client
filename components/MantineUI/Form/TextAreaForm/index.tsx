import { Textarea, TextareaProps } from '@mantine/core'
import React from 'react'

type TextAreaFormProps = {
  form: any
  keyName?: string
  className?: string
} & TextareaProps
const TextAreaForm = ({ form, keyName = '', className = '', ...props }: TextAreaFormProps) => {
  return (
    <Textarea
      key={form.key(keyName)}
      className={className}
      {...props}
      {...form.getInputProps(keyName)}
    />
  )
}

export default TextAreaForm
