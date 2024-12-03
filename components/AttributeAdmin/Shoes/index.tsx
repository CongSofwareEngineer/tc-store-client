import React from 'react'
import { TypeHandle } from '../inde'
import MyCollapse, { ItemCollapseProps } from '@/components/MyCollapse'
import { Button, Input } from 'antd'
import useLanguage from '@/hook/useLanguage'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { cloneData } from '@/utils/functions'

export type IEditItemAttributesProps = {
  data: any
  onChange: (param?: any) => void
}

const AttributeShoes = ({ data, onChange }: IEditItemAttributesProps) => {
  const { translate } = useLanguage()

  const onChangeValueData = (indexParent: number, index: number, key: string, value: any) => {
    const dataClone = cloneData(data)
    dataClone.value[indexParent].colors[index][key] = value
    console.log({ dataClone })
    onChange(dataClone)
  }

  const onChangeKeyData = (params) => {}

  const renderValue = (val: any, index: number) => {
    const key = val['size']
    const value = val['colors']
    const items: ItemCollapseProps = [
      {
        key: `renderValue-${index}`,
        label: <div>{`Size : ${key}`} </div>,
        children: (
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center'>
              <Input className='!w-[200px]' value={key} />
              <div className='text-green-600 text-xl'>
                <PlusCircleOutlined />
              </div>
              <div className='text-red-500 text-xl'>
                <DeleteOutlined className='cursor-pointer' />
              </div>
            </div>
            <div>List data :</div>
            {value.map((valeDetail: any, indexDetail: number) => {
              return (
                <div key={`valeDetail-${indexDetail}`} className='flex gap-2 items-center'>
                  <div className='flex flex-col gap-1'>
                    <div>Color</div>
                    <Input
                      onChange={(e) => onChangeValueData(index, indexDetail, 'color', e.target.value)}
                      value={valeDetail['color']}
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <div>{translate('textPopular.amount')}</div>
                    <Input
                      onChange={(e) => onChangeValueData(index, indexDetail, 'amount', e.target.value)}
                      value={valeDetail['amount']}
                    />
                  </div>
                  <div className='flex text-red-600 flex-col justify-center items-center h-full'>
                    <div className='pb-4' />
                    <DeleteOutlined className='cursor-pointer' />
                  </div>
                </div>
              )
            })}
          </div>
        ),
      },
    ]

    return <MyCollapse items={items} className='!bg-[#f3efef]' />
  }
  const renderKey = () => {
    const items: ItemCollapseProps = [
      {
        key: data.key,
        label: <div>{data.key} </div>,
        children: (
          <div className='flex flex-col gap-2'>
            <div className='flex gap-3 w-[300px]'>
              <div className='flex flex-1'>
                <Button className='flex-1'>Add new</Button>
              </div>
              <div className='flex flex-1'>
                <Button type='primary' className='flex-1'>
                  {translate('common.delete')}
                </Button>
              </div>
            </div>
            {data.value.map((e: any, index: number) => {
              return renderValue(e, index)
            })}
          </div>
        ),
      },
    ]

    return <MyCollapse items={items} className='!bg-[#f3efef]' />
  }

  return renderKey()
}

export default AttributeShoes
