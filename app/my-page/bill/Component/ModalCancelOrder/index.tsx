import { QUERY_KEY } from '@/constants/reactQuery'
import useRefreshQuery from '@/hooks/tank-query/useRefreshQuery'
import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'
import ClientApi from '@/services/clientApi'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import { Button, Textarea } from '@mantine/core'
import React, { useState } from 'react'

const ModalCancelOrder = ({ data }: { data: any }) => {
  const [loading, setLoading] = useState(false)
  const [textWhy, setTextWhy] = useState('')

  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()
  const { refreshQuery } = useRefreshQuery()

  const handleSubmit = async () => {
    setLoading(true)
    const res = await ClientApi.deleteBill(data._id)
    if (res.data) {
      await refreshQuery(QUERY_KEY.MyBillUser)
      showNotificationSuccess(translate('myBill.cancelOrder.cancelSuccess'))
    } else {
      showNotificationError(translate('myBill.cancelOrder.cancelEror'))
    }
    closeModalDrawer()
    setLoading(false)
  }

  return (
    <div className='flex flex-col gap-2 w-full items-center'>
      <p className='text-medium font-bold'>{translate('myBill.cancelOrder.cancelOrder')}</p>
      <div className='w-full font-medium'>{translate('textPopular.reason')}:</div>
      <Textarea className='w-full' rows={3} onChange={(e) => setTextWhy(e.target.value)} />
      <div className='flex gap-3 w-full mt-4'>
        <Button className='!w-full' variant='filled' onClick={closeModalDrawer}>
          {translate('common.close')}
        </Button>
        <Button disabled={!textWhy} className={'!w-full'} loading={loading} onClick={handleSubmit}>
          {translate('common.submit')}
        </Button>
      </div>
    </div>
  )
}

export default ModalCancelOrder
