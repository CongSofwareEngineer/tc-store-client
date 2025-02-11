import { Select } from '@mantine/core'
import React from 'react'
type SelectProp = {}
const MySelect = () => {
  return (
    <Select
      label='Your favorite library'
      placeholder='Pick value'
      data={[
        {
          label,
          value,
        },
      ]}
    />
  )
}

export default MySelect
