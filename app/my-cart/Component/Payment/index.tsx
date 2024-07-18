import React, { useEffect, useState } from 'react'
import { DataItemType, PaymentPageType } from '../../type'
import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import { numberWithCommas, showNotificationSuccess } from '@/utils/functions'
import { QueryKey } from '@/constant/reactQuery'
import ClientApi from '@/services/clientApi'
import { BodyAddBill, DataBase, FB_FC } from '@/constant/firebase'
import MyForm from '@/components/MyForm'
import BtnBack from './Component/BtnBack'
import BillFinal from './Component/BillFinal'
import ContentForm from './Component/ContentForm'
import ListProduct from './Component/ListProduct'
import OptionPayment from './Component/OptionPayment'
import useOptionPayment from '@/hook/useOptionPayment'
import ViewListOther from './Component/ViewListOther'

const Payment = ({ dataCart, clickBack, refreshData }: PaymentPageType) => {
  const { translate } = useLanguage()
  const { userData } = useUserData()
  const { refreshQuery } = useRefreshQuery()

  const [formData, setFormData] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState(false)
  const [listAddressShip, setListAddressShip] = useState<string[]>([])
  const [lisDataBill, setLisDataBill] = useState<DataItemType[]>([])
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
    const arr = dataCart.filter((e) => e.selected)
    setLisDataBill(arr)
  }, [userData, dataCart])

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

  const handleDeleteCart = async () => {
    const func = dataCart.map((e) => {
      return ClientApi.requestBase({
        nameDB: DataBase.cartUser,
        body: {
          id: e.id,
        },
        encode: true,
        namFn: FB_FC.deleteData,
      })
    })
    await Promise.all(func)
  }

  const refreshAllData = () => {
    refreshQuery(QueryKey.LengthCartUser)
    refreshQuery(QueryKey.MyCartUser)
    refreshData()
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      let totalBill = 0
      const listBill = dataCart.map((e) => {
        totalBill += e.amount * e.price
        return {
          _id: e.idProduct,
          keyNameProduct: e.keyNameProduct,
          amount: e.amount,
        }
      })
      const bodyAPI: BodyAddBill = {
        addressShip: formData?.addressShip,
        discount: 0,
        idUser: userData?.id,
        listBill,
        total: totalBill,
        sdt: formData?.sdt,
      }
      await handleDeleteCart()

      await ClientApi.requestBase({
        nameDB: DataBase.bill,
        body: {
          data: bodyAPI,
        },
        encode: true,
        namFn: FB_FC.addData,
      })
      refreshAllData()
      showNotificationSuccess(translate('productDetail.modalBuy.success'))
    } finally {
      setLoading(false)
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
                />
                <ViewListOther dataCart={dataCart} />
              </div>

              <div className="lg:w-[300px] flex flex-col md:gap-6 gap-5">
                <OptionPayment
                  onChangeOptions={onChangeOptions}
                  listOptions={listOptions}
                  optionSelected={optionSelected}
                />
                <BillFinal
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
