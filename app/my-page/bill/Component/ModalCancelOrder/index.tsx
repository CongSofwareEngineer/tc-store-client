import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import { REQUEST_TYPE } from '@/constant/app'
import { QUERY_KEY } from '@/constant/reactQuery'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import ServerApi from '@/services/serverApi'
import { delayTime } from '@/utils/functions'
import {
  showNotificationError,
  showNotificationSuccess,
} from '@/utils/notification'
import React, { useState } from 'react'

const ModalCancelOrder = ({ data }: { data: any }) => {
  const [loading, setLoading] = useState(false)
  const [textWhy, setTextWhy] = useState('')

  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()
  const { refreshQuery } = useRefreshQuery()

  const handleSubmit = async () => {
    setLoading(true)
    const res = await ServerApi.requestBase({
      url: `bill/delete/${data._id}`,
      method: REQUEST_TYPE.DELETE,
    })
    if (res.data) {
      refreshQuery(QUERY_KEY.MyBillUser)
      await delayTime(1000)
      showNotificationSuccess(translate('myBill.cancelOrder.cancelSuccess'))
    } else {
      showNotificationError(translate('myBill.cancelOrder.cancelEror'))
    }
    closeModalDrawer()
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <p className="text-medium font-bold">
        {translate('myBill.cancelOrder.cancelOrder')}
      </p>
      <div className="w-full font-medium">
        {translate('textPopular.reason')}:
      </div>
      <MyInput
        type="area"
        rows={3}
        onChangeText={(e) => setTextWhy(e?.toString() || '')}
      />
      <div className="flex gap-3 w-full mt-4">
        <MyButton
          disabled={!textWhy}
          className={'w-full'}
          loading={loading}
          onClick={handleSubmit}
        >
          {translate('common.submit')}
        </MyButton>
        <MyButton className="w-full" type="primary" onClick={closeModalDrawer}>
          {translate('common.close')}
        </MyButton>
      </div>
    </div>
  )
}

export default ModalCancelOrder
