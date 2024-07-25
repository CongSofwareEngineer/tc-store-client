'use client'
import React, { useState } from 'react'
import { ItemDetailType } from './type'
import PrimaryButton from '@/components/PrimaryButton'
import useLanguage from '@/hook/useLanguage'
import BtnBack from '@/components/BtnBack'
import MyImage from '@/components/MyImage'
import {
  delayTime,
  formatPrice,
  formatPriceBase,
  showNotificationSuccess,
} from '@/utils/functions'
import InfoItemDetail from '@/components/InfoItemDetail'
import SubAndPlus from '@/components/SubAndPlus'
import { images } from '@/configs/images'
import SecondButton from '@/components/SecondButton'
import dynamic from 'next/dynamic'
import useGetProductByID from '@/hook/tank-query/useGetProductByID'
import useUserData from '@/hook/useUserData'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import { COOKIE_KEY, REQUEST_TYPE } from '@/constant/app'
import useMedia from '@/hook/useMedia'
import PaymentShop from './Component/payment'
import { useEffect } from 'react'
import { DataAddCart } from '@/constant/mongoDB'
import { setCookie } from '@/services/CookeisService'
import ServerApi from '@/services/serverApi'
import { QUERY_KEY } from '@/constant/reactQuery'
import useAos from '@/hook/useAos'

const Comment = dynamic(() => import('@/components/Comment'), {
  ssr: false,
})

const ShopDetailScreen = ({
  productDetail,
}: {
  productDetail: ItemDetailType
}) => {
  const [amountBuy, setAmountBuy] = useState(1)
  const [loadingAddCart, setLoadingAddCart] = useState(false)
  const [isPayment, setIsPayment] = useState(false)

  useAos()
  const { refreshQuery } = useRefreshQuery()
  const { translate } = useLanguage()
  const { isMobile } = useMedia()

  const { userData, isLogin } = useUserData()
  const { data } = useGetProductByID(productDetail?.id)
  const dataItem = data?.data ?? productDetail

  useEffect(() => {
    setIsPayment(false)
  }, [isLogin])

  const handleBuy = () => {
    setIsPayment(true)
  }

  const handleAddCartLogin = async (body: DataAddCart) => {
    const listCartUser = await ServerApi.requestBase({
      url: `/cart/details/${body.idUser}/${body.idProduct}`,
    })
    const dataExited = listCartUser?.data[0]
    if (!dataExited) {
      await ServerApi.requestBase({
        url: 'cart/create',
        body,
        method: REQUEST_TYPE.POST,
      })
    } else {
      await ServerApi.requestBase({
        url: `cart/update-cart/${dataExited._id}`,
        body: {
          amount: dataExited.amount + amountBuy,
        },
        method: REQUEST_TYPE.POST,
      })
    }
  }

  const handleAddCart = async () => {
    try {
      setLoadingAddCart(true)
      const body: DataAddCart = {
        amount: amountBuy,
        idProduct: productDetail._id?.toString(),
        moreConfig: {},
      }
      if (isLogin) {
        body.idUser = userData?._id
        showNotificationSuccess(translate('addCart.addSuccess'))
        setLoadingAddCart(false)
        await handleAddCartLogin(body)
        await delayTime(1000)
        refreshQuery(QUERY_KEY.LengthCartUser)
        refreshQuery(QUERY_KEY.MyCartUser)
      } else {
        body.date = new Date().getTime().toFixed()
        setCookie(COOKIE_KEY.MyCart, body)
        showNotificationSuccess(translate('addCart.addSuccess'))
      }
    } finally {
      setLoadingAddCart(false)
    }
  }

  const renderDesktop = () => {
    return (
      <div className="flex flex-col">
        <BtnBack title={['Shop', dataItem.name]} url={['/shop']} />
        <div className="w-full flex gap-6 bg-white rounded-xl p-6">
          <div className="min-w-[300px] max-w-[450px] w-[50%] p-5 overflow-hidden aspect-square">
            <MyImage
              src={dataItem.imageMain || ''}
              alt={`img-main--${dataItem.name}`}
              widthImage="100%"
              heightImage="auto"
            />
          </div>
          <div
            className="flex-1 flex flex-col gap-2 justify-center  "
            data-aos="zoom-in"
          >
            <h1 className="text-title font-bold">{dataItem.name}</h1>
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
                heightBtn="40px"
                onClick={handleBuy}
                className="min-w-[30%]"
              >
                {translate('common.buyNow')}
              </PrimaryButton>
              <SecondButton
                heightBtn="40px"
                onClick={handleAddCart}
                className="min-w-[30%] "
                loading={loadingAddCart}
              >
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
        <div data-aos="fade-right" className="w-full flex flex-col gap-2 mt-2">
          <h1 className="text-title font-bold">{dataItem.name}</h1>
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
            <SecondButton
              onClick={handleAddCart}
              className="min-w-[30%] "
              style={{ height: 40 }}
              loading={loadingAddCart}
            >
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

  return isPayment ? (
    <PaymentShop
      callBack={() => setIsPayment(false)}
      data={dataItem}
      amount={amountBuy}
    />
  ) : isMobile ? (
    renderMobile()
  ) : (
    renderDesktop()
  )
}

export default ShopDetailScreen
