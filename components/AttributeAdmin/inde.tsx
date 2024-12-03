import React, { useEffect, useState } from 'react'
import ObjAndArr from './ObjAndArr'
import { cloneData } from '@/utils/functions'
import styled from 'styled-components'
import { Button, Collapse } from 'antd'
import { COLOR_CONFIG } from '@/constant/app'
import { ITYPE_PRODUCT, TYPE_PRODUCT } from '@/constant/admin'
import ArrObject from './ArrObject'
import AttributeShoes from './Shoes'
import useLanguage from '@/hook/useLanguage'
import { Noto_Sans_Gunjala_Gondi } from 'next/font/google'
export type TypeHandle = 'add' | 'update' | 'delete'
export type TypeValue = 'arr' | 'object' | 'string'
export type IAttributeAdminProps = {
  data: any
  onChange: (type: TypeHandle, param?: any) => void
  typeProduct?: string
}

const CollapseCustom = styled(Collapse)`
  border: 1px solid ${COLOR_CONFIG['gray-5']} !important;
  overflow: hidden;
  .ant-collapse-header {
    background-color: #fbfbfb;
  }
  .ant-collapse-content {
    padding: 12px;
  }
  .ant-collapse-item {
    border-bottom: 0px !important;
  }
`
const AttributeAdmin = ({ data, onChange, typeProduct = 'shoes' }: IAttributeAdminProps) => {
  const { translate } = useLanguage()
  const [dataAttributes, setDataAttributes] = useState<any[]>([])

  useEffect(() => {
    const listTemp: any[] = []

    Object.entries(data).forEach(([key, value]: any[]) => {
      listTemp.push({
        key,
        value,
      })
    })
    setDataAttributes(listTemp)
  }, [])

  const handleSubmitValue = (type: TypeValue, value: any) => {
    const ob: any = {}
    switch (type) {
      case 'arr':
        value.forEach((e: any) => {
          if (!ob[e.key]) {
            ob[e.key] = e.value
          }
        })

        break

      default:
        break
    }

    onChange(ob)
  }

  const onChangeValue = (typeValue: TypeValue, type: TypeHandle, param?: any, index?: number) => {
    const dataClone = cloneData(dataAttributes)

    switch (type) {
      case 'add':
        switch (typeValue) {
          case 'arr':
            const nameKey = dataClone[index!].value.length + 1
            dataClone[index!].value.push(`new-${nameKey}`)
            setDataAttributes(dataClone)
            handleSubmitValue('arr', dataClone)
            break

          default:
            break
        }
        break

      case 'update':
        switch (typeValue) {
          case 'arr':
            dataClone[index!].value = param
            setDataAttributes(dataClone)
            handleSubmitValue('arr', dataClone)
            break

          default:
            break
        }
        break

      default:
        switch (typeValue) {
          case 'arr':
            dataClone[index!].value = dataClone[index!].value.filter(
              (_: any, indexFilter: number) => indexFilter !== param,
            )
            setDataAttributes(dataClone)
            handleSubmitValue('arr', dataClone)
            break

          default:
            break
        }

        break
    }
  }

  const convertArrToStringValue = (params: any[]) => {
    const objTemp: any = {}
    params.forEach((e) => {
      objTemp[e.key] = e.value
    })
    onChange(objTemp)
  }

  const onChangeValueData = (index: number, params: any) => {
    const dataAttributeClone = cloneData(dataAttributes)
    dataAttributeClone[index] = params
    setDataAttributes(dataAttributeClone)
    convertArrToStringValue(dataAttributeClone)
  }

  const items = [
    {
      key: 'Attribute',
      label: <div>Attribute </div>,
      children: (
        <div className='flex flex-col gap-2'>
          {dataAttributes.map((e, index) => {
            switch (typeProduct) {
              case TYPE_PRODUCT.shoes:
                return (
                  <AttributeShoes
                    onChange={(param) => onChangeValueData(index, param)}
                    key={`item-${index}`}
                    data={e}
                  />
                )

              default:
                return <div> coming soon</div>
            }
          })}
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
        </div>
      ),
    },
  ]

  return (
    <div className='flex flex-col gap-2 w-full'>
      <CollapseCustom items={items} />
      {/* <div className='flex flex-col gap-2'>
        {dataAttributes.map((e, index) => {
          // if (Array.isArray(e.value)) {
          //   return <ObjAndArr data={e} onChangeValue={(type, value) => onChangeValue('arr', type, value, index)} />
          // }
          switch (typeAttributes) {
            case 'arrObject':
              return <ArrObject data={e} />

            default:
              return <div> coming soon</div>
          }
        })}
      </div> */}
    </div>
  )
}

export default AttributeAdmin
