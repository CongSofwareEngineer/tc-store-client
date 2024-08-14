import MyImage from '@/components/MyImage'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import { detectImg, formatPrice } from '@/utils/functions'
import React from 'react'
type Props = {
  data?: any
}
const ViewDetailBill = ({ data }: Props) => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()

  return (
    <div className="flex flex-col w-full gap-4">
      {!isMobile && (
        <p className="text-[22px] mb-2 font-bold text-center">
          {translate('textPopular.viewDetail')}
        </p>
      )}
      {data &&
        data?.listBill?.map((e: any) => {
          return (
            <div
              key={e._id}
              className={`flex gap-2 w-full pb-4 border-b-[3px] border-gray-200`}
            >
              <div className="aspect-square w-[100px] flex justify-center align-middle overflow-hidden">
                <MyImage
                  alt={`icon-product-bill-${e._id}`}
                  src={detectImg(e.more_data.imageMain)}
                  widthImage="auto"
                  heightImage="auto"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold">{e.more_data.name}</p>
                <div>{`${translate('textPopular.amount')} : x${e.amount}`}</div>
                <div className="text-green-500 font-bold">
                  <span className="mr-1">
                    {translate('productDetail.price')} :
                  </span>
                  <span>{formatPrice(e.more_data.price)} VNĐ</span>
                </div>
              </div>
            </div>
          )
        })}
      <div className="text-medium gap-1 flex w-full justify-end font-bold text-green-500 ">
        <span>{translate('textPopular.totalMoney')} : </span>
        <span>{`${formatPrice(data.totalBill || '0')} VNĐ`}</span>
      </div>
    </div>
  )
}

export default ViewDetailBill
