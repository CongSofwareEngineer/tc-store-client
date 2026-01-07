import React from 'react'
import useLanguage from '@/hooks/useLanguage'
import { images } from '@/configs/images'
import dynamic from 'next/dynamic'
import MyImage from '../../MyImage'
import InputAreaForm from '@/components/Form/InputArea'
import InputForm from '@/components/Form/Input'
import useUserData from '@/hooks/useUserData'
const OptionVnLocation = dynamic(() => import('../../OptionVnLocation'), { ssr: false })

const ContentFormPayment = ({ onChange, form }: { form: any; onChange: (param: any) => void }) => {
  const { translate } = useLanguage()
  const { isLogin } = useUserData()

  return (
    <div className='bg-white flex flex-col w-full border-[1px] shadow-gray1 border-gray-300  px-4 pt-4 lg:pb-0 pb-3'>
      <div className='flex w-full gap-2'>
        <div>
          <MyImage alt='my-cart-infoReceived' className=' !w-[25px] !h-[25px]' src={images.userDetail.iconUserDetail} />
        </div>
        <div className='text-medium font-semibold'>{translate('bill.infoReceived')}</div>
      </div>

      <div className='relative w-full border-[1px] my-3 border-gray-300' />

      <div className='flex md:gap-6  flex-col md:grid md:grid-cols-2  '>
        <InputForm
          required
          disabled={isLogin}
          formData={form}
          keyName='sdt'
          label={translate('userDetail.sdt')}
          placeholder={translate('userDetail.sdt')}
        />
        <InputForm
          required
          formData={form}
          keyName='name'
          label={translate('userDetail.name')}
          maxLength={25}
          placeholder={translate('userDetail.name')}
        />
      </div>

      <OptionVnLocation callback={onChange} isNew={false} />

      <InputAreaForm showCount formData={form} keyName='noteBil' label={translate('bill.noteBill')} maxLength={200} rows={2} />
      <div className='md:mb-5 mb-2' />
    </div>
  )
}

export default ContentFormPayment
