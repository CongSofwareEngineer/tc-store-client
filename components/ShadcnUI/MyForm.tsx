import React from 'react'
import { FormState, UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form'

type Props = {
  form: UseFormReturn<any, any>
  onSubmit: (param?: FormState<{ [key: string]: any }>) => Promise<void> | void
  children?: React.ReactNode
}
const MyFormShadcn = ({ form, onSubmit, children }: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {children}
      </form>
    </Form>
  )
}

export default MyFormShadcn
