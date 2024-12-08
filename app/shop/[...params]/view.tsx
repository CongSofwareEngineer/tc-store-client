'use client'
import React, { useState } from 'react'
import { ItemDetailType } from './type'
import useGetProductByID from '@/hook/tank-query/useGetProductByID'
import useUserData from '@/hook/useUserData'
// import PaymentShop from './Component/payment'
import { useEffect } from 'react'
import useAos from '@/hook/useAos'
import ViewDetail from './Component/ViewDetail'
import dynamic from 'next/dynamic'
import { LoadingOutlined } from '@ant-design/icons'
const PaymentShop = dynamic(() => import('./Component/payment'), {
  ssr: true,
  loading: () => {
    return (
      <div className='flex text-green-600 h-full items-center   py-2 justify-center'>
        <LoadingOutlined style={{ fontSize: 36 }} />
      </div>
    )
  },
})
const ShopDetailScreen = ({ productDetail }: { productDetail: ItemDetailType }) => {
  const [amountBuy, setAmountBuy] = useState(1)
  const [isPayment, setIsPayment] = useState(false)

  useAos()
  const { isLogin } = useUserData()
  const { data } = useGetProductByID(productDetail?.id)
  const dataItem = data?.data ?? productDetail

  console.log({ dataItem })

  useEffect(() => {
    setIsPayment(false)
  }, [isLogin])

  return isPayment ? (
    <PaymentShop callBack={() => setIsPayment(false)} data={dataItem} amount={amountBuy} />
  ) : (
    <ViewDetail
      amountBuy={amountBuy}
      isPayment={isPayment}
      productDetail={dataItem}
      setAmountBuy={setAmountBuy}
      setIsPayment={setIsPayment}
    />
  )
}

export default ShopDetailScreen
