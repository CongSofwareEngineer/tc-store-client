import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Checkbox } from '../ui/checkbox'
type Props = {
  label?: string
  name: string
  form?: any
  disabled?: boolean
}
const FormCheckBox = ({ label, form, name, disabled = false }: Props) => {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex gap-2 items-center">
            <FormLabel className="capitalize font-[400]">{label}</FormLabel>
            <FormControl>
              <Checkbox
                disabled={disabled}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormCheckBox
