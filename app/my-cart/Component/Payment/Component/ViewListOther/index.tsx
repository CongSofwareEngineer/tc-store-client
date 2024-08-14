import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import { detectImg, numberWithCommas } from '@/utils/functions'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ViewListOther = ({ dataCart }: { dataCart: any[] }) => {
  const { isMobile } = useMedia()
  const { translate, getLabelCategory } = useLanguage()
  const router = useRouter()

  const [listDataValid, setListDataValid] = useState<any[]>([])

  useEffect(() => {
    const arrTemp = dataCart.filter((e) => e?.selected)
    console.log({ arrTemp })
    setListDataValid(arrTemp)
  }, [dataCart])

  const handleClickName = (data: any) => {
    router.push(`/shop/${data?._id}/${data?.keyName}`)
  }

  const renderItemMobile = () => {
    return (
      <div className="w-full flex flex-col">
        <div className="w-full flex gap-4 bg-green-100 border-b-2 border-gray-300 py-3 font-bold">
          {/* header */}
          <div className="w-[100px] text-center">
            {translate('textPopular.image')}
          </div>
          <div className="w-[100px]  flex flex-1">
            {translate('textPopular.nameProduct')}
          </div>
          <div className="w-[20%] text-center">
            {translate('productDetail.price')}
          </div>
          <div className="w-[10%] text-center">
            {translate('textPopular.amount')}
          </div>
          <div className="w-[20%] text-center ">
            {translate('textPopular.totalMoney')}
          </div>
        </div>
        {listDataValid.map((e, index) => {
          return (
            <div
              key={e._id}
              className={`w-full flex gap-4 relative py-2 items-center ${
                index < listDataValid.length - 1 &&
                'border-b-[3px] border-gray-200'
              }`}
            >
              <div className="w-[100px] ">
                <div className="flex justify-center mt-2">
                  <MyImage
                    widthImage={'auto'}
                    heightImage={'80px'}
                    src={detectImg(e.more_data?.imageMain?.toString() || '')}
                    alt={`item-${e.more_data?.name}`}
                  />
                </div>
              </div>
              <div className="w-[100px] flex flex-1">
                <div className="flex flex-col gap-1 w-full">
                  <div className="text-medium font-bold">
                    {e.more_data?.name}
                  </div>
                  <div className="text-[12px] opacity-60">
                    {`${translate('category')} : ${getLabelCategory(
                      e.more_data?.category
                    )}`}
                  </div>
                  <div>{`${translate('textPopular.amount')} : x${
                    e.amount
                  }`}</div>
                  <div className="flex gap-1">
                    <span>{translate('textPopular.totalMoney')} :</span>
                    <span className="font-bold text-green-700">
                      {numberWithCommas(e.amount * e.more_data?.price)} VNĐ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderItemDesktop = () => {
    return (
      <div className="w-full flex flex-col">
        <div className="w-full flex gap-4 bg-green-100 border-b-2 border-gray-300 py-3 font-bold">
          {/* header */}
          <div className="w-[100px] text-center">
            {translate('textPopular.image')}
          </div>
          <div className="w-[100px]  flex flex-1">
            {translate('textPopular.nameProduct')}
          </div>
          <div className="w-[20%] text-center">
            {translate('productDetail.price')}
          </div>
          <div className="w-[10%] text-center">
            {translate('textPopular.amount')}
          </div>
          <div className="w-[20%] text-center ">
            {translate('textPopular.totalMoney')}
          </div>
        </div>

        {listDataValid.map((e, index) => {
          return (
            <div
              key={e._id}
              className={`w-full flex gap-4 relative py-2 items-center ${
                index < listDataValid.length - 1 &&
                'border-b-[3px] border-gray-200'
              }`}
            >
              <div className="w-[100px] ">
                <div className="flex justify-center mt-2">
                  <MyImage
                    widthImage={'auto'}
                    heightImage={'80px'}
                    src={detectImg(e.more_data?.imageMain?.toString() || '')}
                    alt={`item-${e.more_data?.name}`}
                  />
                </div>
              </div>
              <div className="w-[100px] flex flex-1">
                <div className="flex flex-col gap-1">
                  <div
                    className="font-semibold   cursor-pointer md:hover:underline"
                    onClick={() => handleClickName(e.more_data)}
                  >
                    {e.more_data?.name}
                  </div>
                  <div className="opacity-80 text-xs ">
                    {`${translate('category')} : ${
                      getLabelCategory(e.more_data?.category) || 'typeProduct'
                    }`}
                  </div>
                </div>
              </div>
              <div className="w-[20%] ">
                <div className="  text-green-800 flex flex-col  justify-items-start items-center gap-2">
                  <span className="line-through text-xs">
                    {numberWithCommas(e.more_data?.price * 1.2)}
                  </span>
                  <div className=" text-green-800">
                    {numberWithCommas(e.more_data?.price)}
                  </div>
                </div>
              </div>
              <div className="w-[10%] text-center">{`x${e.amount}`}</div>
              <div className="w-[20%] text-green-500 font-bold text-center">
                {numberWithCommas(e.amount * e.more_data?.price)} VNĐ
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="bg-white w-full mt-4 flex flex-col  border-[1px] shadow-gray1 border-gray-300 p-3 px-4 pt-4">
      <div className="flex w-full gap-2">
        <div>
          <MyImage
            src={images.icon.iconCart}
            alt="my-cart-bill"
            widthImage="25px"
            heightImage="25px"
          />
        </div>
        <div className="text-medium font-semibold">
          {translate('bill.infoBill')}
        </div>
      </div>
      <div className="relative w-full border-[1px] my-3 border-gray-300" />
      <div className="w-full overflow-y-auto">
        {isMobile ? renderItemMobile() : renderItemDesktop()}
      </div>
    </div>
  )
}

export default ViewListOther
