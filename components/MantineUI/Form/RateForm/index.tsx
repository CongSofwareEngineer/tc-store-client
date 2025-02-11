import { RatingProps, Rating } from '@mantine/core'
import React from 'react'

type RateFormProps = {
  form: any
  keyName?: string
  className?: string
} & RatingProps
const RateForm = ({ form, keyName = '', className = '', ...props }: RateFormProps) => {
  return (
    <Rating
      key={form.key(keyName)}
      className={className}
      {...props}
      {...form.getInputProps(keyName)}
    />
  )
}

export default RateForm
