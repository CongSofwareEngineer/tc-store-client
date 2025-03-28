import React, { useMemo } from 'react'
import { IProduct } from '../../type'
import { Checkbox, ComboboxItem, Select } from '@mantine/core'
import { ISizesModel } from '@/services/ClientApi/type'

type IModels = {
  listModels: IProduct['models']
  onChange: (value: IProduct['configBill']) => void
  value: IProduct['configBill']
}

const Models = ({ listModels, onChange, value }: IModels) => {
  const optionSize = useMemo(() => {
    const sizeMap = new Map<number, ISizesModel>()
    listModels.forEach((model) => {
      model.sizes.forEach((size) => sizeMap.set(size.size, size))
    })
    const arrFilter = Array.from(sizeMap.values()).map((size) => {
      const item: ComboboxItem = {
        label: size.size.toFixed(),
        value: size.size.toFixed(),
        disabled: size.amount <= size.sold,
      }
      return item
    })
    return arrFilter
  }, [listModels])

  const optionModel = useMemo(() => {
    return listModels.map((model) => {
      const isOutSold = model.sizes.some((size) => {
        if (size.amount <= size.sold && size.size === value.size) {
          return true
        }
        return false
      })

      return {
        value: model.model,
        label: model.name,
        isOutSold,
      }
    })
  }, [listModels, value])

  const onChangeModel = (model: string) => {
    onChange({
      ...value,
      model,
    })
  }

  const onChangeSize = (size: string) => {
    onChange({
      ...value,
      size: Number(size),
    })
  }

  if (listModels.length === 0 || !value) {
    return <></>
  }

  return (
    <div className='flex flex-col gap-4'>
      <Select
        label={'Size :'}
        checkIconPosition='right'
        data={optionSize}
        value={value.size.toFixed()}
        className='w-[100px]'
        onChange={(value) => onChangeSize(value?.toString()!)}
      />

      <div className='flex flex-col gap-2'>
        <div>Mẫu (hoặc màu) :</div>
        <div className='flex md:gap-3 gap-2 flex-wrap'>
          {optionModel.map((model) => {
            return (
              <Checkbox
                key={`model_${model.value}`}
                onChange={() => onChangeModel(model.value)}
                checked={value.model === model.value}
                label={
                  <div className='flex items-center gap-1'>
                    <span>{model.label}</span>
                    {model.isOutSold && <span className='text-red-600 text-sm'>(Hết hàng)</span>}
                  </div>
                }
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Models
