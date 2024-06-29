import React, { useEffect, useState } from 'react'
import { ModalBuyLoginType } from '../../type'
import useUserData from '@/hook/useUserData'
import useLanguage from '@/hook/useLanguage'
import MyForm from '@/components/MyForm'
import InputForm from '@/components/InputForm'
import { parsePhoneNumber } from 'libphonenumber-js'
import SelectInputEx from './SelectInputEx'
import ClientApi from '@/services/clientApi'
import { DataBase, FB_FC } from '@/constant/firebase'
import {
  formatPrice,
  showNotificationError,
  showNotificationSuccess,
} from '@/utils/functions'
import ViewItem from './viewItem'
import useMedia from '@/hook/useMedia'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import { QueryKey } from '@/constant/reactQuery'
import ButtonForm from '@/components/ButtonForm'
import useModalDrawer from '@/hook/useModalDrawer'

const ModalBuyLogin = ({ data, amount }: ModalBuyLoginType) => {
  const { userData, isLogin, refreshLogin } = useUserData()
  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()
  const { isMobile } = useMedia()
  const { refreshQuery } = useRefreshQuery()

  const [formData, setFormData] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState(false)
  const [listAddressShip, setListAddressShip] = useState<string[]>([])
  console.log({ datadetail: data })

  useEffect(() => {
    if (userData && isLogin) {
      const initData = {
        sdt: userData?.sdt,
        name: userData?.name,
        addressShip: userData?.addressShipper[0] || '',
        linkContact: userData?.linkContact || '',
        gmail: userData?.gmail || '',
        amount: amount,
      }
      setFormData(initData)
      if (Array.isArray(userData?.addressShipper)) {
        setListAddressShip(userData?.addressShipper)
      }
    } else {
      const initData = {
        sdt: '',
        name: '',
        addressShip: '',
        linkContact: '',
        gmail: '',
        amount: amount,
      }
      setFormData(initData)
    }
  }, [userData, amount, isLogin])

  const getOptions = () => {
    if (Array.isArray(listAddressShip) && listAddressShip?.length > 0) {
      return listAddressShip.map((e) => ({ name: e, value: e }))
    }
    return []
  }

  const handleAddAddress = async (address: string) => {
    const arrNew = [...listAddressShip, address]
    const handleUpdate = async () => {
      await ClientApi.requestBase({
        nameDB: DataBase.user,
        body: {
          id: userData?.id,
          data: {
            addressShipper: arrNew,
          },
        },
        namFn: FB_FC.updateData,
        encode: true,
      })
      await refreshLogin()
    }
    handleUpdate()
    setListAddressShip(arrNew)
  }

  const checkNumber = (sdt: string): string | null => {
    if (!sdt) {
      return translate('warning.errorSDT')
    }
    const phoneNumber = parsePhoneNumber(sdt, 'VN')
    if (phoneNumber && phoneNumber.isValid()) {
      return null
    }
    return translate('warning.errorSDT')
  }

  const handleClose = () => {
    refreshQuery(QueryKey.LengthCartUser)
    refreshQuery(QueryKey.GetProductByID)
    closeModalDrawer()
  }

  const updateProduction = async () => {
    await ClientApi.requestBase({
      body: {
        data: {
          sold: Number(data?.sold) + amount,
        },
        id: data?.id,
      },
      nameDB: DataBase.productShop,
      namFn: FB_FC.updateData,
      encode: true,
    })
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const dataBill = {
        amount,
        date: Date.now(),
        discount: 0,
        keyNameProduct: data?.keyName.toString(),
        idUser: userData?.id,
        addressShip: formData?.addressShip,
        total: amount * data?.price,
        abort: true,
      }
      const bought = await ClientApi.requestBase({
        body: {
          data: dataBill,
        },
        nameDB: DataBase.bill,
        namFn: FB_FC.addData,
        encode: true,
      })
      await updateProduction()

      if (bought.data) {
        handleClose()
        showNotificationSuccess(translate('productDetail.modalBuy.success'))
      } else {
        showNotificationError(translate('productDetail.modalBuy.error'))
      }
    } catch (error) {
      showNotificationError(translate('productDetail.modalBuy.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {!isMobile && (
        <p className="text-center text-medium font-bold uppercase">
          {translate('productDetail.modalBuy.titleOder')}
        </p>
      )}

      {formData && (
        <MyForm
          onFinish={handleSubmit}
          formData={formData}
          onValuesChange={(_, value) => setFormData({ ...formData, ...value })}
        >
          <div className="flex md:gap-6 gap-3 md:flex-row flex-col">
            <div className="flex flex-1">
              <InputForm
                validator={checkNumber}
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

          <div className="w-full">
            <div className="font-bold">
              {translate('textPopular.product')} :
            </div>

            <ViewItem
              data={data}
              amount={formData?.amount}
              setAmount={(e) => setFormData({ ...formData, amount: e })}
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="w-full bg-slate-400 h-[1px]" />
            <div className="w-full flex gap-1 justify-end items-end">
              <span>{translate('cart.totalPayment')} : </span>
              <span className="font-medium text-red-500">
                {formatPrice(data?.price * formData?.amount)} VNĐ
              </span>
            </div>
          </div>

          <ButtonForm loading={loading} disableClose />
        </MyForm>
      )}
    </div>
  )
}

export default ModalBuyLogin
