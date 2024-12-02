import React, { useEffect, useState } from 'react'
import ObjAndArr from './ObjAndArr'
import { cloneData } from '@/utils/functions'

export type TypeHandle = 'add' | 'update' | 'delete'
export type TypeValue = 'arr' | 'object' | 'string'
export type IAttributeAdminProps = {
  data: any
  onChange: (type: TypeHandle, param?: any) => void
}
const AttributeAdmin = ({ data, onChange }: IAttributeAdminProps) => {
  const [dataAttributes, setDataAttributes] = useState<any[]>([])

  useEffect(() => {
    const listTemp: any[] = []
    Object.entries(data).map(([key, value]) => {
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

  return (
    <div className='flex flex-col gap-2 w-full'>
      {dataAttributes.map((e, index) => {
        if (Array.isArray(e.value)) {
          return <ObjAndArr data={e} onChangeValue={(type, value) => onChangeValue('arr', type, value, index)} />
        }
        return <div> coming soon</div>
      })}
    </div>
  )
}

export default AttributeAdmin
