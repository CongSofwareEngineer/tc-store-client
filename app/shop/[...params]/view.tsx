'use client'
import React, { useState } from 'react'
import { ItemDetailType } from './type'
import PrimaryButton from '@/components/PrimaryButton'
import useLanguage from '@/hook/useLanguage'
import Media from 'react-media'
import BtnBack from '@/components/BtnBack'
import MyImage from '@/components/MyImage'
import {
  formatPrice,
  formatPriceBase,
  saveDataLocal,
  showNotificationSuccess,
} from '@/utils/functions'
import InfoItemDetail from '@/components/InfoItemDetail'
import SubAndPlus from '@/components/SubAndPlus'
import { images } from '@/configs/images'
import SecondButton from '@/components/SecondButton'
import dynamic from 'next/dynamic'
import ModalBuy from './Component/ModalBuy'
import useGetProductByID from '@/hook/tank-query/useGetProductByID'
import { BodyAddCart, DataBase, FB_FC } from '@/constant/firebase'
import useUserData from '@/hook/useUserData'
import ClientApi from '@/services/clientApi'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import { QueryKey } from '@/constant/reactQuery'
import useModalDrawer from '@/hook/useModalDrawer'
import { LocalKey } from '@/constant/app'
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

  const { refreshQuery } = useRefreshQuery()
  const { translate } = useLanguage()
  const { openModalDrawer } = useModalDrawer()

  const { userData, isLogin } = useUserData()
  const { data } = useGetProductByID(productDetail?.id)
  const dataItem = data?.data ?? productDetail

  const handleBuy = () => {
    openModalDrawer({
      content: <ModalBuy data={dataItem} amount={amountBuy} />,
      useDrawer: true,
      configModal: {
        width: '760px',
      },
      configDrawer: {
        placement: 'bottom',
        height: '95%',
        title: (
          <p className="text-center text-medium font-bold uppercase">
            {translate('productDetail.modalBuy.titleOder')}
          </p>
        ),
      },
    })
  }

  const handleAddCartLogin = async () => {
    const payLoad: BodyAddCart = {
      amount: amountBuy,
      date: Date.now(),
      idProduct: productDetail.id?.toString(),
      idUser: userData?.id?.toString(),
      keyNameProduct: productDetail.keyName,
    }
    await ClientApi.requestBase({
      nameDB: DataBase.cartUser,
      encode: true,
      namFn: FB_FC.addData,
      body: {
        data: payLoad,
      },
    })
  }

  const handleAddCart = async () => {
    try {
      setLoadingAddCart(true)

      if (isLogin) {
        await handleAddCartLogin()
        refreshQuery(QueryKey.LengthCartUser)
      } else {
        const payLoad: BodyAddCart = {
          amount: amountBuy,
          date: Date.now(),
          idProduct: productDetail.id?.toString(),
          idUser: '',
          keyNameProduct: productDetail.keyName.toString(),
        }
        saveDataLocal(LocalKey.MyCart, payLoad)
      }
      showNotificationSuccess(translate('addCart.addSuccess'))
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
          <div className="flex-1 flex flex-col gap-2 justify-center  ">
            <h3 className="text-title font-bold">{dataItem.name}</h3>
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
          <h3 className="text-title font-bold">{dataItem.name}</h3>
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
