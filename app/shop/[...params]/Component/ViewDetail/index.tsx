import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import useAos from '@/hooks/useAos'
import useMedia from '@/hooks/useMedia'
import { DataAddCart } from '@/constants/mongoDB'
import { COOKIE_KEY } from '@/constants/app'
import useRefreshQuery from '@/hooks/tank-query/useRefreshQuery'
import useLanguage from '@/hooks/useLanguage'
import useUserData from '@/hooks/useUserData'
import { detectImg, formatPrice, formatPriceBase } from '@/utils/functions'
import { QUERY_KEY } from '@/constants/reactQuery'
import SubAndPlus from '@/components/SubAndPlus'

import { images } from '@/configs/images'
import ClientApi from '@/services/clientApi'
import { showNotificationSuccess } from '@/utils/notification'
import MyImage from '@/components/MyImage'
import BtnBack from '@/components/BtnBack'
import { Button } from '@mantine/core'
import { getCookie, setCookie } from '@/services/cookiesService'
import InfoItemDetail from '@/components/InfoItemDetail'
import { ItemCartBody } from '@/app/my-cart/type'
import Models from '../Models'
import { IImageProduct, IProduct } from '@/services/ClientApi/type'
// import MoreCollections from '@/components/MoreCollections'

const MoreInfo = dynamic(() => import('@/components/MoreInfo'), {
  ssr: true,
})

const ImageMore = dynamic(() => import('@/components/ImgMoreProduct'))

const MoreCollections = dynamic(() => import('@/components/MoreCollections'), {
  ssr: false,
})

