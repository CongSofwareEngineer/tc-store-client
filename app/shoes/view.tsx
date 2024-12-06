'use client'
import useQuerySearch from '@/hook/useQuerySearch'
import React from 'react'
import MenuShoes from './Components/MenuShoes'
import InputSearch from '../shop/Component/InputSearch'
import useShoesShop from '@/hook/tank-query/useShoesShop'
import LoadingData from './Components/LoadingGetData'
import MyLoadMore from '@/components/MyLoadMore'
import ItemProduct from '@/components/ItemProduct'
import useAos from '@/hook/useAos'

const ShoesScreen = () => {
  useAos(1000)
  const { queries } = useQuerySearch()
  const { data, isLoading, hasNextPage, loadMore, isFetchingNextPage } = useShoesShop(queries)
  console.log({ queries })

  return (
    <div className='w-full flex md:flex-row flex-col  md:gap-6 gap-3  h-full justify-star md:mt-3'>
      <h1 className='absolute opacity-0'>Shop tc store - Uy tín nhất Gia Lai</h1>
      <h2 className='absolute opacity-0'>Shop với rất nhiều sản phẩm chất lượng và uy tí</h2>
      <div data-aos='fade-right' className='md:w-[250px] w-full'>
        <MenuShoes />
      </div>
      <div data-aos='fade-left' className='flex-1 w-full  h-full'>
        <InputSearch />
        {data.length > 0 && (
          <div className='mt-2  w-full grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4   gap-3 xl:gap-6 md:gap-4'>
            {data.map((item: any) => {
              return (
                <ItemProduct
                  showFeedback
                  showSold
                  key={`shoes-${item.id}`}
                  item={item}
                  href={`/shoes/${item.keyName}`}
                />
              )
            })}
          </div>
        )}
        {data.length === 0 && !isLoading && <div className='mt-3'>Chưa có sản phẩm</div>}
        <MyLoadMore
          callback={loadMore}
          hasLoadMore={hasNextPage}
          loading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
        />
        <LoadingData loading={isLoading} />
      </div>
    </div>
  )
}

export default ShoesScreen
