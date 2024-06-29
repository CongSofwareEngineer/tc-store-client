import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import React, { useEffect, useState } from 'react'
import { PaymentShopType } from '../../type'
import useOptionPayment from '@/hook/useOptionPayment'
import BillFinal from '@/app/my-cart/Component/Payment/Component/BillFinal'
import OptionPayment from '@/app/my-cart/Component/Payment/Component/OptionPayment'
import MyForm from '@/components/MyForm'
import ContentFormPayment from '@/components/ContentFormPayment'
import BtnBackUI from '@/components/BtnBackUI'
import {
  delayTime,
  numberWithCommas,
  scrollTop,
  showNotificationSuccess,
} from '@/utils/functions'
import InfoBill from './InfoBill'
import { QueryKey } from '@/constant/reactQuery'
import { BodyAddBill } from '@/constant/firebase'
import useModalDrawer from '@/hook/useModalDrawer'
import ModalProcess from '@/components/ModalProcess'
import ModalDelete from '@/components/ModalDelete'

const PaymentShop = ({
  data,
  callBack,
  amount,
  clickBack,
}: PaymentShopType) => {
  const { translate } = useLanguage()
  const { userData, isLogin } = useUserData()
  const { refreshQuery } = useRefreshQuery()
  const { openModalDrawer } = useModalDrawer()
  const { onChangeOptions, listOptions, optionSelected } = useOptionPayment()

  const [formData, setFormData] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    scrollTop()
    const initData = {
      sdt: userData?.sdt,
      name: userData?.name,
      addressShip: userData?.addressShipper[0] || '',
      linkContact: userData?.linkContact || '',
      gmail: userData?.gmail || '',
      noteBil: '',
    }
    setFormData(initData)
  }, [userData, data, isLogin])

  const handleSubmit = async () => {
    const callBack = async () => {
      setLoading(true)
      openModalDrawer({
        content: (
          <ModalProcess
            title={translate('confirm.bill.createBill')}
            des={translate('confirm.bill.createBill_Des')}
          />
        ),
        configModal: {
          showHeader: false,
          showBtnClose: false,
          overClickClose: false,
        },
      })
      const bodyBill: BodyAddBill = {
        abort: false,
        addressShip: formData?.addressShip,
        date: Date.now(),
        discount: 0,
        sdt: formData?.sdt,
        total: amount * data?.price,
        idUser: isLogin ? userData?.id : 'no-id',
        listProduction: [
          {
            amount: amount,
            idProduct: data?.id || '',
            keyNameProduct: data?.keyName,
          },
        ],
        iDBanking: Date.now(),
      }
      console.log('====================================')
      console.log({ data, formData, optionSelected, clickBack, bodyBill })
      console.log('====================================')

      // await handlePayment(bodyBill)
      // await ClientApi.createBill(bodyBill)
      await delayTime(3000)
      showNotificationSuccess(translate('productDetail.modalBuy.success'))
      refreshQuery(QueryKey.GetProductByID)
      setLoading(false)
    }
    openModalDrawer({
      content: (
        <ModalDelete
          callback={callBack}
          title={translate('confirm.bill.confirm')}
          des={translate('confirm.bill.confirm_des')}
          titleConfirm={translate('common.submit')}
        />
      ),
    })
  }

  return (
    <div className="w-full md:mb-7 mb-10 mt-1">
      <BtnBackUI
        clickBack={callBack}
        titlePageMain={translate('header.shop')}
        titlePage={data?.name}
      />
      <div className="flex flex-col gap-3 w-full mt-1">
        {formData && (
          <MyForm
            onFinish={handleSubmit}
            formData={formData}
            onValuesChange={(_, value) =>
              setFormData({ ...formData, ...value })
            }
          >
            <div className="flex lg:flex-row flex-col lg:gap-6 gap-5">
              <div className="flex flex-1 flex-col lg:max-w-[calc(100%-300px)]">
                <ContentFormPayment />
                <InfoBill data={data} amountBuy={amount} />
              </div>

              <div className="lg:w-[300px] flex flex-col md:gap-6 gap-5">
                <OptionPayment
                  onChangeOptions={onChangeOptions}
                  listOptions={listOptions}
                  optionSelected={optionSelected}
                />
                <BillFinal
                  loading={loading}
                  totalBill={numberWithCommas(amount * data?.price)}
                  totalBillFeeShip={numberWithCommas(
                    amount * data?.price + 30000
                  )}
                />
              </div>
            </div>
          </MyForm>
        )}
      </div>
    </div>
  )
}

export default PaymentShop
