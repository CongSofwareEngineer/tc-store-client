'use client'
import useQuerySearch from '@/hooks/useQuerySearch'
import React from 'react'
import MyLoadMore from '@/components/MyLoadMore'
import useAos from '@/hooks/useAos'
import LoadingGetData from '@/components/LoadingGetData'
import useFirstLoadPage from '@/hooks/useFirstLoadPage'
import MenuShoes from './Components/MenuShoes'
import useShoesShop from '@/hooks/tank-query/useShoesShop'
import ItemProduct from '@/components/ItemProduct'
import InputSearch from '@/components/InputSearch'

const ShoesScreen = () => {
  useAos()
  useFirstLoadPage()
  const { queries } = useQuerySearch()
  const { data, isLoading, hasNextPage, loadMore, isFetchingNextPage } = useShoesShop(queries)

  return (
    <div className='w-full flex md:flex-row flex-col  md:gap-6 gap-3  h-full justify-star md:mt-3'>
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
                  key={`shoes-${item._id}`}
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
        {isLoading && <div className='w-full mt-2' />}
        <LoadingGetData colSurface={3} rows={2} loading={isLoading} />
      </div>
    </div>
  )
}

export default ShoesScreen
