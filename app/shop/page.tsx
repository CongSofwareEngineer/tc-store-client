'use client'
import React from 'react'
import MenuCategory from './Component/MenuCategory'
import useQueryUrl from '@/hook/useQueryUrl'
import useAllProduct from '@/hook/tank-query/useAllProduct'
import MyLoading from '@/components/MyLoading'
import ItemProduct from '@/components/ItemProduct'

const ShopScreen = () => {
  const { currentQuery } = useQueryUrl()
  const { data, isLoading } = useAllProduct(currentQuery)
  console.log('====================================')
  console.log({ data })
  console.log('====================================')
  return (
    <div className="w-full flex md:gap-6 gap-4  h-full justify-star">
      <div className="w-max-[300px] min-w-[250px] w-[20%]">
        <MenuCategory />
      </div>
      <div className="flex-1 w-full justify-between">
        {data?.data && (
          <div className="mt-2 md:mt-4 w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-4 gap-3 md:gap-6">
            {data?.data?.map((item: any) => {
              return (
                <ItemProduct
                  className={'h-[305px] md:h-auto'}
                  showFeedback
                  showSold
                  key={item.id}
                  item={item}
                  href={`/shop/${item.id}/${item.keyName}`}
                />
              )
            })}
          </div>
        )}

        {isLoading && <MyLoading className="mt-5" />}
      </div>
    </div>
  )
}

export default ShopScreen
