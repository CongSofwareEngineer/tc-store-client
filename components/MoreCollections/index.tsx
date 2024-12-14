import useMoreCollections from '@/hook/tank-query/useMoreCollections'
import React, { useRef } from 'react'
import MyCollections from '../MyCollections'
import ItemProduct from '../ItemProduct'
import { TYPE_PRODUCT } from '@/constant/admin'
import { useRouter } from 'next/navigation'
import LoadingGetData from '../LoadingGetData'

const MoreCollections = () => {
  const router = useRouter()
  const { data: dataMoreCollections, isLoading } = useMoreCollections()
  const isClickItemRef = useRef(true)

  const getRouteProduct = (product: any) => {
    if (isClickItemRef.current) {
      if (product.category === TYPE_PRODUCT.shoes) {
        router.push(`/shoes/${product.keyName}`)
      } else {
        router.push(`/shop/${product.keyName}`)
      }
    }
  }

  if (isLoading) {
    return <LoadingGetData loading colDesktop={5} />
  }

  return (
    <div className='w-full flex flex-col gap-2'>
      <MyCollections isClickItem={isClickItemRef}>
        <>
          {dataMoreCollections?.data.map((e) => {
            return (
              <div className=' min-w-[200px] select-none'>
                <ItemProduct
                  showDiscount
                  className='!bg-gray-100'
                  noClick
                  callback={() => getRouteProduct(e)}
                  item={e}
                  showSold
                />
              </div>
            )
          })}
        </>
      </MyCollections>
    </div>
  )
}

export default MoreCollections
