import React, { HTMLInputTypeAttribute } from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import MyInput from './MyInput'
type Props = {
  label?: string
  name: string
  form?: any
  typeBtn?: HTMLInputTypeAttribute
  placeholder?: string
  disabled?: boolean
}
const FormInput = ({
  label,
  form,
  name,
  typeBtn = 'text',
  placeholder = '',
  disabled = false,
}: Props) => {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize font-[400]">{label}</FormLabel>
          <FormControl>
            <MyInput
              type={typeBtn}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormInput
