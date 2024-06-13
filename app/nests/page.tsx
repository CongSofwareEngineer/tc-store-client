'use client'
import useAllNests from '@/hook/tank-query/useAllNests'
import useLanguage from '@/hook/useLanguage'
import { Spin } from 'antd'
import React from 'react'
import ItemNest from './Component/Item'

const PageNests = () => {
  const { data, isLoading } = useAllNests()
  const { translate } = useLanguage()
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

export default PageNests
