'use client'
import { Button } from '@mantine/core'
import { useListState } from '@mantine/hooks'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import LoadingData from './Component/LoadingData'
import { IItemCart } from './type'

import BtnBack from '@/components/BtnBack'
import { PAGE_SIZE_LIMIT } from '@/constants/app'
import useMyCart from '@/hooks/tank-query/useMyCart'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import { cloneData, numberWithCommas } from '@/utils/functions'
// import Payment from './Component/Payment'
import ListItemCart from '@/components/ListItemCart'
import MyLoading from '@/components/MyLoading'
import { QUERY_KEY } from '@/constants/reactQuery'
import useRefreshQuery from '@/hooks/tank-query/useRefreshQuery'
import useFirstLoadPage from '@/hooks/useFirstLoadPage'
import ClientApi from '@/services/clientApi'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'

const Payment = dynamic(() => import('@/components/Payment'), {
  ssr: false,
  loading: () => <MyLoading />,
})

const MyCartScreen = () => {
  const [listPaymentFormat, setListPaymentFormat] = useState<IItemCart[]>([])
  const [pageSize] = useState(PAGE_SIZE_LIMIT)

  useFirstLoadPage()
  const { data, isLoading } = useMyCart(pageSize)
  const { translate } = useLanguage()
  const { isMobile } = useMedia()
  const { refreshListQuery } = useRefreshQuery()
  const [listCarts, updateList] = useListState<IItemCart>(data)

  useEffect(() => {
    updateList.setState(data)
  }, [data])

  const calculatePayment = () => {
    let total = 0

    listCarts.forEach((e) => {
      if (e.selected) {
        total += e.moreData!.price! * e.amountBuy!
      }
    })

    return total
  }

  const calculateItemPayment = () => {
    let total = 0

    listCarts.forEach((e) => {
      if (e.selected) {
        total++
      }
    })

    return total
  }

  const handleSelect = (item: IItemCart, index?: number) => {
    updateList.setItem(index!, item)
  }

  const handleDelete = async (index: number) => {
    const dataRemove = listCarts[index]
    const data = await ClientApi.deleteCart(dataRemove._id!)

    if (data.data) {
      await refreshListQuery([QUERY_KEY.MyCartUser, QUERY_KEY.LengthCartUser])
      showNotificationSuccess(translate('success.delete'))
    } else {
      showNotificationError(translate('error.delete'))
    }
  }

  const handleSelectAll = (isSelect = false) => {
    let dataClone = cloneData(listCarts)

    dataClone = dataClone.map((e: any) => {
      return {
        ...e,
        selected: isSelect,
      }
    })
    updateList.setState(dataClone)
  }

  const handlePayment = () => {
    const arrTemp = listCarts.filter((e) => e?.selected)

    setListPaymentFormat(arrTemp)
  }

  const renderDesktop = () => {
    return (
      <div className='w-full flex flex-col gap-1 overflow-hidden h-full'>
        <BtnBack title={[translate('header.shop'), translate('header.cart')]} url={['/shop']} />
        <LoadingData loading={isLoading} />

        {!isLoading && (
          <div className='w-full flex   gap-5 overflow-hidden '>
            <div
              className='flex-1 max-h-[calc(100dvh-150px)]  border-2 border-gray-300  overflow-y-auto bg-white'
              style={{ boxShadow: '3px 3px 6px rgba(0,0,0,.0509803922)' }}
            >
              <ListItemCart
                callBackClick={handleSelect}
                callBackDelete={handleDelete}
                callBackSelectAll={handleSelectAll}
                dataCart={listCarts}
                loading={isLoading}
              />
              {listCarts.length === 0 && (
                <div className='w-full flex gap-1 mt-3 pl-3'>
                  <span>{translate('textPopular.notData')}</span>
                  <Link href={'/shop'}>{translate('common.buyNow')}</Link>
                </div>
              )}
            </div>
            <div className='lg:w-[400px] md:w-[280px] border-2 border-gray-300 bg-white flex flex-col items-center h-fit p-3 gap-3'>
              <div className='w-full flex justify-between'>
                <div>{translate('textPopular.provisional')}</div>
                <span className='font-bold text-green-500'>{`${numberWithCommas(calculatePayment())} VNĐ`}</span>
              </div>
              <div className='border-[1px] border-gray-300 w-full' />
              <Button className='!w-full' disabled={Number(calculatePayment()) <= 1} onClick={handlePayment}>
                {`${translate('cart.payment')} (${calculateItemPayment()})`}
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div className=' flex flex-1 flex-col h-full  max-h-full w-[calc(100%+40px)] ml-[-20px] overflow-hidden justify-between'>
        <div className='w-full px-5 flex flex-col max-h-[calc(100dvh-175px)]  overflow-y-auto  '>
          <BtnBack className='!mb-0' title={[translate('header.shop'), translate('header.cart')]} url={['/shop']} />

          <LoadingData loading={isLoading} />
          {!isLoading && (
            <>
              <div className='mt-1 flex-1 flex-col  border-[.5px] border-gray-300 bg-white ' style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
                <ListItemCart
                  callBackClick={handleSelect}
                  callBackDelete={handleDelete}
                  callBackSelectAll={handleSelectAll}
                  dataCart={listCarts}
                  loading={isLoading}
                />
                {listCarts.length === 0 && (
                  <div className='w-full flex gap-1 my-2 pl-3'>
                    <span>{translate('textPopular.notData')}</span>
                    <Link href={'/shop'}>{translate('common.buyNow')}</Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className=' w-full flex flex-col bg-white border-gray-300 p-[20px] bottom-0 left-0'>
          <div className='relative flex flex-col gap-2'>
            <div className='flex gap-2 w-full'>
              <div className='font-semibold'>{translate('textPopular.totalMoney')} :</div>
              <span className='font-bold text-green-700'>{numberWithCommas(calculatePayment())} VNĐ</span>
            </div>
            <div className='w-full border-[1px] border-gray-200  relative  ' />

            <Button disabled={Number(calculatePayment()) <= 1} onClick={handlePayment}>
              {`${translate('cart.payment')} (${numberWithCommas(calculatePayment())} VNĐ)`}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {listPaymentFormat?.length > 0 ? (
        <Payment clickBack={() => setListPaymentFormat([])} data={listPaymentFormat} />
      ) : isMobile ? (
        renderMobile()
      ) : (
        renderDesktop()
      )}
    </>
  )
}

export default MyCartScreen
