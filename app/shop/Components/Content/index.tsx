import ItemProduct from '@/components/ItemProduct'
import MyLoadMore from '@/components/MyLoadMore'
import { PAGE_SIZE_LIMIT } from '@/constants/app'
import useQuerySearch from '@/hooks/useQuerySearch'
import React from 'react'
import { TYPE_PRODUCT } from '@/constants/admin'
import useLanguage from '@/hooks/useLanguage'
import LoadingGetData from '@/components/LoadingGetData'
import useListProducts from '@/hooks/tank-query/useListProducts'
import MySkeleton from '@/components/MySkeleton'

const Content = () => {
  const { queries } = useQuerySearch()
  const { translate } = useLanguage()
  const { data, isLoading, loadMore, hasNextPage, isFetchingNextPage } = useListProducts(
    PAGE_SIZE_LIMIT,
    queries
  )

  const getUrl = (item: any) => {
    if (item.category === TYPE_PRODUCT.shoes) {
      return `/shoes/${item.keyName}`
    }
    return `/shop/${item.keyName}`
  }

  const renderLoading = () => {
    return (
      <>
        <MySkeleton className='w-full min-h-10 h-10 rounded-lg' />
        <LoadingGetData colSurface={3} rows={2} loading />
      </>
    )
  }

  const renderContent = () => {
    return (
      <>
        {data.length > 0 ? (
          <div className='  w-full grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4   gap-3 xl:gap-6 md:gap-4'>
            {data.map((item) => {
              return (
                <ItemProduct
                  showFeedback
                  showSold
                  key={`shop-${item._id}`}
                  item={item}
                  href={getUrl(item)}
                />
              )
            })}
          </div>
        ) : (
          <div className='mt-3'>{translate('textPopular.empty')}</div>
        )}

        <MyLoadMore
          callback={loadMore}
          hasLoadMore={hasNextPage}
          loading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
        />
      </>
    )
  }

  return (
    <div className='flex flex-col gap-3 mt-2'>{isLoading ? renderLoading() : renderContent()}</div>
  )
}

export default Content
