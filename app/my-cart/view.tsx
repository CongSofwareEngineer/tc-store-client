'use client'
import BtnBack from '@/components/BtnBack'
import useMyCart from '@/hooks/tank-query/useMyCart'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import { useEffect, useState } from 'react'
import { PAGE_SIZE_LIMIT } from '@/constants/app'
import { cloneData, numberWithCommas } from '@/utils/functions'
// import Payment from './Component/Payment'
import ClientApi from '@/services/clientApi'
import useRefreshQuery from '@/hooks/tank-query/useRefreshQuery'
import { QUERY_KEY } from '@/constants/reactQuery'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import MyLoading from '@/components/MyLoading'
import useFirstLoadPage from '@/hooks/useFirstLoadPage'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import { Button } from '@mantine/core'
import ListItemCart from '@/components/ListItemCart'
import LoadingData from './Component/LoadingData'
import { IItemCart } from './type'

const Payment = dynamic(() => import('@/components/Payment'), {
  ssr: false,
  loading: () => <MyLoading />,
})

const MyCartScreen = () => {
  const [listCartFormat, setListCartFormat] = useState<IItemCart[]>([])
  const [listPaymentFormat, setListPaymentFormat] = useState<IItemCart[]>([])
  const [pageSize] = useState(PAGE_SIZE_LIMIT)

  useFirstLoadPage()
  const { data, isLoading } = useMyCart(pageSize)
  const { translate } = useLanguage()
  const { isMobile } = useMedia()
  const { refreshListQuery } = useRefreshQuery()

  useEffect(() => {
    if (data) {
      setListCartFormat((e) => {
        const arr = data.map((eChil: any) => {
          if (e.length > 0) {
            const item = e.find((temp) => temp.id === eChil?.id)
            if (item) {
              return item
            }
          }
          return { ...eChil, selected: false }
        })
        return arr
      })
    }

    return () => setListCartFormat([])
  }, [data])
  console.log({ listCartFormat })

  const calculatePayment = () => {
    let total = 0
    listCartFormat.forEach((e) => {
      if (e.selected) {
        total += e.moreData!.price! * e.amountBuy!
      }
    })
    return total
  }

  const calculateItemPayment = () => {
    let total = 0
    listCartFormat.forEach((e: any) => {
      if (e.selected) {
        total++
      }
    })
    return total
  }

  const handleSelect = (item: any, index?: number) => {
    const dataClone = cloneData(listCartFormat)
    dataClone[Number(index)] = item
    setListCartFormat(dataClone)
  }

  const handleDelete = async (index: number) => {
    const dataRemove = listCartFormat[index]
    const data = await ClientApi.deleteCart(dataRemove._id!)
    if (data.data) {
      await refreshListQuery([QUERY_KEY.MyCartUser, QUERY_KEY.LengthCartUser])
      showNotificationSuccess(translate('success.delete'))
    } else {
      showNotificationError(translate('error.delete'))
    }
  }

  const handleSelectAll = (isSelect = false) => {
    let dataClone = cloneData(listCartFormat)
    dataClone = dataClone.map((e: any) => {
      return {
        ...e,
        selected: isSelect,
      }
    })
    setListCartFormat(dataClone)
  }

  const handlePayment = () => {
    const arrTemp = listCartFormat.filter((e) => e?.selected)
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
              style={{ boxShadow: '3px 3px 6px rgba(0,0,0,.0509803922)' }}
              className='flex-1 max-h-[calc(100dvh-150px)]  border-2 border-gray-300  overflow-y-auto bg-white'
            >
              <ListItemCart
                dataCart={listCartFormat}
                callBackClick={handleSelect}
                callBackDelete={handleDelete}
                callBackSelectAll={handleSelectAll}
                loading={isLoading}
              />
              {listCartFormat.length === 0 && (
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
              <Button
                className='!w-full'
                disabled={Number(calculatePayment()) <= 1}
                onClick={handlePayment}
              >
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
          <BtnBack
            className='!mb-0'
            title={[translate('header.shop'), translate('header.cart')]}
            url={['/shop']}
          />

          <LoadingData loading={isLoading} />
          {!isLoading && (
            <>
              <div
                style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}
                className='mt-1 flex-1 flex-col  border-[.5px] border-gray-300 bg-white '
              >
                <ListItemCart
                  dataCart={listCartFormat}
                  callBackClick={handleSelect}
                  callBackDelete={handleDelete}
                  callBackSelectAll={handleSelectAll}
                  loading={isLoading}
                />
                {listCartFormat.length === 0 && (
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
              <span className='font-bold text-green-700'>
                {numberWithCommas(calculatePayment())} VNĐ
              </span>
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
