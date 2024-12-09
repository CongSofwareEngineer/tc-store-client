import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import { detectImg, ellipsisText, formatPrice, numberWithCommas } from '@/utils/functions'
import { useAppSelector } from '@/redux/store'
import { COLOR, FILTER_BILL } from '@/constant/app'
import useModalDrawer from '@/hook/useModalDrawer'
import ViewDetailBill from '../ViewDetailBill'
import ModalCancelOrder from '../ModalCancelOrder'
import TextCopy from '@/components/TextCopy'
import { Button } from 'antd'
import MyImage from '@/components/MyImage'
import ConfigBill from '@/components/ConfigBill'
import { TYPE_PRODUCT } from '@/constant/admin'
import styles from './style.module.scss'

type Props = {
  data: { [key: string]: any }
}

const Item = ({ data }: Props) => {
  const { isMobile } = useMedia(1000)
  const { translate } = useLanguage()
  const { openModalDrawer } = useModalDrawer()
  const { CategoryMenu, Language } = useAppSelector((state) => state.app)

  const getTypeProduct = (keyType: string) => {
    const data = CategoryMenu.find((e) => e.keyName === keyType)
    if (data) {
      return `(${data.lang?.[Language?.locale!]})`
    }
    return ''
  }

  const getStatus = (key: string) => {
    switch (key) {
      case FILTER_BILL.Processing:
        return translate('myBill.processing')

      case FILTER_BILL.Delivering:
        return translate('myBill.delivering')

      default:
        return translate('myBill.deliverySuccess')
    }
  }

  const getColorStatus = (key: FILTER_BILL) => {
    switch (key) {
      case FILTER_BILL.Processing:
        return COLOR.red

      case FILTER_BILL.Delivering:
        return COLOR.blue1

      default:
        return COLOR.green1
    }
  }

  const getAddressShip = (item: any) => {
    const address = { ...item.addressShip }
    address.address = address.address.replaceAll('---', ' ')
    return `${address.addressDetail} (${address.address})`
  }

  const handleViewDetail = (item: any) => {
    openModalDrawer({
      content: <ViewDetailBill data={item} />,
      useDrawer: true,
      configDrawer: {
        title: translate('textPopular.viewDetail'),
      },
    })
  }

  const handleCancelOrder = (item: any) => {
    openModalDrawer({
      content: <ModalCancelOrder data={item} />,
    })
  }

  const getRouteProduct = (product: any) => {
    console.log({ product })
    if (product.more_data.category === TYPE_PRODUCT.shoes) {
      return `/shoes/${product.more_data.keyName}`
    }
    return `/shop/${product.more_data.keyName}`
  }

  const renderDesktop = () => {
    return (
      <div className={`shadow-md mb-1  p-4 flex flex-col gap-2 w-full bg-slate-50 ${styles['item-coffee']}`}>
        <div className='flex justify-between w-full'>
          <div className='flex gap-2  '>
            <span>{`${translate('myBill.idOrder')} : `}</span>
            <TextCopy value={data._id} textView={ellipsisText(data._id)} />
          </div>
          <div className='flex gap-2 '>
            <div className=' text-center font-bold' style={{ color: getColorStatus(data.status) }}>
              {getStatus(data.status)}
            </div>
            <span>|</span>
            <div> {moment(Number(data.date)).format('DD/MM/YYYY')}</div>
          </div>
        </div>
        <div className='flex gap-1'>
          <div>{translate('textPopular.address')}</div>
          <div>:</div>
          <div>{getAddressShip(data)}</div>
        </div>
        {data?.listBill?.map((e: any) => {
          return (
            <div key={e._id} className='flex mt-2 gap-2 px-3'>
              <div className='w-[70px]  rounded-md aspect-square overflow-hidden relative flex justify-center items-center'>
                <MyImage className='!relative ' alt={e.more_data.name} src={detectImg(e.more_data.imageMain)} />
              </div>
              <div className='flex justify-between flex-1 gap-2'>
                <div className='flex flex-col gap-1'>
                  <Link href={getRouteProduct(e)}>
                    <span className='hover:underline text-black font-bold '>{e.more_data.name}</span>
                  </Link>
                  <ConfigBill item={e} />
                  <div className=' text-sm text-green-600'>{`${formatPrice(e.more_data.price)} VNĐ`}</div>
                </div>
                <div>x{e.amount}</div>
              </div>
            </div>
          )
        })}

        <div className='w-[calc(100%+32px)] left-[-16px] relative border-[1px] border-gray-200 my-2' />
        <div className='flex w-full justify-end gap-1 px-3'>
          <span>{translate('bill.totalBill')}</span>
          <span>:</span>
          <span className='text-green-600 font-bold'>{`${numberWithCommas(data.totalBill || '0')} VNĐ`}</span>
        </div>
        <div className='flex w-full justify-end gap-2 mt-1 px-3'>
          {data.status === FILTER_BILL.Processing && (
            <Button type='primary' onClick={() => handleCancelOrder(data)}>
              {translate('common.cancelOrder')}
            </Button>
          )}
          <Button className='w-[80px]' onClick={() => handleViewDetail(data)}>
            {translate('common.view')}
          </Button>
        </div>
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div className={`w-full shadow-md  flex flex-col md:gap-2 gap-1 py-3 bg-slate-50 ${styles['item-coffee']}`}>
        <div className='justify-between w-full flex px-3'>
          <div className='flex gap-2  '>
            <span>{`${translate('myBill.idOrder')} : `}</span>
            <TextCopy value={data._id} textView={ellipsisText(data._id, 4, 3)} />
          </div>
          <div className=' text-center font-bold' style={{ color: getColorStatus(data.status) }}>
            {getStatus(data.status)}
          </div>
        </div>
        <div className='flex items-center gap-1 text-[11px] px-3'>
          <span>{translate('bill.dateBuy')}</span>
          <span>:</span>
          <div> {moment(Number(data.date)).format('DD/MM/YYYY')}</div>
        </div>

        {data?.listBill?.map((e: any) => {
          return (
            <div key={e._id} className='flex mt-2 gap-2 px-3'>
              <div className='w-[70px]  rounded-md aspect-square overflow-hidden relative flex justify-center items-center'>
                <MyImage className='!relative ' alt={e.more_data.name} src={detectImg(e.more_data.imageMain)} />
              </div>
              <div className='flex justify-between flex-1 gap-2'>
                <div className='flex flex-col gap-1'>
                  <div>{e.more_data.name}</div>
                  <ConfigBill item={e} />
                  <div className=' text-sm text-green-600'>{`${formatPrice(e.more_data.price)} VNĐ`}</div>
                </div>
                <div>x{e.amount}</div>
              </div>
            </div>
          )
        })}
        <div className='w-full border-[1px] border-gray-200 my-2' />

        <div className='flex w-full justify-end gap-1 px-3'>
          <span>{translate('bill.totalBill')}</span>
          <span>:</span>
          <span className='text-green-600 font-bold'>{`${numberWithCommas(data.totalBill || '0')} VNĐ`}</span>
        </div>
        <div className='flex w-full justify-end gap-2 mt-1 px-3'>
          {data.status === FILTER_BILL.Processing && (
            <Button type='primary' onClick={() => handleCancelOrder(data)}>
              {translate('common.cancelOrder')}
            </Button>
          )}
          <Button className='w-[80px]' onClick={() => handleViewDetail(data)}>
            {translate('common.view')}
          </Button>
        </div>
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default Item
