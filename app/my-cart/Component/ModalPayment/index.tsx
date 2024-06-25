import React, { useEffect, useState } from 'react'
import { DataItemType, ModalPaymentType } from '../../type'
import useUserData from '@/hook/useUserData'
import useLanguage from '@/hook/useLanguage'
import useModal from '@/hook/useModal'
import useDrawer from '@/hook/useDrawer'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import ClientApi from '@/services/clientApi'
import { BodyAddBill, DataBase, FB_FC } from '@/constant/firebase'
import { QueryKey } from '@/constant/reactQuery'
import MyForm from '@/components/MyForm'
import InputForm from '@/components/InputForm'
import SelectInputEx from '@/app/shop/[...params]/Component/ModalBuy/SelectInputEx'
import ButtonForm from '@/components/ButtonForm'
import useMedia from '@/hook/useMedia'
import BigNumber from 'bignumber.js'
import { numberWithCommas, showNotificationSuccess } from '@/utils/functions'
import useCheckForm from '@/hook/useCheckForm'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import ListItemCart from '../ListItemCart'

const ModalPayment = ({ dataCart, callBack }: ModalPaymentType) => {
  const { userData, isLogin, refreshLogin } = useUserData()
  const { translate } = useLanguage()
  const { closeModal } = useModal()
  const { closeDrawer } = useDrawer()
  const { refreshQuery } = useRefreshQuery()
  const { isMobile } = useMedia()
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

  const getAmountBuy = () => {
    let amount = 0
    dataCart.forEach((e) => {
      if (e.selected) {
        amount += e.amount
      }
    })
    return amount
  }

  const getTotalPayBill = () => {
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
    return numberWithCommas(total)
  }

  const handleClose = () => {
    refreshQuery(QueryKey.LengthCartUser)
    refreshQuery(QueryKey.MyCartUser)
    if (isMobile) {
      closeDrawer()
    } else {
      closeModal()
    }
  }

  const handleAddAddress = async (address: string) => {
    const arrNew = [...listAddressShip, address]
    const handleUpdate = async () => {
      await ClientApi.updateAddress(userData?.id?.toString(), arrNew)
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
        idUser: userData?.id.toString(),
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
      <div className="flex gap-2">
        <span>{translate('textPopular.amount')} : </span>
        <span className="text-green-600 font-bold">{getAmountBuy()} </span>
      </div>

      <div className="flex gap-2">
        <span>{translate('textPopular.totalMoney')} : </span>
        <span className="text-green-600 font-bold">
          {getTotalPayBill()} VNĐ
        </span>
      </div>
      {formData && (
        <MyForm
          onFinish={handleSubmit}
          formData={formData}
          onValuesChange={(_, value) => setFormData({ ...formData, ...value })}
        >
          <div className="flex md:gap-6 gap-3  flex-col">
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
          <div className="w-full">
            <ListItemCart
              loading={false}
              dataCart={lisDataBill}
              noEdit
              noTitle
            />
          </div>
          <ButtonForm loading={loading} disableClose />
        </MyForm>
      )}
    </div>
  )
}

export default ModalPayment
