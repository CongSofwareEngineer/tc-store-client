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
import { images } from '@/configs/images'
import SecondButton from '@/components/SecondButton'
import dynamic from 'next/dynamic'
import useModal from '@/hook/useModal'
import useDrawer from '@/hook/useDrawer'
import useMedia from '@/hook/useMedia'
import ModalBuy from './Component/ModalBuy'
import useGetProductByID from '@/hook/tank-query/useGetProductByID'
const Comment = dynamic(() => import('@/components/Comment'), {
  ssr: false,
})

const ShopDetailScreen = ({
  productDetail,
}: {
  productDetail: ItemDetailType
}) => {
  const { translate } = useLanguage()
  const [amountBuy, setAmountBuy] = useState(1)
  const { openModal } = useModal()
  const { openDrawer } = useDrawer()
  const { isMobile } = useMedia()
  const { data } = useGetProductByID(productDetail?.id)
  const dataItem = data?.data ?? productDetail

  const handleBuy = () => {
    if (isMobile) {
      openDrawer({
        content: <ModalBuy data={dataItem} amount={amountBuy} />,
        placement: 'bottom',
        height: '95%',
        title: (
          <p className="text-center text-medium font-bold uppercase">
            {translate('productDetail.modalBuy.titleOder')}
          </p>
        ),
      })
    } else {
      openModal({
        content: <ModalBuy data={dataItem} amount={amountBuy} />,
        width: '760px',
        overClickClose: false,
      })
    }
  }

  const renderDesktop = () => {
    return (
      <div className="flex flex-col">
        <BtnBack title={['Shopp', dataItem.name]} url={['/shop']} />
        <div className="w-full flex gap-6 bg-white rounded-xl p-6">
          <div className="min-w-[300px] max-w-[450px] w-[50%] p-5 overflow-hidden aspect-square">
            <MyImage
              src={dataItem.imageMain || ''}
              alt={`img-main--${dataItem.name}`}
              widthImage="100%"
              heightImage="auto"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2 justify-center  ">
            <p className="text-title font-bold">{dataItem.name}</p>
            <InfoItemDetail data={dataItem} />
            <div className="text-medium  line-through">
              {formatPriceBase(dataItem.price, dataItem.discount)} VNĐ
            </div>
            <div className="text-title font-bold text-green-500">
              {`${formatPrice(Number(dataItem.price || '0') * amountBuy)} VNĐ`}
            </div>
            <SubAndPlus
              callBackSub={(e) => setAmountBuy(e)}
              value={amountBuy}
              maxAmount={dataItem.amount - dataItem.sold}
              callBackPlus={(e) => setAmountBuy(e)}
            />
            <div className="flex gap-6 mt-4">
              <PrimaryButton
                onClick={handleBuy}
                className="min-w-[30%] "
                style={{ height: 40 }}
              >
                {translate('common.buyNow')}
              </PrimaryButton>
              <SecondButton className="min-w-[30%] " style={{ height: 40 }}>
                <div className="flex gap-3 whitespace-nowrap">
                  <MyImage
                    src={images.icon.iconCart}
                    alt="btn-add-cart"
                    widthImage="25px"
                    heightImage="25px"
                  />
                  <span>{translate('common.addCart')}</span>
                </div>
              </SecondButton>
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-xl p-6 mt-6">
          <Comment idProduct={dataItem.id || ''} />
        </div>
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div className="flex flex-col gap-2">
        <BtnBack title={['Shopp', dataItem.name]} url={['/shop']} />
        <div className="bg-white py-[10%] shadow-lg shadow-yellow-50  w-full flex justify-center items-center">
          <div className="w-[80%]  aspect-square overflow-hidden ">
            <MyImage
              src={dataItem.imageMain || images.userDetail.iconUserDetail}
              alt={dataItem.des || ''}
              widthImage="100%"
              heightImage="auto"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 mt-2">
          <p className="text-title font-bold">{dataItem.name}</p>
          <InfoItemDetail data={dataItem} />
          <div className="text-medium  line-through">
            {formatPriceBase(dataItem?.price, dataItem?.discount)} VNĐ
          </div>
          <div className="text-title font-bold text-green-500">
            {`${formatPrice(Number(dataItem?.price || '0') * amountBuy)} VNĐ`}
          </div>
          <SubAndPlus
            callBackSub={(e) => setAmountBuy(e)}
            value={amountBuy}
            maxAmount={dataItem.amount - dataItem.sold}
            callBackPlus={(e) => setAmountBuy(e)}
          />
          <div className="flex gap-6 mt-4">
            <PrimaryButton
              onClick={handleBuy}
              className="min-w-[30%] "
              style={{ height: 40 }}
            >
              {translate('common.buyNow')}
            </PrimaryButton>
            <SecondButton className="min-w-[30%] " style={{ height: 40 }}>
              <div className="flex gap-3 whitespace-nowrap">
                <MyImage
                  src={images.icon.iconCart}
                  alt="btn-add-cart"
                  widthImage="25px"
                  heightImage="25px"
                />
                <span>{translate('common.addCart')}</span>
              </div>
            </SecondButton>
          </div>
          <Comment idProduct={dataItem.id || ''} />
        </div>
      </div>
    )
  }

  return (
    <>
      {dataItem && (
        <Media query="(min-width: 768px)">
          {(match) => {
            if (match) {
              return renderDesktop()
            }
            return renderMobile()
          }}
        </Media>
      )}

      {!dataItem && <div>{translate('warning.noData')}</div>}
    </>
  )
}

export default ShopDetailScreen
