import ItemProduct from '@/components/ItemProduct'
import MyLoadMore from '@/components/MyLoadMore'
import { PAGE_SIZE_LIMIT } from '@/constant/app'
import useAllProduct from '@/hook/tank-query/useAllProduct'
import useQuerySearch from '@/hook/useQuerySearch'
import React from 'react'
import LoadingData from '../LoadingData'

const Content = () => {
  const { queries } = useQuerySearch()
  const { data, isLoading, loadMore, hasNextPage, isFetchingNextPage } =
    useAllProduct(PAGE_SIZE_LIMIT, queries)

  return (
    <>
      {data.length > 0 && (
        <div className="mt-2  w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3   2xl:grid-cols-4 gap-3 md:gap-6">
          {data.map((item: any) => {
            return (
              <ItemProduct
                showFeedback
                showSold
                key={item.id}
                item={item}
                href={`/shop/${item.keyName}`}
              />
            )
          })}
        </div>
      )}

      {data.length === 0 && !isLoading && (
        <div className="mt-3">Chưa có sản phẩm</div>
      )}

      <MyLoadMore
        callback={loadMore}
        hasLoadMore={hasNextPage}
        loading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
      />

      <LoadingData loading={isLoading} />
    </>
  )
}

export default Content
