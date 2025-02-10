import React from 'react'
export type MyFormProps = {
  form: any
  children?: React.ReactNode
  submit?: (values: unknown) => any
  className?: string
}
const MyForm = ({ form, children, submit = () => {}, className = '' }: MyFormProps) => {
  return form ? (
    <form onSubmit={form.onSubmit(submit)} className={className}>
      {children}
    </form>
  ) : (
    <></>
  )
}

export default MyForm
