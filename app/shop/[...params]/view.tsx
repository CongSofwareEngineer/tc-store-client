'use client'
import ViewDetail from '@/app/shoes/[...params]/Component/ViewDetail'
import { IProduct } from '@/app/shoes/[...params]/type'
import MyLoading from '@/components/MyLoading'
import useGetProductByID from '@/hooks/tank-query/useGetProductByID'
import useAos from '@/hooks/useAos'
import useFirstLoadPage from '@/hooks/useFirstLoadPage'
import useUserData from '@/hooks/useUserData'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'

const Payment = dynamic(() => import('@/components/Payment'), {
  ssr: true,
  loading: () => {
    return <MyLoading />
  },
})

const ShopDetailScreen = ({ productDetail }: { productDetail: IProduct }) => {
  const [amountBuy, setAmountBuy] = useState(1)
  const [isPayment, setIsPayment] = useState(false)
  const [productState, setProductState] = useState<IProduct>(productDetail)

  useAos()
  useFirstLoadPage()
  const { isLogin } = useUserData()
  const { data } = useGetProductByID(productDetail?._id!)
  const dataItem = data ?? productDetail

  useEffect(() => {
    if (dataItem) {
      setProductState(dataItem)
    }
  }, [dataItem])

  useEffect(() => {
    setIsPayment(false)
  }, [isLogin])

  if (isPayment) {
    return (
      <Payment
        clickBack={() => setIsPayment(false)}
        data={[
          {
            ...productState,
            amountBuy: amountBuy,
            selected: true,
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
