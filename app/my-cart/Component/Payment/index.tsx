import React, { useEffect, useMemo, useState } from 'react'
import { PaymentPageType } from '../../type'
import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import { numberWithCommas } from '@/utils/functions'
import { QUERY_KEY } from '@/constant/reactQuery'
import { BodyAddBill } from '@/constant/firebase'
import MyForm from '@/components/Form/MyForm'
import BtnBack from './Component/BtnBack'
import BillFinal from './Component/BillFinal'
import ContentForm from './Component/ContentForm'
import useOptionPayment from '@/hook/useOptionPayment'
import ViewListOther from './Component/ViewListOther'
import { FILTER_BILL, REQUEST_TYPE } from '@/constant/app'
import ModalProcess from '@/components/ModalProcess'
import useModalDrawer from '@/hook/useModalDrawer'
import ModalSuccess from '@/components/ModalSuccess'
import ClientApi from '@/services/clientApi'
import { useRouter } from 'next/navigation'
import OptionsPayemnt from './Component/OptionsPayemnt'
import { showNotificationError } from '@/utils/notification'

const Payment = ({ dataCart, clickBack }: PaymentPageType) => {
  const { translate } = useLanguage()
  const { userData } = useUserData()
  const { refreshQuery } = useRefreshQuery()
  const { openModalDrawer, closeModalDrawer } = useModalDrawer()
  const route = useRouter()

  const [formData, setFormData] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState(false)
  const [listAddressShip, setListAddressShip] = useState<string[]>([])
  const { onChangeOptions, listOptions, optionSelected } = useOptionPayment()

  useEffect(() => {
    if (userData) {
      const initData = {
        sdt: userData?.sdt,
        name: userData?.name,
        addressShip: userData?.addressShipper[0] || '',
        linkContact: userData?.linkContact || '',
        gmail: userData?.gmail || '',
        noteBil: '',
      }
      setFormData(initData)
      if (userData?.addressShipper && Array.isArray(userData?.addressShipper)) {
        setListAddressShip(userData?.addressShipper)
      }
    }
  }, [userData, dataCart])

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

  const getTotalPayBill = (plusFee = false) => {
    let total = 0
    dataCart.forEach((e) => {
      if (e.selected) {
        if (e?.selected) {
          total = Number(e.amount) * Number(e.price) + total
        }
      }
    })
    return numberWithCommas(total + (plusFee ? 30000 : 0))
  }

  const refreshAllData = () => {
    refreshQuery(QUERY_KEY.LengthCartUser)
    refreshQuery(QUERY_KEY.MyCartUser)
    refreshQuery(QUERY_KEY.GetProductByID)
  }

  const handleSubmit = async () => {
    setLoading(true)
    let totalBill = 0
    const listBill: any[] = []
    const listNewSoldProduct: any[] = []
    dataCart.forEach((e) => {
      if (e.selected) {
        totalBill += e.amount * e.more_data.price
        const itemBill = {
          _id: e.more_data._id,
          keyName: e.more_data.keyName,
          amount: e.amount,
          idCart: e._id,
        }
        const itemNewSold = {
          idProduct: e.more_data._id,
          sold: Number(e.amount) + Number(e.more_data.sold),
        }

        listNewSoldProduct.push(itemNewSold)
        listBill.push(itemBill)
      }
    })
    const bodyAPI: BodyAddBill = {
      addressShip: formData?.addressShip,
      discount: 0,
      idUser: userData?._id,
      listBill,
      totalBill: totalBill,
      sdt: formData?.sdt,
      status: FILTER_BILL.Processing,
      listNewSoldProduct,
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
    const res = await ClientApi.fetchData({
      url: 'bill/create',
      body: bodyAPI,
      method: REQUEST_TYPE.POST,
    })
    if (res?.data) {
      refreshAllData()
      openModalDrawer({
        content: (
          <ModalSuccess
            showClose
            title={translate('productDetail.modalBuy.success')}
            des={translate('productDetail.modalBuy.successDes')}
            titleSubmit={translate('common.viewBill')}
            titleClose={translate('common.ok')}
            callback={() => {
              route.push('/my-page/bill')
              closeModalDrawer()
            }}
          />
        ),
      })
      clickBack()
    } else {
      showNotificationError(translate('productDetail.modalBuy.error'))
    }
  }

  return (
    <div className="w-full mb-7 mt-1">
      <BtnBack clickBack={clickBack} />
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
                <ContentForm
                  listAddressShip={listAddressShip}
                  setListAddressShip={setListAddressShip}
                  onChange={onChangeAddressShip}
                />
                <ViewListOther dataCart={dataCart} />
              </div>

              <div className="lg:w-[300px] flex flex-col md:gap-6 gap-5">
                <OptionsPayemnt
                  onChangeOptions={onChangeOptions}
                  listOptions={listOptions}
                  optionSelected={optionSelected}
                />
                <BillFinal
                  disabledSubmit={!isValidSubmit}
                  loading={loading}
                  totalBill={getTotalPayBill()}
                  totalBillFeeShip={getTotalPayBill(true)}
                />
              </div>
            </div>
          </MyForm>
        )}
      </div>
    </div>
  )
}

export default Payment
