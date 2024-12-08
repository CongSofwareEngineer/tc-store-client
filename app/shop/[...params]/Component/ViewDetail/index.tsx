import dynamic from 'next/dynamic'
import React, { useMemo, useState } from 'react'
import { ItemDetailType } from '../../type'
import useAos from '@/hook/useAos'
import useMedia from '@/hook/useMedia'
import { DataAddCart } from '@/constant/mongoDB'
import { COOKIE_KEY } from '@/constant/app'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import { delayTime, detectImg, formatPrice, formatPriceBase } from '@/utils/functions'
import { QUERY_KEY } from '@/constant/reactQuery'
import { getCookie, setCookie } from '@/services/CookiesService'
import BtnBack from '@/components/BtnBack'
import useGetProductByID from '@/hook/tank-query/useGetProductByID'
import InfoItemDetail from '@/components/InfoItemDetail'
import SubAndPlus from '@/components/SubAndPlus'

import { images } from '@/configs/images'
import ClientApi from '@/services/clientApi'
import { DataItemType } from '@/app/my-cart/type'
import { showNotificationSuccess } from '@/utils/notification'
import { Button } from 'antd'
import Image from 'next/image'

const MoreInfo = dynamic(() => import('@/components/MoreInfo'), {
  ssr: true,
})

const ImageMore = dynamic(() => import('@/components/ImgMoreProduct'), {
  ssr: false,
})

