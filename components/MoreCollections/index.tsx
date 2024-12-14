import useMoreCollections from '@/hook/tank-query/useMoreCollections'
import React, { useEffect, useRef } from 'react'
import MyCollections from '../MyCollections'
import ItemProduct from '../ItemProduct'
import { TYPE_PRODUCT } from '@/constant/admin'
import { useParams, useRouter } from 'next/navigation'
import LoadingGetData from '../LoadingGetData'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import { QUERY_KEY } from '@/constant/reactQuery'

const MoreCollections = () => {
  const router = useRouter()
  const { refreshQuery } = useRefreshQuery()
  const { data: dataMoreCollections, isLoading } = useMoreCollections()
  const param = useParams()

  useEffect(() => {
    refreshQuery(QUERY_KEY.GetMoreCollections)
  }, [])

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
            if (e.keyName === param.params[0]) {
              return <></>
            }
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
