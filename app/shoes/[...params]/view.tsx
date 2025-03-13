'use client'
import React, { useState } from 'react'

import { useEffect } from 'react'
import { cloneData } from '@/utils/functions'
import dynamic from 'next/dynamic'
import MyLoading from '@/components/MyLoading'
import useFirstLoadPage from '@/hooks/useFirstLoadPage'
import { IProduct } from './type'
import useAos from '@/hooks/useAos'
import useUserData from '@/hooks/useUserData'
import useGetProductByID from '@/hooks/tank-query/useGetProductByID'
import ViewDetail from './Component/ViewDetail'

const Payment = dynamic(() => import('@/components/Payment'), {
  ssr: true,
  loading: () => {
    return <MyLoading />
  },
})

const ShoesDetailScreen = ({ productDetail }: { productDetail: IProduct }) => {
  const [amountBuy, setAmountBuy] = useState(1)
  const [isPayment, setIsPayment] = useState(false)
  const [productState, setProductState] = useState<IProduct>(productDetail)

  useAos()
  useFirstLoadPage()
  const { isLogin } = useUserData()
  const { data } = useGetProductByID(productDetail._id)

  const dataItem = data?.data ?? productDetail

  useEffect(() => {
    setIsPayment(false)
  }, [isLogin])

  useEffect(() => {
    if (dataItem) {
      const dataClone = cloneData(dataItem)
      const size = dataClone?.attributes?.sizes[0].size
      const color = dataClone?.attributes?.sizes[0].colors[0].color
      dataClone.configBill = {
        size,
        color,
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

export default ShoesDetailScreen
