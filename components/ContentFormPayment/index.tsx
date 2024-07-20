import useCheckForm from '@/hook/useCheckForm'
import useUserData from '@/hook/useUserData'
import React, { useEffect, useState } from 'react'
import InputForm from '../InputForm'
import useLanguage from '@/hook/useLanguage'
import InputAreaForm from '../InputAreaForm'
import { images } from '@/configs/images'
import MyImage from '../MyImage'
import OptionVnLocation from '../OptionVnLocation'

const ContentFormPayment = ({
  onChange,
}: {
  onChange: (param: any) => void
}) => {
  const { checkNumberPhone } = useCheckForm()
  const { userData } = useUserData()
  const { translate } = useLanguage()

  const [listAddressShip, setListAddressShip] = useState<string[]>([])

  useEffect(() => {
    if (userData?.addressShipper && Array.isArray(userData?.addressShipper)) {
      setListAddressShip(userData?.addressShipper)
    }
  }, [userData])
  console.log({ listAddressShip })

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

      <div className="flex md:gap-6 gap-2 flex-col md:grid md:grid-cols-2 md:pb-2 pb-0">
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
      </div>
      <div className="md:mt-4 mt-2" />

      <OptionVnLocation callback={onChange} />

      <div className="md:mt-2 mt-1" />

      <InputAreaForm
        rows={2}
        name="noteBil"
        label={translate('bill.noteBill')}
        className="w-full relative"
      />
    </div>
  )
}

export default ContentFormPayment
