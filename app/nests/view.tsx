'use client'
import useLanguage from '@/hook/useLanguage'
import React, { useLayoutEffect } from 'react'
import ItemNest from './Component/Item'
import useQuerySearch from '@/hook/useQuerySearch'
import { useRouter } from 'next/navigation'
import { PAGE_SIZE_LIMIT, TYPE_LOADING_GET_DATA } from '@/constant/app'
import useNests from '@/hook/tank-query/useNests'
import LoadingGetData from '@/components/LoadingGetData'
import MyLoadMore from '@/components/MyLoadMore'

const PageNestsScreen = () => {
  const { queries } = useQuerySearch()
  const { data, isLoading, loadMore, hasNextPage, isFetchingNextPage } =
    useNests(PAGE_SIZE_LIMIT, queries)
  const { translate } = useLanguage()
  const router = useRouter()

  return (
    <div className="w-full flex flex-col gap-4">
      <LoadingGetData
        loading={isLoading}
        type={TYPE_LOADING_GET_DATA.ShopNests}
      />
      {data?.length > 0 && (
        <div className="w-full grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 md:gap-3 gap-2">
          {data?.map((e, index) => {
            return <ItemNest data={e} key={`item-nests-${index}`} />
          })}
        </div>
      )}

      {data?.length === 0 && !isLoading && (
        <div className="w-full grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 md:gap-3 gap-2">
          {data?.length === 0 && <div>{translate('warning.noData')}</div>}
        </div>
      )}

      <MyLoadMore
        callback={loadMore}
        hasLoadMore={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        loading={isLoading}
      />
    </div>
  )
}

export default PageNestsScreen
