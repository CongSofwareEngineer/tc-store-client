import React from 'react'
import { PaymentPageType } from '../../type'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import ModalPayment from '../ModalPayment'

const Payment = ({ dataCart, clickBack, refreshData }: PaymentPageType) => {
  return (
    <div className="w-full">
      <div className="flex w-full align-middle justify-start gap-1 mb-3 md:mb-6 items-center ">
        <MyImage
          onClick={clickBack}
          src={images.icon.iconBack}
          widthImage={'25px'}
          heightImage={'25px'}
          alt={'TC Store Icon Back page '}
          className="cursor-pointer"
        />
      </div>
      <ModalPayment dataCart={dataCart} callBack={refreshData} />
    </div>
  )
}

export default Payment