type Props = {
  productDetail: IProduct
  isPayment: boolean
  amountBuy: number
  setIsPayment: (e: any) => void
  setAmountBuy: (e: any) => void
  onChangeData: (param: IProduct) => void
}
const ViewDetail = ({
  onChangeData,
  productDetail,
  amountBuy = 0,
  setIsPayment,
  setAmountBuy,
}: Props) => {
  useAos(500)

  const { isMobile } = useMedia()
  const { refreshQuery } = useRefreshQuery()
  const { translate } = useLanguage()
  const { userData, isLogin } = useUserData()
  const [imageShow, setImageShow] = useState<IImageProduct>()

  const [loadingAddCart, setLoadingAddCart] = useState(false)

  const handleBuy = () => {
    setIsPayment(true)
  }

  const handleAddCartLogin = async (data: DataAddCart) => {
    const listCartUser = await ClientApi.getCartDetail(data.idUser!, data.idProduct!)

    const dataExited = listCartUser?.data[0]
    if (!dataExited) {
      await ClientApi.createMyCart(data)
    } else {
      const body: DataAddCart = {
        amountBuy: Number(dataExited.amountBuy) + Number(amountBuy),
        configCart: data.configCart,
      }
      const dataAddCart = await ClientApi.updateMyCart(dataExited._id, body)

      if (!dataAddCart?.data) {
        throw new Error('error add cart')
      }
    }
  }

  const addCartNoLogin = async (body: ItemCartBody) => {
    const dataCart = await getCookie(COOKIE_KEY.MyCart)
    const arrTemp: Array<ItemCartBody> = []
    if (Array.isArray(dataCart)) {
      let isExited = false
      dataCart.forEach((e: ItemCartBody) => {
        const itemTemp = e
        if (itemTemp.idProduct === body.idProduct) {
          itemTemp.amountBuy = itemTemp.amountBuy! + body.amountBuy!
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
        amountBuy: amountBuy,
        idProduct: productDetail._id?.toString(),
        configCart: productDetail.configCart!,
      }
      if (isLogin) {
        body.idUser = userData?._id
        await handleAddCartLogin(body)
      } else {
        const bodyOther: ItemCartBody = {
          amountBuy: Number(body.amountBuy),
          idProduct: body.idProduct!.toString(),
          keyNameProduct: productDetail?.keyName!,
          selected: true,
          id: '',
          configCart: productDetail.configBill,
        }
        bodyOther.date = new Date().getTime().toFixed()
        bodyOther.moreData = {
          imageMain: productDetail.imageMain,
          name: productDetail.name,
          keyName: productDetail.keyName,
          price: productDetail.price,
          category: productDetail.category,
          disCount: productDetail.disCount,
          _id: productDetail._id,
          sold: productDetail.sold,
          models: productDetail.models,
        }
        await addCartNoLogin(bodyOther)
      }
      await Promise.all([
        refreshQuery(QUERY_KEY.LengthCartUser),
        refreshQuery(QUERY_KEY.MyCartUser),
      ])
      setLoadingAddCart(false)
      showNotificationSuccess(translate('addCart.addSuccess'))
    } catch {
    } finally {
      setLoadingAddCart(false)
    }
  }

  const renderSubAndPlus = () => {
    const maxAmount = 0
    productDetail.models.some((model) => {
      let isValidSize = false
      const isValidModel = model.model === productDetail.configBill?.model
      model.sizes.some((size) => {
        if (size.size === productDetail.configBill?.size) {
          isValidSize = true
        }
        return isValidSize
      })
      return isValidSize && isValidModel
    })
    return (
      <SubAndPlus
        callBackSub={(e) => setAmountBuy(e)}
        value={amountBuy}
        maxAmount={maxAmount}
        callBackPlus={(e) => setAmountBuy(e)}
      />
    )
  }

  const renderImageMain = () => {
    const img = productDetail.images?.find((img) => img.model === productDetail.configBill?.model)
    const modelSelected = productDetail.models.find((model) => {
      if (imageShow) {
        return model.model === imageShow.model
      }
      return model.model === productDetail.configBill?.model
    })
    return (
      <div className='relative w-full'>
        <MyImage
          src={detectImg(imageShow?.url?.toString() || img?.url.toString())}
          alt={`img-main--${productDetail.name}`}
          className='!relative !w-full !h-auto'
        />
        <div className=' bg-green-400 rounded-md px-2 py-1 text-center absolute left-2 top-2'>
          {modelSelected?.name}
        </div>
      </div>
    )
  }

  const renderDesktop = () => {
    return (
      <div className='flex flex-col'>
        <BtnBack title={[translate('textPopular.shoes'), productDetail.name]} url={['/shop']} />
        <div className='w-full flex gap-6 bg-white rounded-xl p-6'>
          <div
            data-aos='fade-right'
            className='relative min-w-[300px] max-w-[450px] w-[50%] p-5 overflow-hidden '
          >
            {renderImageMain()}
            <ImageMore onHover={(url) => setImageShow(url!)} data={productDetail.images!} />
          </div>
          <div className='flex-1 flex flex-col gap-2 justify-center  ' data-aos='fade-left'>
            <h1 className='text-title font-bold'>{productDetail.name}</h1>
            <InfoItemDetail data={productDetail} />
            <div className='text-medium  line-through text-green-400'>
              {formatPriceBase(productDetail.price, productDetail?.disCount!)} VNĐ
            </div>
            <div className='text-title font-bold text-green-500'>{`${formatPrice(
              Number(productDetail.price || '0') * amountBuy
            )} VNĐ`}</div>
            <Models
              onChange={(e) => {
                onChangeData({ ...productDetail, configBill: e })
              }}
              listModels={productDetail.models}
              value={productDetail.configBill}
            />
            {renderSubAndPlus()}

            <div className='flex gap-6 mt-4'>
              <Button onClick={handleBuy} className='min-w-[30%] !h-[40px]'>
                {translate('common.buyNow')}
              </Button>
              <Button
                variant='filled'
                onClick={handleAddCart}
                className='min-w-[30%] !h-[40px]'
                loading={loadingAddCart}
              >
                <div className='flex gap-3 items-center whitespace-nowrap'>
                  <MyImage
                    src={images.icon.iconCart}
                    alt='btn-add-cart'
                    className='!relative !w-[25px] !h-[25px]'
                  />
                  <span>{translate('common.addCart')}</span>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <div data-aos='fade-up' className='w-full bg-white rounded-xl p-6 mt-6'>
          <MoreInfo data={productDetail} />
        </div>

        <div data-aos='fade-up' className='w-full bg-white py-4 px-4   rounded-xl  mt-6'>
          <div className='text-medium capitalize font-bold'>
            {translate('textPopular.moreLike')}
          </div>
          <MoreCollections />
        </div>
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div className='flex flex-col gap-2'>
        <BtnBack title={[translate('textPopular.shoes'), productDetail.name]} url={['/shop']} />
        <div className='pt-8 pb-2 shadow-lg shadow-yellow-50 bg-white   w-full flex flex-col justify-center items-center'>
          <div data-aos='fade-right' className='w-[80%]  overflow-hidden '>
            {renderImageMain()}
            <ImageMore onHover={(url) => setImageShow(url!)} data={productDetail.images!} />
          </div>
          <div data-aos='fade-right' className='w-full flex-col gap-2 px-5 pt-5'>
            <h1 className='text-title font-bold'>{productDetail.name}</h1>
            <InfoItemDetail data={productDetail} />
            <div className='text-medium  line-through'>
              {formatPriceBase(productDetail?.price, productDetail?.disCount)} VNĐ
            </div>
            <div className='text-title font-bold text-green-500'>{`${formatPrice(
              Number(productDetail?.price || '0') * amountBuy
            )} VNĐ`}</div>

            <Models
              onChange={(e) => {
                onChangeData({ ...productDetail, configBill: e })
              }}
              listModels={productDetail.models}
              value={productDetail.configBill}
            />
            <div className='mb-3' />
            {renderSubAndPlus()}

            <div className='flex sm:gap-6 gap-2 mt-4 mb-3 sm:flex-row flex-col'>
              <Button onClick={handleBuy} className='min-w-[30%] ' style={{ height: 40 }}>
                {translate('common.buyNow')}
              </Button>
              <Button
                variant='filled'
                onClick={handleAddCart}
                className='min-w-[30%] '
                style={{ height: 40 }}
                loading={loadingAddCart}
              >
                <div className='flex gap-3  items-center  whitespace-nowrap'>
                  <MyImage
                    src={images.icon.iconCart}
                    alt='btn-add-cart'
                    className='!relative !w-[25px] !h-[25px]'
                  />
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
          <MoreInfo data={productDetail} />
        </div>
        <div data-aos='fade-right' className='w-full bg-white p-4  mt-2 '>
          <div className='text-medium capitalize font-bold mb-1'>
            {translate('textPopular.moreLike')}
          </div>
          <MoreCollections />
        </div>
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default ViewDetail
