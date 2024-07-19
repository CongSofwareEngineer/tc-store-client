import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import React, { useEffect, useMemo, useState } from 'react'
import { PaymentShopType } from '../../type'
import useOptionPayment from '@/hook/useOptionPayment'
import BillFinal from '@/app/my-cart/Component/Payment/Component/BillFinal'
import OptionPayment from '@/app/my-cart/Component/Payment/Component/OptionPayment'
import MyForm from '@/components/MyForm'
import ContentFormPayment from '@/components/ContentFormPayment'
import BtnBackUI from '@/components/BtnBackUI'
import {
  numberWithCommas,
  scrollTop,
  showNotificationError,
} from '@/utils/functions'
import InfoBill from './InfoBill'
import { QueryKey } from '@/constant/reactQuery'
import { BodyAddBill } from '@/constant/firebase'
import useModalDrawer from '@/hook/useModalDrawer'
import ModalProcess from '@/components/ModalProcess'
import ModalDelete from '@/components/ModalDelete'
import ServerApi from '@/services/serverApi'
import { RequestType } from '@/constant/app'
import ModalSuccess from '@/components/ModalSuccess'

const PaymentShop = ({ data, callBack, amount }: PaymentShopType) => {
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
      addressShip: userData?.addressShipper[0]!,
      linkContact: userData?.linkContact!,
      gmail: userData?.gmail,
      noteBil: '',
    }
    setFormData(initData)
  }, [userData, data, isLogin])

  const isValidSubmit = useMemo(() => {
    if (!formData?.addressShip) {
      return false
    }
    return !!formData?.addressShip.addressDetail
  }, [formData])

  const onChangeAddressShip = (item: any) => {
    setFormData({
      ...formData,
      addressShip: {
        ...item,
      },
    })
  }

  const handleSubmit = async () => {
    const callBack = async () => {
      setLoading(true)

      const bodyBill: BodyAddBill = {
        addressShip: formData?.addressShip,
        discount: 0,
        sdt: formData?.sdt,
        total: amount * data?.price,
        idUser: isLogin ? userData?._id : 'no-id',
        listBill: [
          {
            amount: amount,
            _id: data?._id!,
            keyName: data?.keyName,
          },
        ],
      }
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
      const res = await ServerApi.requestBase({
        url: 'bill/create',
        body: bodyBill,
        method: RequestType.POST,
        encode: true,
      })
      if (res?.data) {
        openModalDrawer({
          content: (
            <ModalSuccess
              showClose={false}
              title={translate('productDetail.modalBuy.success')}
              des={translate('productDetail.modalBuy.successDes')}
            />
          ),
          configModal: {
            showHeader: false,
            overClickClose: false,
          },
        })
        refreshQuery(QueryKey.GetProductByID)
      } else {
        showNotificationError(translate('productDetail.modalBuy.error'))
      }

      setLoading(false)
    }
    openModalDrawer({
      content: (
        <ModalDelete
          autoClose={false}
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
            {/* lg:max-h-[calc(100vh-126px)] hide-scroll */}
            <div className="flex lg:flex-row flex-col lg:gap-6 gap-5">
              <div className="flex flex-1 h-full overflow-y-auto  flex-col lg:max-w-[calc(100%-300px)]">
                <ContentFormPayment onChange={onChangeAddressShip} />
                <InfoBill data={data} amountBuy={amount} />
              </div>

              <div className="lg:w-[350px] flex flex-col md:gap-6 gap-5">
                <OptionPayment
                  onChangeOptions={onChangeOptions}
                  listOptions={listOptions}
                  optionSelected={optionSelected}
                />
                <BillFinal
                  disabledSubmit={!isValidSubmit}
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
