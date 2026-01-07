import { FILTER_BILL } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useQuerySearch from '@/hooks/useQuerySearch'
import { Checkbox } from '@mantine/core'
import React, { useMemo } from 'react'

const OptionFilter = () => {
  const { translate } = useLanguage()
  const { queries, updateQuery } = useQuerySearch()

  const typeBill: FILTER_BILL = useMemo(() => {
    if (queries?.type && queries?.type?.length > 0) {
      return queries?.type[0]! as FILTER_BILL
    }

    return FILTER_BILL.All
  }, [queries])

  const onChangeFilter = (key: FILTER_BILL) => {
    updateQuery('type', key)
  }

  return (
    <div className='flex flex-wrap gap-4 align-middle   '>
      <div className='flex gap-4 flex-wrap items-center '>
        <Checkbox
          checked={typeBill === FILTER_BILL.All}
          label={<div className='text-nowrap'>{translate('textPopular.all')}</div>}
          onChange={() => onChangeFilter(FILTER_BILL.All)}
        />
        <Checkbox
          checked={typeBill === FILTER_BILL.DeliverySuccess}
          label={<div className='text-nowrap'>{translate('myBill.deliverySuccess')}</div>}
          onChange={() => onChangeFilter(FILTER_BILL.DeliverySuccess)}
        />
        <Checkbox
          checked={typeBill === FILTER_BILL.Delivering}
          label={<div className='text-nowrap'>{translate('myBill.delivering')}</div>}
          onChange={() => onChangeFilter(FILTER_BILL.Delivering)}
        />
        <Checkbox
          checked={typeBill === FILTER_BILL.Processing}
          label={<div className='text-nowrap'>{translate('myBill.processing')}</div>}
          onChange={() => onChangeFilter(FILTER_BILL.Processing)}
        />
      </div>
    </div>
  )
}

export default OptionFilter
