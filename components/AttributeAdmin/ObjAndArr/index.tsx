import React from 'react'
import { IAttributeAdminProps, TypeHandle } from '../inde'
import { Input } from 'antd'
import MyCollapse from '@/components/MyCollapse'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { cloneData } from '@/utils/functions'

export type IEditItemAttributesProps = {
  data: any
  onChangeValue?: (type: TypeHandle, param?: any) => void
  onChangeKey?: (type: TypeHandle, param?: any) => void
}
const ObjAndArr = ({ data, onChangeValue }: IEditItemAttributesProps) => {
  const handleDelete = (index: number) => {
    onChangeValue!('delete', index)
  }

  const handleAdd = () => {
    onChangeValue!('add')
  }

  const onChangeValues = (index: number, val: string) => {
    const dataClone = cloneData(data)
    dataClone.value[index] = val
    onChangeValue!('update', dataClone.value)
  }

  const items = [
    {
      key: 'item.value',
      // expandIcon: <div>{data.value}</div>,
      label: <div>{data.key}</div>,
      children: (
        <div className='px-4 py-2 flex flex-col gap-2'>
          <Input value={data.key} />
          <div className='flex gap-2'>
            <div>List data :</div>
            <div className='text-green-800'>
              <PlusCircleOutlined onClick={handleAdd} />
            </div>
          </div>
          <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
            {data.value.map((e: any, index: number) => {
              return (
                <div className='flex gap-1 justify-center items-center'>
                  <Input value={e} onChange={(val) => onChangeValues!(index, val.target.value)} />
                  <div className='text-red-600 leading-[0px]'>
                    <DeleteOutlined onClick={() => handleDelete(index)} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className='p-0 w-full border-2 bg-[#f3efef] border-gray-300 rounded-lg overflow-hidden'>
      <MyCollapse items={items} className='!bg-[#f3efef]' />
    </div>
  )
}

export default ObjAndArr
