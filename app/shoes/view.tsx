'use client'
import useQuerySearch from '@/hooks/useQuerySearch'
import React from 'react'
import MyLoadMore from '@/components/MyLoadMore'
import LoadingGetData from '@/components/LoadingGetData'
import useFirstLoadPage from '@/hooks/useFirstLoadPage'
import MenuShoes from './Components/MenuShoes'
import useShoesShop from '@/hooks/tank-query/useShoesShop'
import ItemProduct from '@/components/ItemProduct'
import InputSearch from '@/components/InputSearch'
import MySkeleton from '@/components/MySkeleton'
import useLanguage from '@/hooks/useLanguage'

const ShoesScreen = () => {
  useFirstLoadPage()
  const { queries } = useQuerySearch()
  const { translate } = useLanguage()
  const { data, isLoading, hasNextPage, loadMore, isFetchingNextPage } = useShoesShop(queries)

  const renderLoading = () => {
    return (
      <>
        <MySkeleton className='w-full min-h-10 h-10 rounded-lg' />

        <LoadingGetData loading colSurface={3} rows={2} />
      </>
    )
  }

  const renderContent = () => {
    return (
      <>
        <InputSearch />

        {data.length > 0 ? (
          <div className=' w-full grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4   gap-3 xl:gap-6 md:gap-4'>
            {data.map((item: any) => {
              return <ItemProduct key={`shoes-${item._id}`} showFeedback showSold href={`/shop/${item.keyName}`} item={item} />
            })}
          </div>
        ) : (
          <div className='mt-3'>{translate('textPopular.empty')}</div>
        )}

        <MyLoadMore callback={loadMore} hasLoadMore={hasNextPage} isFetchingNextPage={isFetchingNextPage} loading={isLoading} />
      </>
    )
  }

  return (
    <div className='w-full flex md:flex-row flex-col  md:gap-6 gap-3  h-full justify-star md:mt-3'>
      <div className='md:w-[250px] w-full' data-aos='fade-right'>
        <MenuShoes />
      </div>
      <div className='flex-1 w-full flex flex-col gap-3 h-full' data-aos='fade-left'>
        {isLoading ? renderLoading() : renderContent()}
      </div>
    </div>
  )
}

export default ShoesScreen
