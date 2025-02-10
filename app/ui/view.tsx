'use client'
import { Box, Button, Drawer, Group, Modal, Textarea, TextInput } from '@mantine/core'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Checkbox } from '@mantine/core'
import { PasswordInput } from '@mantine/core'
import { Select } from '@mantine/core'
import { Rating } from '@mantine/core'
import { useForm } from '@mantine/form'
import InputSearch from '../shop/Component/InputSearch'
import { MultiSelect } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { DatePicker } from 'antd'
import { DatePickerInput } from '@mantine/dates'

const UiView = () => {
  const [valueDate, setValueDate] = useState<Date | null>(null)

  const [opened, { open, close }] = useDisclosure(false)
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      name: '',
      termsOfService: false,
      date: '',
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
    <Box>
      <DatePicker value={valueDate} onChange={setValueDate} />

      <Drawer opened={opened} onClose={close} position='bottom' title='Authentication'>
        {/* Drawer content */}
        <div>Drawer content</div>
      </Drawer>

      <Button variant='filled' onClick={open}>
        Open Drawer
      </Button>

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <DatePickerInput
          label='Pick date'
          placeholder='Pick date'
          key={form.key('date')}
          {...form.getInputProps('date')}
        />

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

      <InputSearch />

      <Select
        label='Your favorite library'
        placeholder='Pick value'
        data={['React', 'Angular', 'Vue', 'Svelte']}
        searchable
      />

      <MultiSelect
        label='Your favorite libraries'
        placeholder='Pick value'
        data={['React', 'Angular', 'Vue', 'Svelte']}
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

      <Modal opened={openedModal} onClose={closeModal} centered closeOnClickOutside={false}>
        <div>Modal content</div>
      </Modal>

      <Button onClick={openModal}>Open modal</Button>
    </Box>
  )
}

export default UiView
