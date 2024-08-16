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
  typeBtn: HTMLInputTypeAttribute
  placeholder?: string
}
const FormInput = ({ label, form, name, typeBtn = 'text' }: Props) => {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label}</FormLabel>
          <FormControl>
            <MyInput type={typeBtn} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormInput
