import { Select, SelectProps } from 'antd'
import React, { PropsWithChildren } from 'react'

export type PropsSelectItem = {
  label: PropsWithChildren | string,
  value: PropsWithChildren | string,
  description: PropsWithChildren | string
}

type PropsSelect = {
  option: Array<PropsSelectItem> | [],
  classNameItem?: string
} & SelectProps

const MySelect = ({ option, classNameItem, ...props }: PropsSelect) => {
  return (
    <Select className="w-max" showSearch {...props}>
      {option.map((animal: any) => (
        <Select.Option
          className={classNameItem}
          key={animal.value}
          value={animal.value}>
          {animal.label}
        </Select.Option>
      ))}
    </Select>
  )
}

export default MySelect
