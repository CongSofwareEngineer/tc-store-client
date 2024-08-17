import React from 'react'
import useLanguage from '@/hook/useLanguage'
import InputAreaForm from '../InputAreaForm'
import { images } from '@/configs/images'
import MyImage from '../MyImage'
import OptionVnLocation from '../OptionVnLocation'
import FormInput from '../ShadcnUI/FormInput'

const ContentFormPayment = ({
  onChange,
  form,
}: {
  onChange: (param: any) => void
  form: any
}) => {
  const { translate } = useLanguage()
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
        <FormInput name="sdt" form={form} label={translate('userDetail.sdt')} />

        <FormInput
          name="name"
          form={form}
          label={translate('userDetail.name')}
        />
      </div>
      <div className="md:mt-4 mt-2 w-full" />

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
