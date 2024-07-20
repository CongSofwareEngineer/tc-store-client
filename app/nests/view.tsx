'use client'
import useLanguage from '@/hook/useLanguage'
import { Spin } from 'antd'
import React, { useLayoutEffect } from 'react'
import ItemNest from './Component/Item'
import useQuerySearch from '@/hook/useQuerySearch'
import useAllProduct from '@/hook/tank-query/useAllProduct'
import { useRouter } from 'next/navigation'
import { PAGE_SIZE_LIMIT } from '@/constant/app'

const PageNestsScreen = () => {
  const { currentQueries, queries } = useQuerySearch()
  const { data, isLoading } = useAllProduct(1, PAGE_SIZE_LIMIT, queries)
  const { translate } = useLanguage()
  const router = useRouter()

  useLayoutEffect(() => {
    if (currentQueries === '' || !currentQueries) {
      router.push('?typeProduct=nest')
    }
  }, [currentQueries, router])

  return (
    <div className="w-full flex flex-col gap-4">
      {isLoading ? (
        <Spin />
      ) : (
        <div className="w-full grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 md:gap-3 gap-2">
          {data?.data.map((e, index) => {
            return <ItemNest data={e} key={`item-nests-${index}`} />
          })}
          {data?.data.length === 0 && <div>{translate('warning.noData')}</div>}
        </div>
      )}
    </div>
  )
}

export default PageNestsScreen
