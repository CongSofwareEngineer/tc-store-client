'use client'
import React, { useState } from 'react'
import { ItemDetailType } from './type'
import PrimaryButton from '@/components/PrimaryButton'
import useLanguage from '@/hook/useLanguage'
import Media from 'react-media'
import BtnBack from '@/components/BtnBack'
import MyImage from '@/components/MyImage'
import { formatPrice, formatPriceBase } from '@/utils/functions'
import InfoItemDetail from '@/components/InfoItemDetail'
import SubAndPlus from '@/components/SubAndPlus'

const ShopDetail: React.FC<ItemDetailType> = ({ productDetail }) => {
  const { translate } = useLanguage()
  const [amountBuy, setAmountBuy] = useState(1)

  const renderDesktop = () => {
    return (
      <div>
        <div>{productDetail.name}</div>
        <PrimaryButton>{translate('common.buy')}</PrimaryButton>
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div className="flex flex-col gap-2">
        <BtnBack title={['Shopp', productDetail.name]} url={['/shop']} />
        <div className="bg-white py-[10%] shadow-lg shadow-yellow-50  w-full flex justify-center items-center">
          <div className="w-[80%]   aspect-square overflow-hidden ">
            <MyImage
              src={productDetail.imageMain || ''}
              alt={productDetail.des || ''}
              widthImage="100%"
              heightImage="auto"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 mt-2">
          <div className="text-title font-bold">{productDetail.name}</div>
          <InfoItemDetail data={productDetail} />
          <div className="text-medium  line-through">
            {formatPriceBase(
              productDetail?.price || '0',
              productDetail?.discount
            )}
          </div>
          <div className="text-title font-bold text-green-500">
            {`${formatPrice(
              Number(productDetail?.price || '0') * amountBuy
            )} VNĐ`}
          </div>
          <SubAndPlus
            callBackSub={(e) => setAmountBuy(e)}
            value={amountBuy}
            maxAmount={productDetail.amount - productDetail.sold}
            callBackPlus={(e) => setAmountBuy(e)}
          />
        </div>
      </div>
    )
  }

  return (
    <Media query="(min-width: 768px)">
      {(match) => {
        if (match) {
          return renderDesktop()
        }
        return renderMobile()
      }}
    </Media>
  )
}

export default ShopDetail
