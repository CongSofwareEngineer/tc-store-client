import { Select, SelectProps } from 'antd'
// import React, { PropsWithChildren } from 'react'
import React from 'react'
import MyImage from '../MyImage'

export type PropsSelectItem = {
  label: string | number
  value: string | number
  name?: string | number | undefined
  [key: string]: string | number | undefined
}

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

  const renderItemFullImage = (item: any) => {
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
    <Select
      className="w-max"
      labelRender={renderLabel}
      options={option}
      optionRender={(e) => {
        return fullImage ? (
          renderItemFullImage(e)
        ) : (
          <span className="normal-case">{e.label}</span>
        )
      }}
      {...props}
    />
  )
}

export default MySelect
