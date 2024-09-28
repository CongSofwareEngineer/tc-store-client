'use client'
import useBill from '@/hook/tank-query/useBill'
import useLanguage from '@/hook/useLanguage'
import React from 'react'
import Link from 'next/link'
import Item from './Component/Item'
import useMedia from '@/hook/useMedia'
import { TYPE_LOADING_GET_DATA } from '@/constant/app'
import useQuerySearch from '@/hook/useQuerySearch'
import MyLoadMore from '@/components/MyLoadMore'
import LoadingGetData from '@/components/LoadingGetData'
import OptionFilter from './Component/OptionFilter'
// import MyDatePicker from '@/components/MyDatePicker'

const BillScreen = () => {
  const { isMobile: isMediaEx } = useMedia(1000)
  const { queries } = useQuerySearch()
  const { translate } = useLanguage()

  const { data, hasNextPage, isLoading, loadMore, isFetchingNextPage } =
    useBill(queries, '')

  return (
    <div className="flex flex-col gap-3 w-full ">
      <h2 className="text-medium font-bold">{translate('myBill.title')}</h2>
      <div>{translate('myBill.des')}</div>
      <div className="relative w-full border-[1px]   border-gray-300" />

      <OptionFilter />

      <div className="flex flex-col">
        <div className="flex gap-3 flex-nowrap mt-3 bg-green-100 py-3 px-2 font-bold">
          <div className="w-[20%] min-w-[100px] text-center">
            {translate('bill.dateBuy')}
          </div>
          <div className="flex flex-1 ">{translate('bill.infoBill')}</div>
          {!isMediaEx && (
            <>
              <div className="w-[15%] text-end">
                {translate('textPopular.totalMoney')}
              </div>
              <div className="w-[100px] text-center">
                {translate('textPopular.status')}
              </div>
              <div className="w-[50px] text-center">
                {translate('common.view')}
              </div>
            </>
          )}
        </div>

        {data.length > 0 && (
          <div className="flex gap-3 w-full flex-col mb-10">
            {data.map((e) => {
              return <Item data={e} key={e?._id} />
            })}
          </div>
        )}

        <LoadingGetData
          loading={isLoading}
          type={TYPE_LOADING_GET_DATA.MyBill}
        />

        {!isLoading && data?.length === 0 && (
          <div className="flex gap-3 w-full  mt-3 text-medium">
            <span>{translate('cart.empty')}</span>
            <Link href={'/shop'}>{translate('textPopular.buyNow')}</Link>
          </div>
        )}
        <MyLoadMore
          callback={loadMore}
          hasLoadMore={hasNextPage}
          loading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  )
}

export default BillScreen
