import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import MyButton from './MyButton'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import FormComobox from './FormComobox'
import MyInput from './MyInput'
import useLanguage from '@/hook/useLanguage'

const MyForm = () => {
  const { translate } = useLanguage()
  const FormSchema = z.object({
    username: z.string().min(1, {
      message: translate('errors.empty'),
    }),
    pass: z.string().min(6, {
      message: translate('errors.invalidPass'),
    }),
    address: z.string(),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      pass: '',
      address: 'dienThanh',
    },
  })

  function onSubmit(values: z.infer<typeof FormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log({ values })
  }

  const LIST = [
    {
      label: 'diencong',
      value: 'diencong',
    },
    {
      label: 'dienThanh',
      value: 'dienThanh',
    },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormComobox
          label="address"
          options={LIST}
          name="address"
          form={form}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <MyInput placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>pass</FormLabel>
              <FormControl>
                <MyInput type="password" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <MyButton type="submit">Submit</MyButton>
      </form>
    </Form>
  )
}

export default MyForm
