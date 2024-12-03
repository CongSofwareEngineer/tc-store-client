import React from 'react'
import { IEditItemAttributesProps } from '../ObjAndArr'

const ItemValue = ({ data }: IEditItemAttributesProps) => {
  console.log({ itemValue: data })

  return <div>ItemValue</div>
}

export default ItemValue
