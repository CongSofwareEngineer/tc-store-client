import React from 'react'
import { TypeHandle } from '../inde'
import MyCollapse, { ItemCollapseProps } from '@/components/MyCollapse'
import { CollapseProps } from 'antd'
import ItemValue from './itemValue'

export type IEditItemAttributesProps = {
  data: any
  onChangeValue?: (type: TypeHandle, param?: any) => void
  onChangeKey?: (type: TypeHandle, param?: any) => void
}

const ArrObject = ({ data, onChangeValue, onChangeKey }: IEditItemAttributesProps) => {
  console.log({ ArrObject: data })

  const renderKy = () => {
    const items: ItemCollapseProps = [
      {
        key: data.key,
        label: <div>{data.key} </div>,
        children: (
          <div className='flex flex-col gap-2'>
            {data.value.map((e: any, index: number) => {
              return <ItemValue data={e} key={`${data.key}-${index}`} />
            })}
          </div>
        ),
      },
    ]

    return <MyCollapse items={items} className='!bg-[#f3efef]' />
  }

  return renderKy()
}

export default ArrObject
