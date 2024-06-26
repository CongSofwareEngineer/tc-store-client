import { ContentFormType } from '@/app/my-cart/type'
import SelectInputEx from '@/app/shop/[...params]/Component/ModalBuy/SelectInputEx'
import InputAreaForm from '@/components/InputAreaForm'
import InputForm from '@/components/InputForm'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import useCheckForm from '@/hook/useCheckForm'
import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import ClientApi from '@/services/clientApi'
import React from 'react'

const ContentForm = ({
  listAddressShip,
  setListAddressShip = () => {},
}: ContentFormType) => {
  const { translate } = useLanguage()
  const { checkNumberPhone } = useCheckForm()
  const { userData, refreshLogin } = useUserData()

  const handleAddAddress = async (address: string) => {
    const arrNew: string[] = [...listAddressShip, address]
    const handleUpdate = async () => {
      await ClientApi.updateAddress(userData?.id?.toString(), arrNew)
      await refreshLogin()
    }
    handleUpdate()
    setListAddressShip(arrNew)
  }

  const getOptions = () => {
    if (Array.isArray(listAddressShip) && listAddressShip?.length > 0) {
      return listAddressShip.map((e) => ({ name: e, value: e }))
    }
    return []
  }

  return (
    <div className="bg-white flex flex-col w-full border-[1px] shadow-gray1 border-gray-300  px-4 pt-4 lg:pb-0 pb-3">
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

      <div className="flex md:gap-6 gap-3 flex-col md:grid md:grid-cols-2 md:pb-2 pb-0">
        <InputForm
          validator={checkNumberPhone}
          required
          name="sdt"
          label={translate('userDetail.sdt')}
          classFromItem="w-full"
        />
        <InputForm
          required
          name="name"
          label={translate('userDetail.name')}
          classFromItem="w-full"
        />
        <InputForm
          name="gmail"
          label={translate('productDetail.modalBuy.enterGmail')}
          classFromItem="w-full"
        />
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
      </div>
      <InputAreaForm
        name="noteBil"
        label={translate('bill.noteBill')}
        className="w-full relative top-[-10px]"
      />
    </div>
  )
}

export default ContentForm
