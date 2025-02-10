import { Group, Select, SelectProps } from '@mantine/core'
import Image from 'next/image'
import React from 'react'

export type PropsSelectItem = {
  label: string | number
  value: string | number
  icon?: React.ReactNode
  [key: string]: string | number | undefined | React.ReactNode
}

type MySelectType = {
  options: Array<PropsSelectItem> | []
  title?: React.ReactNode
  fullImage?: boolean
}
const MySelect = ({ options = [], title = '', fullImage = false }: MySelectType) => {
  const renderIcon = (icon: any) => {
    if (typeof icon === 'string') {
      return <Image fill className='!relative' src={icon} alt={icon} />
    }

    return icon
  }

  const renderSelectOption: any = ({ option, checked }: any) => (
    <Group flex='1' gap='xs'>
      {option.icon && renderIcon(option.icon)}
      {option.label}
      {/* {checked && <IconCheck style={{ marginInlineStart: 'auto' }} {...iconProps} />} */}
    </Group>
  )

  return (
    <Select
      label='Select with renderOption'
      placeholder='Select text align'
      data={options}
      renderOption={renderSelectOption}
    />
  )
}

export default MySelect
