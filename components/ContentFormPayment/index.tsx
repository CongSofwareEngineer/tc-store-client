import React from 'react'
import useLanguage from '@/hook/useLanguage'
import { images } from '@/configs/images'
// import OptionVnLocation from '../OptionVnLocation'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import InputForm from '../MantineUI/Form/Input'
const OptionVnLocation = dynamic(() => import('../OptionVnLocation'), { ssr: false })

const ContentFormPayment = ({ onChange, form }: { form: any; onChange: (param: any) => void }) => {
  const { translate } = useLanguage()

  return (
    <div className='bg-white flex flex-col w-full border-[1px] shadow-gray1 border-gray-300  px-4 pt-4 lg:pb-0 pb-3'>
      <div className='flex w-full gap-2'>
        <div>
          <Image
            src={images.userDetail.iconUserDetail}
            alt='my-cart-infoReceived'
            fill
            className='!relative !w-[25px] !h-[25px]'
          />
        </div>
        <div className='text-medium font-semibold'>{translate('bill.infoReceived')}</div>
      </div>

      <div className='relative w-full border-[1px] my-3 border-gray-300' />

      <div className='flex md:gap-6  flex-col md:grid md:grid-cols-2  '>
        <InputForm
          placeholder={translate('userDetail.sdt')}
          required
          label={translate('userDetail.sdt')}
          form={form}
          keyName='sdt'
        />
        <InputForm
          placeholder={translate('userDetail.name')}
          required
          label={translate('userDetail.name')}
          form={form}
          keyName='name'
          maxLength={25}
        />
      </div>

      <OptionVnLocation isNew={false} callback={onChange} />

      <div className='md:mt-2 mt-1' />

      {/* <InputForm
        typeBtn='area'
        maxLength={200}
        showCount
        rows={2}
        name='noteBil'
        label={translate('bill.noteBill')}
      /> */}
    </div>
  )
}

export default ContentFormPayment
