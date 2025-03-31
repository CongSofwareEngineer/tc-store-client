import useLanguage from '@/hooks/useLanguage'
import React from 'react'
import { IProductCart } from '../ListItemCart/type'
import { cn } from '@/utils/tailwind'

const ConfigBill = ({
  item,
  classContent = '',
  noCommas = false,
  className = '',
}: {
  item?: IProductCart
  noCommas?: boolean
  classContent?: string
  className?: string
}) => {
  const { translate } = useLanguage()

  return Object.entries(item?.configBill || item?.configCart || {}).length > 1 ? (
    <div className={cn('flex  flex-row  md:gap-3 gap-2', className)}>
      {Object.entries(item?.configBill || item?.configCart!).map(([key, value], index: number) => {
        const keyLocal: any = `textPopular.${key}`
        let valueLocal: any = `admin.${key}.${value}`

        if (key === 'model') {
          const info = item?.moreData?.models.find((e) => e.model === value)
          valueLocal = info?.name
        }

        return (
          <div key={key} className={cn('flex gap-1 text-xs', classContent)}>
            <div>{translate(keyLocal) || key}</div>
            <span>:</span>
            {key === 'model' ? (
              <div className='whitespace-nowrap'>{valueLocal}</div>
            ) : (
              <div className='whitespace-nowrap'>{translate(valueLocal) || value}</div>
            )}

            {index + 1 < Object.entries(item?.configBill || item?.configCart || {}).length &&
              !noCommas && <span>,</span>}
          </div>
        )
      })}
    </div>
  ) : (
    <></>
  )
}

export default ConfigBill
