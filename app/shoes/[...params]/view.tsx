'use client'
import React, { useState } from 'react'
import { ItemDetailType } from './type'
import useGetProductByID from '@/hook/tank-query/useGetProductByID'
import useUserData from '@/hook/useUserData'
import PaymentShop from './Component/payment'
import { useEffect } from 'react'
import useAos from '@/hook/useAos'
import ViewDetail from './Component/ViewDetail'
import { cloneData } from '@/utils/functions'

const ShoesDetailScreen = ({ productDetail }: { productDetail: ItemDetailType }) => {
  const [amountBuy, setAmountBuy] = useState(1)
  const [isPayment, setIsPayment] = useState(false)
  const [productState, setProductState] = useState<ItemDetailType>(productDetail)

  useAos()
  const { isLogin } = useUserData()
  const { data } = useGetProductByID(productDetail?.id)
  const dataItem = data?.data ?? productDetail

  console.log({ dataItem })

  useEffect(() => {
    setIsPayment(false)
  }, [isLogin])

  useEffect(() => {
    const dataClone = cloneData(dataItem)
    const size = dataClone?.attributes?.sizes[0].size
    const color = dataClone?.attributes?.sizes[0].colors[0].color
    dataClone.configBill = {
      size,
      color,
    }

    setProductState(dataClone)
  }, [dataItem])

  return isPayment ? (
    <PaymentShop callBack={() => setIsPayment(false)} data={productState} amount={amountBuy} />
  ) : (
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

export default ShoesDetailScreen