type Props = {
  productDetail: ItemDetailType
  isPayment: boolean
  amountBuy: number
  setIsPayment: (e: any) => void
  setAmountBuy: (e: any) => void
}
const ViewDetail = ({ productDetail, amountBuy = 0, setIsPayment, setAmountBuy }: Props) => {
  useAos(500)
  const { isMobile } = useMedia()
  const { refreshQuery } = useRefreshQuery()
  const { translate } = useLanguage()
  const { userData, isLogin } = useUserData()
  const { data } = useGetProductByID(productDetail?.id)
  const dataItem = useMemo(() => data?.data ?? productDetail, [data, productDetail])

  const [loadingAddCart, setLoadingAddCart] = useState(false)

  const handleBuy = () => {
    setIsPayment(true)
  }

  const handleAddCartLogin = async (body: DataAddCart) => {
    const listCartUser = await ClientApi.getCartDetail(body.idUser!, body.idProduct!)

    const dataExited = listCartUser?.data[0]

    if (!dataExited) {
      await ClientApi.createMyCart(body)
    } else {
      const body = {
        amount: Number(dataExited.amount) + Number(amountBuy),
      }
      await ClientApi.updateMyCart(dataExited._id, body)
    }
  }

  const addCartNoLogin = async (body: DataItemType) => {
    const dataCart = await getCookie(COOKIE_KEY.MyCart)
    const arrTemp: Array<DataItemType> = []
    if (Array.isArray(dataCart)) {
      let isExited = false
      dataCart.forEach((e: DataItemType) => {
        const itemTemp = e
        if (itemTemp.idProduct === body.idProduct) {
          itemTemp.amount = itemTemp.amount + body.amount
          itemTemp.date = body.date
          isExited = true
        }
        arrTemp.push(itemTemp)
      })
      if (!isExited) {
        arrTemp.push(body)
      }
    } else {
      arrTemp.push(body)
    }
    await setCookie(COOKIE_KEY.MyCart, arrTemp)
  }

  const handleAddCart = async () => {
    try {
      setLoadingAddCart(true)
      const body: DataAddCart = {
        amount: amountBuy,
        idProduct: dataItem._id?.toString(),
        configBill: dataItem?.configBill || {},
      }
      if (isLogin) {
        body.idUser = userData?._id
        await handleAddCartLogin(body)
      } else {
        const bodyOther: DataItemType = {
          amount: Number(body.amount),
          idProduct: body.idProduct!.toString(),
          keyNameProduct: dataItem.keyName,
          selected: true,
          id: '',
          configBill: dataItem?.configBill || {},
        }
        bodyOther.date = new Date().getTime().toFixed()
        bodyOther.more_data = {
          imageMain: dataItem.imageMain,
          name: dataItem.name,
          keyName: dataItem.keyName,
          price: dataItem.price,
          category: dataItem.category,
          disCount: dataItem.disCount,
          _id: dataItem._id,
          sold: dataItem.sold,
        }
        await addCartNoLogin(bodyOther)
      }
      await Promise.all([refreshQuery(QUERY_KEY.LengthCartUser), refreshQuery(QUERY_KEY.MyCartUser)])
      setLoadingAddCart(false)
      showNotificationSuccess(translate('addCart.addSuccess'))
    } finally {
      setLoadingAddCart(false)
    }
  }

  const renderDesktop = () => {
    return (
      <div className='flex flex-col'>
        <BtnBack title={['Shop', dataItem.name]} url={['/shop']} />
        <div className='w-full flex gap-6 bg-white rounded-xl p-6'>
          <div data-aos='fade-right' className='relative min-w-[300px] max-w-[450px] w-[50%] p-5 overflow-hidden '>
            <Image
              src={detectImg(dataItem.imageMain || '')}
              alt={`img-main--${dataItem.name}`}
              fill
              className='!relative !w-full !h-auto'
            />
            <ImageMore data={dataItem} />
          </div>
          <div className='flex-1 flex flex-col gap-2 justify-center  ' data-aos='fade-left'>
            <h1 className='text-title font-bold'>{dataItem.name}</h1>
            <InfoItemDetail data={dataItem} />
            <div className='text-medium  line-through'>{formatPriceBase(dataItem.price, dataItem.discount)} VNĐ</div>
            <div className='text-title font-bold text-green-500'>{`${formatPrice(
              Number(dataItem.price || '0') * amountBuy,
            )} VNĐ`}</div>
            <SubAndPlus
              callBackSub={(e) => setAmountBuy(e)}
              value={amountBuy}
              maxAmount={dataItem.amount - dataItem.sold}
              callBackPlus={(e) => setAmountBuy(e)}
            />
            <div className='flex gap-6 mt-4'>
              <Button onClick={handleBuy} className='min-w-[30%] !h-[40px]'>
                {translate('common.buyNow')}
              </Button>
              <Button type='primary' onClick={handleAddCart} className='min-w-[30%] !h-[40px]' loading={loadingAddCart}>
                <div className='flex gap-3 whitespace-nowrap'>
                  <Image src={images.icon.iconCart} alt='btn-add-cart' fill className='!relative !w-[25px] !h-[25px]' />
                  <span>{translate('common.addCart')}</span>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <div data-aos='fade-up' className='w-full bg-white rounded-xl p-6 mt-6'>
          <MoreInfo data={dataItem} />
        </div>
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div className='flex flex-col gap-2'>
        <BtnBack title={['Shopp', dataItem.name]} url={['/shop']} />
        <div className='pt-8 pb-2 shadow-lg shadow-yellow-50 bg-white   w-full flex flex-col justify-center items-center'>
          <div data-aos='fade-right' className='w-[80%]  overflow-hidden '>
            <Image
              src={detectImg(dataItem.imageMain || images.userDetail.iconUserDetail)}
              alt={dataItem.des || ''}
              className='!relative !w-full !h-auto'
              fill
            />
            <ImageMore data={dataItem} />
          </div>
          <div data-aos='fade-right' className='w-full flex-col gap-2 px-5 pt-5'>
            <h1 className='text-title font-bold'>{dataItem.name}</h1>
            <InfoItemDetail data={dataItem} />
            <div className='text-medium  line-through'>{formatPriceBase(dataItem?.price, dataItem?.discount)} VNĐ</div>
            <div className='text-title font-bold text-green-500'>{`${formatPrice(
              Number(dataItem?.price || '0') * amountBuy,
            )} VNĐ`}</div>
            <SubAndPlus
              callBackSub={(e) => setAmountBuy(e)}
              value={amountBuy}
              maxAmount={dataItem.amount - dataItem.sold}
              callBackPlus={(e) => setAmountBuy(e)}
            />
            <div className='flex sm:gap-6 gap-2 mt-4 mb-3 sm:flex-row flex-col'>
              <Button onClick={handleBuy} className='min-w-[30%] ' style={{ height: 40 }}>
                {translate('common.buyNow')}
              </Button>
              <Button
                type='primary'
                onClick={handleAddCart}
                className='min-w-[30%] '
                style={{ height: 40 }}
                loading={loadingAddCart}
              >
                <div className='flex gap-3 whitespace-nowrap'>
                  <Image src={images.icon.iconCart} alt='btn-add-cart' className='!relative !w-[25px] !h-[25px]' fill />
                  <span>{translate('common.addCart')}</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div
          data-aos='fade-right'
          className=' shadow-yellow-50 bg-white p-5 md:pr-5 pr-3 w-full flex flex-col gap-2 mt-2'
        >
          <MoreInfo data={dataItem} />
        </div>
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default ViewDetail
