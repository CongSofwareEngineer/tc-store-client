import React from 'react'
import { images } from '@/configs/images'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import { detectImg, formatPriceBase, numberWithCommas } from '@/utils/functions'
import MyImage from '@/components/MyImage'
import useRoutePage from '@/hooks/useRoutePage'
import { IInfoBill, IItemInfoBill } from '../type'
import ConfigBill from '@/components/ConfigBill'

const InfoBill = ({ data }: IInfoBill) => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()
  const router = useRoutePage()

  const handleClickName = (data: IItemInfoBill) => {
    router.push(`/shop/${data?.idProduct}/${data?.keyName}`)
  }

  const getUrlImgMain = (item: IItemInfoBill) => {
    let url = ''

    if (item.moreData) {
      url = item.moreData?.images?.[0]?.url.toString() || ''
    } else {
      url = item.images?.[0].url.toString() || ''
    }

    return detectImg(url)
  }

  const renderItemMobile = () => {
    return (
      <div className='w-full flex flex-col'>
        <div className='w-full flex gap-4 bg-green-100 border-b-2 border-gray-300 py-3 font-bold'>
          {/* header */}
          <div className='w-[100px] text-center'>{translate('textPopular.image')}</div>
          <div className='w-[100px]  flex flex-1'>{translate('textPopular.infor')}</div>
        </div>
        {/* content */}
        {data?.map((item, index) => {
          return (
            <div key={`info-bill-${index}`} className='w-full flex gap-4 relative py-2 items-center'>
              <div className='w-[100px] '>
                <div className='flex justify-center mt-2'>
                  <MyImage alt={`item-${item?.name}`} className='!relative !w-auto !h-[80px]' src={getUrlImgMain(item)} />
                </div>
              </div>
              <div className='w-[100px] flex flex-1'>
                <div className='flex flex-col gap-1 w-full'>
                  <div className='text-medium font-bold'>{item?.name || item?.moreData?.name}</div>
                  <div className='text-[12px] opacity-60'>
                    <ConfigBill noCommas className='flex-col !gap-0' item={item} />
                  </div>
                  <div>{`${translate('textPopular.amount')} : x${item?.amountBuy || item?.amount!}`}</div>
                  <div className='flex gap-1'>
                    <span>{translate('textPopular.totalMoney')} :</span>
                    <span className='font-bold text-green-700'>
                      {numberWithCommas((item?.amountBuy || item?.amount!) * (item?.price || item?.moreData?.price || 0))} VNĐ
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
      <div className='w-full flex flex-col'>
        <div className='w-full flex gap-4 bg-green-100 border-b-2 border-gray-300 py-3 font-bold'>
          {/* header */}
          <div className='w-[100px] text-center'>{translate('textPopular.image')}</div>
          <div className='w-[100px]  flex flex-1'>{translate('textPopular.nameProduct')}</div>
          <div className='w-[20%] text-center'>{translate('productDetail.price')}</div>
          <div className='w-[10%] text-center'>{translate('textPopular.amount')}</div>
          <div className='w-[20%] text-center '>{translate('textPopular.totalMoney')}</div>
        </div>
        {/* content */}
        {data?.map((item, index) => {
          return (
            <div key={`info-bill-${index}`} className='w-full flex gap-4 relative py-2 items-center'>
              <div className='w-[100px] '>
                <div className='relative flex justify-center mt-2'>
                  <MyImage alt={`item-${item?.name}`} className='!relative !w-auto !h-[80px]' src={getUrlImgMain(item)} />
                </div>
              </div>
              <div className='w-[100px] flex flex-1'>
                <div className='flex flex-col gap-1'>
                  <div className='font-semibold   cursor-pointer md:hover:underline' onClick={() => handleClickName(item)}>
                    {item?.name || item?.moreData?.name}
                  </div>
                  <ConfigBill noCommas className='flex-col !gap-0' item={item} />
                </div>
              </div>
              <div className='w-[20%] '>
                <div className='  text-green-800 flex flex-col  justify-items-start items-center gap-2'>
                  <span className='line-through text-xs'>
                    {numberWithCommas(formatPriceBase(item?.price || item?.moreData?.price, item.disCount || item.moreData?.disCount))}
                  </span>
                  <div className=' text-green-800'>{numberWithCommas(item?.price || item?.moreData?.price || 0)}</div>
                </div>
              </div>
              <div className='w-[10%] text-center'>{`x${item?.amountBuy || item?.amount}`}</div>
              <div className='w-[20%] text-green-500 font-bold text-center'>
                {numberWithCommas((item?.amountBuy || item?.amount!) * (item?.price || item?.moreData?.price || 0))} VNĐ
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className='bg-white w-full mt-4 flex flex-col  border-[1px] shadow-gray1 border-gray-300 p-3 px-4 pt-4'>
      <div className='flex w-full gap-2'>
        <div>
          <MyImage alt='my-cart-bill' className='!relative !w-[25px] !h-[25px]' src={images.icon.iconCart} />
        </div>
        <div className='text-medium font-semibold'>{translate('bill.infoBill')}</div>
      </div>
      <div className='relative w-full border-[1px] my-3 border-gray-300' />
      <div className='w-full overflow-y-auto'>{isMobile ? renderItemMobile() : renderItemDesktop()}</div>
    </div>
  )
}

export default InfoBill
