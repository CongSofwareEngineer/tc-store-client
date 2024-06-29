import React, { useEffect, useState } from 'react'
import { DataItemType, ModalPaymentType } from '../../type'
import useUserData from '@/hook/useUserData'
import useLanguage from '@/hook/useLanguage'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import ClientApi from '@/services/clientApi'
import { BodyAddBill, DataBase, FB_FC } from '@/constant/firebase'
import { QueryKey } from '@/constant/reactQuery'
import MyForm from '@/components/MyForm'
import InputForm from '@/components/InputForm'
import SelectInputEx from '@/app/shop/[...params]/Component/ModalBuy/SelectInputEx'
import ButtonForm from '@/components/ButtonForm'
import BigNumber from 'bignumber.js'
import { numberWithCommas, showNotificationSuccess } from '@/utils/functions'
import useCheckForm from '@/hook/useCheckForm'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import ListItemCart from '../ListItemCart'
import useModalDrawer from '@/hook/useModalDrawer'

const ModalPayment = ({ dataCart, callBack }: ModalPaymentType) => {
  const { userData, isLogin, refreshLogin } = useUserData()
  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()
  const { refreshQuery } = useRefreshQuery()
  const { checkNumberPhone } = useCheckForm()

  const [formData, setFormData] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState(false)
  const [listAddressShip, setListAddressShip] = useState<string[]>([])
  const [lisDataBill, setLisDataBill] = useState<DataItemType[]>([])

  useEffect(() => {
    if (userData) {
      const initData = {
        sdt: userData?.sdt,
        name: userData?.name,
        addressShip: userData?.addressShipper[0] || '',
        linkContact: userData?.linkContact || '',
        gmail: userData?.gmail || '',
      }
      setFormData(initData)
      if (Array.isArray(userData?.addressShipper)) {
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
          total = BigNumber(e.amount)
            .multipliedBy(e.price)
            .plus(total)
            .toNumber()
        }
      }
    })
    return numberWithCommas(total + (plusFee ? 30000 : 0))
  }

  const handleClose = () => {
    refreshQuery(QueryKey.LengthCartUser)
    refreshQuery(QueryKey.MyCartUser)
    closeModalDrawer()
  }

  const handleAddAddress = async (address: string) => {
    const arrNew = [...listAddressShip, address]
    const handleUpdate = async () => {
      await ClientApi.updateAddress(userData?.id, arrNew)
      await refreshLogin()
    }
    handleUpdate()
    setListAddressShip(arrNew)
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

  const handleSubmit = async () => {
    try {
      setLoading(true)
      let totalBill = 0
      const listProduction = dataCart.map((e) => {
        totalBill += e.amount * e.price
        return {
          idProduct: e.idProduct,
          keyNameProduct: e.keyNameProduct,
          amount: e.amount,
        }
      })
      const bodyAPI: BodyAddBill = {
        abort: false,
        addressShip: formData?.addressShip,
        date: Date.now(),
        discount: 0,
        idUser: userData?.id,
        listProduction,
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
      callBack()
      showNotificationSuccess(translate('productDetail.modalBuy.success'))
      handleClose()
    } finally {
      setLoading(false)
    }
  }

  const getOptions = () => {
    if (Array.isArray(listAddressShip) && listAddressShip?.length > 0) {
      return listAddressShip.map((e) => ({ name: e, value: e }))
    }
    return []
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {formData && (
        <MyForm
          onFinish={handleSubmit}
          formData={formData}
          onValuesChange={(_, value) => setFormData({ ...formData, ...value })}
        >
          <div className="bg-white flex flex-col w-full border-[1px] shadow-gray1 border-gray-300  px-4 pt-4 pb-6">
            <div className="flex w-full gap-2">
              <div>
                <MyImage
                  src={images.userDetail.iconUserDetail}
                  alt="my-cart-infoReceived"
                  widthImage="25px"
                  heightImage="25px"
                />
              </div>
              <div className="text-medium font-semibold">
                {translate('bill.infoReceived')}
              </div>
            </div>

            <div className="relative w-full border-[1px] my-3 border-gray-300" />

            <div className="flex md:gap-6 gap-3 flex-col md:grid md:grid-cols-2 ">
              <div className="flex flex-1">
                <InputForm
                  validator={checkNumberPhone}
                  required
                  name="sdt"
                  label={translate('userDetail.sdt')}
                  classFromItem="w-full"
                />
              </div>
              <div className="flex flex-1">
                <InputForm
                  required
                  name="name"
                  label={translate('userDetail.name')}
                  classFromItem="w-full"
                />
              </div>
              <div className="flex flex-1">
                <InputForm
                  name="gmail"
                  label={translate('productDetail.modalBuy.enterGmail')}
                  classFromItem="w-full"
                />
              </div>
              {isLogin ? (
                <SelectInputEx
                  required
                  callBackAdd={(e) => handleAddAddress(e)}
                  name="addressShip"
                  label={translate('productDetail.modalBuy.enterAddress')}
                  options={getOptions()}
                  configSelect={{
                    showSearch: true,
                  }}
                />
              ) : (
                <InputForm
                  required
                  name="addressShip"
                  label={translate('productDetail.modalBuy.enterAddress')}
                  classFromItem="w-full"
                />
              )}
            </div>
          </div>
          <div className="bg-white w-full mt-4 flex flex-col  border-[1px] shadow-gray1 border-gray-300 md:p-3 px-4 pt-4">
            <div className="flex w-full gap-2">
              <div>
                <MyImage
                  src={images.icon.iconCart}
                  alt="my-cart-bill"
                  widthImage="25px"
                  heightImage="25px"
                />
              </div>
              <div className="text-medium font-semibold">
                {translate('bill.infoBill')}
              </div>
            </div>
            <div className="relative w-full border-[1px] my-3 border-gray-300" />
            <div className="w-full min-h-11 max-h-[300px] overflow-y-auto">
              <ListItemCart
                loading={false}
                dataCart={lisDataBill}
                noEdit
                noTitle
              />
            </div>
          </div>
          <div className="bg-white w-full mt-4 flex flex-col  border-[1px] shadow-gray1 border-gray-300 md:p-3 px-4 py-4">
            <div className="flex w-full gap-2">
              <div>
                <MyImage
                  src={images.icon.iconBill}
                  alt="my-cart-bill"
                  widthImage="25px"
                  heightImage="25px"
                />
              </div>
              <div className="text-medium font-semibold">
                {translate('bill.detailPayment')}
              </div>
            </div>
            <div className="relative w-full border-[1px] my-3 border-gray-300" />
            <div className="flex justify-between w-full  mb-1">
              <span>{translate('textPopular.totalMoney')}</span>
              <span className="font-bold text-green-600">
                {getTotalPayBill()} VNĐ
              </span>
            </div>
            <div className="flex justify-between w-full">
              <span>{translate('textPopular.feeShip')}</span>
              <span className="font-bold text-green-600">30,000 VNĐ</span>
            </div>
            <div className="relative w-full border-[1px] my-3 border-gray-300" />
            <div className="flex justify-between w-full">
              <span>{translate('bill.totalBill')}</span>
              <span className="font-bold text-green-600">
                {getTotalPayBill(true)} VNĐ
              </span>
            </div>
            <ButtonForm loading={loading} disableClose />
          </div>
        </MyForm>
      )}
    </div>
  )
}

export default ModalPayment
