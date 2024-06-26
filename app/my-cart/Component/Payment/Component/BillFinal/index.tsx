import ButtonForm from '@/components/ButtonForm'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import useLanguage from '@/hook/useLanguage'
import React from 'react'

const BillFinal = ({
  totalBill,
  totalBillFeeShip,
  loading = false,
}: {
  totalBill: string
  totalBillFeeShip: string
  loading: boolean
}) => {
  const { translate } = useLanguage()

  return (
    <div className="bg-white w-full  flex flex-col  border-[1px] shadow-gray1 border-gray-300 md:p-3 px-4 py-4">
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
        <span className="font-bold text-green-600">{totalBill} VNĐ</span>
      </div>
      <div className="flex justify-between w-full">
        <span>{translate('textPopular.feeShip')}</span>
        <span className="font-bold text-green-600">30,000 VNĐ</span>
      </div>
      <div className="relative w-full border-[1px] my-3 border-gray-300" />
      <div className="flex justify-between w-full">
        <span>{translate('bill.totalBill')}</span>
        <span className="font-bold text-green-600">{totalBillFeeShip} VNĐ</span>
      </div>
      <ButtonForm
        classNameItem={'w-full'}
        classBtnSubmit="w-full  rounded-none"
        className="mt-5"
        loading={loading}
        disableClose
      />
    </div>
  )
}

export default BillFinal
