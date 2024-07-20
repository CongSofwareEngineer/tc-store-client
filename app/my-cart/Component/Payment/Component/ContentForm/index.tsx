import { ContentFormType } from '@/app/my-cart/type'
import InputAreaForm from '@/components/InputAreaForm'
import InputForm from '@/components/InputForm'
import MyImage from '@/components/MyImage'
import OptionVnLocation from '@/components/OptionVnLocation'
import { images } from '@/configs/images'
import useCheckForm from '@/hook/useCheckForm'
import useLanguage from '@/hook/useLanguage'
import React from 'react'

const ContentForm = ({ onChange = () => {} }: ContentFormType) => {
  const { translate } = useLanguage()
  const { checkNumberPhone } = useCheckForm()

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

      <div className="flex md:flex-row gap-6"></div>
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
      </div>
      <OptionVnLocation callback={onChange} />

      <InputAreaForm
        rows={2}
        name="noteBil"
        label={translate('bill.noteBill')}
        className="w-full relative"
      />
    </div>
  )
}

export default ContentForm
