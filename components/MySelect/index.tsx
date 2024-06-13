import { Select, SelectProps } from 'antd'
// import React, { PropsWithChildren } from 'react'
import React from 'react'
import MyImage from '../MyImage'

export type PropsSelectItem = {
  label: string | number
  value: string | number
  name?: string | number
} & Record<string, string | number>

type PropsSelect = {
  option: Array<PropsSelectItem> | []
  classNameItem?: string
  fullImage?: boolean
} & SelectProps

interface LabelInValueType {
  label: React.ReactNode
  value: string | number
  key?: React.Key
  name?: string
}

const MySelect = ({
  option,
  classNameItem,
  fullImage = false,
  ...props
}: PropsSelect) => {
  const renderLabel = (item: LabelInValueType) => {
    return <span>{item.label || item.name || item.value}</span>
  }

  const renderItemFullImage = (item: PropsSelectItem) => {
    return (
      <div className="flex flex-col gap-2">
        <span className="normal-case">{item.label || item.name}</span>
        {item?.image && (
          <MyImage
            src={item?.image?.toString()}
            alt={`select-item-${item.label || item.name}`}
            width={100}
            height={100}
          />
        )}
      </div>
    )
  }

  return (
    <Select className="w-max" labelRender={renderLabel} {...props}>
      {option.map((animal: PropsSelectItem) => (
        <Select.Option
          className={classNameItem}
          key={animal.value || animal.name}
          value={animal.value || animal.name}
        >
          {fullImage ? (
            renderItemFullImage(animal)
          ) : (
            <span className="normal-case">{animal.label || animal.name}</span>
          )}
        </Select.Option>
      ))}
    </Select>
  )
}

export default MySelect
