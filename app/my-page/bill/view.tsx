'use client'
import useBill from '@/hook/tank-query/useBill'
import useLanguage from '@/hook/useLanguage'
import React, { useEffect, useState } from 'react'
import { Checkbox } from 'antd'
import Link from 'next/link'
import Item from './Component/Item'
import useMedia from '@/hook/useMedia'
import { FILTER_BILL, TYPE_LOADING_GET_DATA } from '@/constant/app'
import useQuerySearch from '@/hook/useQuerySearch'
import MyLoadMore from '@/components/MyLoadMore'
import LoadingGetData from '@/components/LoadingGetData'
// import MyDatePicker from '@/components/MyDatePicker'

const BillScreen = () => {
  const [isDeliverySuccess, setIsDeliverySuccess] = useState(false)
  const [isDelivering, setIsDelivering] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  // const [dateTime, setDateTime] = useState('')
  // console.log({ dateTime })

  const { isMobile } = useMedia()
  const { isMobile: isMediaEx } = useMedia(1000)
  const { queries, currentQueries, updateQuery } = useQuerySearch()
  const { translate } = useLanguage()

  const { data, hasNextPage, isLoading, loadMore, isFetchingNextPage } =
    useBill(queries, '')

  useEffect(() => {
    if (queries?.type && queries?.type?.length > 0) {
      switch (queries?.type[0]) {
        case FILTER_BILL.Processing:
          setIsProcessing(true)
          break
        case FILTER_BILL.Delivering:
          setIsDelivering(true)
          break
        case FILTER_BILL.DeliverySuccess:
          setIsDeliverySuccess(true)
          break
        default:
          setIsDelivering(false)
          setIsDeliverySuccess(false)
          setIsProcessing(false)
          break
      }
    }
    if (!queries?.type) {
      setIsDelivering(false)
      setIsDeliverySuccess(false)
      setIsProcessing(false)
    }
    if (!queries?.date) {
      console.log({})
    }
  }, [queries, currentQueries])

  const onChangeFilter = (key: FILTER_BILL) => {
    switch (key) {
      case FILTER_BILL.All:
        setIsDelivering(false)
        setIsDeliverySuccess(false)
        setIsProcessing(false)
        updateQuery('type', FILTER_BILL.All)
        break
      case FILTER_BILL.Processing:
        setIsDelivering(false)
        setIsDeliverySuccess(false)
        setIsProcessing(true)
        updateQuery('type', FILTER_BILL.Processing)
        break
      case FILTER_BILL.Delivering:
        setIsDelivering(true)
        setIsDeliverySuccess(false)
        setIsProcessing(false)
        updateQuery('type', FILTER_BILL.Delivering)
        break
      default:
        setIsDelivering(false)
        setIsDeliverySuccess(true)
        setIsProcessing(false)
        updateQuery('type', FILTER_BILL.DeliverySuccess)
        break
    }
  }

  const renderDesktop = () => {
    return (
      <>
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
      </>
    )
  }
  const renderMobile = () => {
    return (
      <>
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
      </>
    )
  }

  return (
    <div className="flex flex-col gap-3 w-full ">
      <h2 className="text-medium font-bold">{translate('myBill.title')}</h2>
      <div>{translate('myBill.des')}</div>
      <div className="relative w-full border-[1px]   border-gray-300" />

      <div className="flex flex-wrap gap-4 align-middle   ">
        <div className="flex gap-4 flex-wrap items-center ">
          {/* <MyDatePicker onChange={(e) => setDateTime(e?.toString() || '')} /> */}
          <Checkbox
            onClick={() => onChangeFilter(FILTER_BILL.All)}
            checked={!isDelivering && !isDeliverySuccess && !isProcessing}
          >
            <div className="text-nowrap">{translate('textPopular.all')}</div>
          </Checkbox>
          <Checkbox
            onClick={() => onChangeFilter(FILTER_BILL.DeliverySuccess)}
            checked={isDeliverySuccess}
          >
            <div className="text-nowrap">
              {translate('myBill.deliverySuccess')}
            </div>
          </Checkbox>
          <Checkbox
            onClick={() => onChangeFilter(FILTER_BILL.Delivering)}
            checked={isDelivering}
          >
            <div className="text-nowrap">{translate('myBill.delivering')}</div>
          </Checkbox>
          <Checkbox
            onClick={() => onChangeFilter(FILTER_BILL.Processing)}
            checked={isProcessing}
          >
            <div className="text-nowrap">{translate('myBill.processing')}</div>
          </Checkbox>
        </div>
      </div>

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

        {isMobile ? renderMobile() : renderDesktop()}
        {!isLoading && data?.length === 0 && (
          <div className="flex gap-3 w-full  mt-3 text-medium">
            <span>{translate('cart.empty')}</span>
            <Link href={'/shop'}>{translate('textPopular.buyNow')}</Link>
          </div>
        )}
        <MyLoadMore
          callback={loadMore}
          hasLoadMore={hasNextPage}
          loading={isFetchingNextPage}
        />
      </div>
    </div>
  )
}

export default BillScreen
