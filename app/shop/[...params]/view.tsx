'use client'
import React, { useState } from 'react'
import { IPaymentShop } from './type'
import useGetProductByID from '@/hooks/tank-query/useGetProductByID'
import useUserData from '@/hooks/useUserData'
// import PaymentShop from './Component/payment'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { cloneData } from '@/utils/functions'
import MyLoading from '@/components/MyLoading'
import useFirstLoadPage from '@/hooks/useFirstLoadPage'
import ViewDetail from './Component/ViewDetail'

const Payment = dynamic(() => import('@/components/Payment'), {
  ssr: true,
  loading: () => {
    return <MyLoading />
  },
})
const ShopDetailScreen = ({ productDetail }: { productDetail: IPaymentShop['data'] }) => {
  const [amountBuy, setAmountBuy] = useState(1)
  const [isPayment, setIsPayment] = useState(false)
  const [productState, setProductState] = useState<IPaymentShop['data']>(productDetail)

  useFirstLoadPage()
  const { isLogin } = useUserData()
  const { data } = useGetProductByID(productDetail?._id)
  const dataItem = data?.data ?? productDetail

  useEffect(() => {
    setIsPayment(false)
  }, [isLogin])

  useEffect(() => {
    const dataClone: IPaymentShop['data'] = cloneData(dataItem)
    if (dataClone) {
      const modelInit = dataClone.models[0]
      const sizeDefault = modelInit.sizes.find((size) => size.amount > size.sold)

      dataClone.configBill = {
        model: modelInit.model,
        size: sizeDefault?.size || 0,
      }
      setProductState(dataClone)
    }
  }, [dataItem])

  if (isPayment) {
    return (
      <Payment
        clickBack={() => setIsPayment(false)}
        data={[
          {
            ...productState,
            amountBuy: amountBuy,
            selected: true,
            moreData: productState,
          },
        ]}
      />
    )
  }

  return (
    <ViewDetail
      amountBuy={amountBuy}
      isPayment={isPayment}
      productDetail={productState}
      setAmountBuy={setAmountBuy}
      setIsPayment={setIsPayment}
      onChangeData={setProductState}
    />
  )
}

export default ShopDetailScreen
