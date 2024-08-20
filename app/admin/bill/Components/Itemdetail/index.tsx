import MyImage from '@/components/MyImage'
import useMedia from '@/hook/useMedia'
import { detectImg, formatPrice } from '@/utils/functions'
import React from 'react'

const ItemDetail = ({ data }: { data: any }) => {
  const { isMobile } = useMedia()

  const renderAddress = () => {
    if (data.addressShip.addressDetail) {
      return (
        <div className="flex gap-1">
          <span className="text-nowrap">Address :</span>
          <div>{`${
            data.addressShip.addressDetail
          } (${data.addressShip.address.replaceAll('---', ', ')})`}</div>
        </div>
      )
    }
  }

  return (
    <div className="flex flex-col w-full gap-2">
      {!isMobile && (
        <p className="text-center text-medium font-bold ">Bill detail</p>
      )}
      {renderAddress()}
      {data?.note && (
        <div className="flex gap-1">
          <span className="text-nowrap">Note :</span>
          <div>{data?.note}</div>
        </div>
      )}

      {data?.listBill.map((e: any) => {
        return (
          <div
            className={`flex gap-4 w-full justify-center items-center border-b-2 border-gray-300 pb-5 pt-5`}
            key={e._id}
          >
            <div className="w-[150px] aspect-square overflow-hidden">
              <MyImage
                alt={`img-product`}
                src={detectImg(e?.more_data?.imageMain)}
                widthImage="100%"
                heightImage="auto"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex gap-2 text-medium font-bold">
                {e.more_data.name}
              </div>
              <div className="flex gap-2 ">
                <span className="font-bold">Amount :</span>
                <span>{e.amount}</span>
              </div>
              <div className="flex gap-2 ">
                <span className="font-bold">Price :</span>
                <span className="text-green-500 font-bold">
                  {formatPrice(e.more_data.price)}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ItemDetail
