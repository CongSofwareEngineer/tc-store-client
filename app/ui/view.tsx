'use client'
import { Button, Group, Textarea, TextInput } from '@mantine/core'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Checkbox } from '@mantine/core'
import { PasswordInput } from '@mantine/core'
import { Select } from '@mantine/core'
import { Rating } from '@mantine/core'
import { useForm } from '@mantine/form'

const UiView = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      name: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  useEffect(() => {
    setTimeout(() => {
      form.setFieldValue('name', 'setNameUser')
    }, 2000)
    console.log({ form: form.getValues() })
  }, [form])

  return (
    <>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label='Email'
          placeholder='your@email.com'
          key={form.key('email')}
          {...form.getInputProps('email')}
        />

        <TextInput
          withAsterisk
          label='name'
          placeholder='your@email.com'
          key={form.key('name')}
          {...form.getInputProps('name')}
        />

        <Checkbox
          mt='md'
          label='I agree to sell my privacy'
          key={form.key('termsOfService')}
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group justify='flex-end' mt='md'>
          <Button type='submit'>Submit</Button>
        </Group>
      </form>

      <Rating defaultValue={2} />

      <Select
        label='Your favorite library'
        placeholder='Pick value'
        data={['React', 'Angular', 'Vue', 'Svelte']}
        searchable
      />
      <PasswordInput
        label='Input label'
        description='Input description'
        placeholder='Input placeholder'
      />
      <Checkbox defaultChecked label='I agree to sell my privacy' />
      <Textarea
        label='Input label'
        description='Input description'
        placeholder='Input placeholder'
      />
      <Button>button base</Button>

      <Button component={Link} href='/hello'>
        Next link button
      </Button>
    </>
  )
}

export default UiView
