import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import React from 'react'
import Link from 'next/link'
import { ellipsisText, formatPrice, getUrlProduct, numberWithCommas } from '@/utils/functions'
import { COLOR, DEFAULT_FEE_SHIP, FILTER_BILL } from '@/constants/app'
import useModalDrawer from '@/hooks/useModalDrawer'
import TextCopy from '@/components/TextCopy'
import ConfigBill from '@/components/ConfigBill'
import styles from './style.module.scss'
import { formatDateTime } from '@/utils/momentFunc'
import { Button } from '@mantine/core'
import ModalCancelOrder from '../ModalCancelOrder'
import ViewDetailBill from '../ViewDetailBill'
import { IClientApi, IItemListBill } from '@/services/ClientApi/type'
import ImageMain from '@/components/ImageMain'

type Props = {
  data: IClientApi['bill']
  indexData: number
}

const Item = ({ data, indexData }: Props) => {
  console.log({ data })

  const { isMobile } = useMedia(1000)
  const { translate } = useLanguage()
  const { openModalDrawer } = useModalDrawer()

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

  const handleViewDetail = (item: IClientApi['bill']) => {
    openModalDrawer({
      content: <ViewDetailBill data={item} />,
      useDrawer: true,
      title: translate('textPopular.viewDetail'),
    })
  }

  const handleCancelOrder = (item: any) => {
    openModalDrawer({
      content: <ModalCancelOrder data={item} />,
    })
  }

  const renderTotalBill = () => {
    let total = 0
    data.listBill.forEach((bill) => {
      total += bill.amountBuy * bill.moreData.price!
    })
    total += DEFAULT_FEE_SHIP
    total -= data.discount
    return <span className='text-green-600 font-bold'>{`${numberWithCommas(total)} VNĐ`}</span>
  }

  const renderImgMain = (item: IItemListBill) => {
    return <ImageMain listImage={item.moreData.images} model={item.models.model} />
  }

  const renderDesktop = () => {
    return (
      <div
        style={{
          background: indexData % 2 !== 0 ? 'white' : '#f3f3f3',
        }}
        className={`shadow-md mb-1  p-4 flex flex-col gap-2 w-full bg-slate-50 ${styles['item-coffee']}`}
      >
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
            {/* <div> {moment(Number(data.date)).format('DD/MM/YYYY')}</div> */}
            <div> {formatDateTime(data.date, 'DD/MM/YYYY')}</div>
          </div>
        </div>
        <div className='flex gap-1'>
          <div>{translate('textPopular.address')}</div>
          <div>:</div>
          <div>{getAddressShip(data)}</div>
        </div>
        <div className='flex flex-col w-full mt-2'>
          {data?.listBill?.map((e: any, index: number) => {
            const isHasBorder = index < data?.listBill.length - 1

            return (
              <div
                style={{
                  borderBottom: `${isHasBorder ? 1 : 0}px solid #e5e7eb `,
                  paddingBottom: isHasBorder ? 15 : 0,
                  paddingTop: index > 0 ? 15 : 0,
                }}
                key={e._id}
                className='flex gap-3 '
              >
                <div className='w-[70px]  rounded-md aspect-square overflow-hidden relative flex justify-center items-center'>
                  {renderImgMain(e)}
                </div>
                <div className='flex justify-between flex-1 gap-2'>
                  <div className='flex flex-col gap-1'>
                    <Link href={getUrlProduct(e)}>
                      <span className='hover:underline text-black font-bold '>
                        {e?.moreData?.name}
                      </span>
                    </Link>
                    <ConfigBill
                      item={{
                        configBill: {
                          model: e.models.model,
                          size: e.models.size,
                        },
                        ...e,
                      }}
                    />
                    <div className=' text-sm text-green-600'>{`${formatPrice(e?.moreData?.price)} VNĐ`}</div>
                  </div>
                  <div>x{e.amountBuy}</div>
                </div>
              </div>
            )
          })}
        </div>

        <div className='w-[calc(100%+32px)] left-[-16px] relative border-[1px] border-gray-200 my-2' />
        <div className='flex w-full justify-end gap-1 px-3'>
          <span>{translate('bill.totalBill')}</span>
          <span>:</span>
          {renderTotalBill()}
        </div>
        <div className='flex w-full justify-end gap-2 mt-1 px-3'>
          {data.status === FILTER_BILL.Processing && (
            <Button variant='filled' onClick={() => handleCancelOrder(data)}>
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
      <div
        style={{
          background: indexData % 2 !== 0 ? 'white' : '#f3f3f3',
        }}
        className={`w-full shadow-md  flex flex-col md:gap-2 gap-1 py-3 bg-slate-50 ${styles['item-coffee']}`}
      >
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
          <div> {formatDateTime(data.date, 'DD/MM/YYYY')}</div>
        </div>

        <div className='flex flex-col  w-full mt-2'>
          {data?.listBill?.map((e: any, index: number) => {
            const isHasBorder = index < data?.listBill.length - 1

            return (
              <div
                style={{
                  borderBottom: `${isHasBorder ? 1 : 0}px solid #e5e7eb `,
                  paddingBottom: isHasBorder ? 15 : 0,
                  paddingTop: index > 0 ? 15 : 0,
                }}
                key={e._id}
                className='flex gap-3 px-3 '
              >
                <div className='w-[70px]  rounded-md aspect-square overflow-hidden relative flex justify-center items-center'>
                  {renderImgMain(e)}
                </div>
                <div className='flex justify-between flex-1 gap-2'>
                  <div className='flex flex-col gap-1'>
                    <div>{e?.moreData?.name}</div>
                    <ConfigBill item={e} />
                    <div className=' text-sm text-green-600'>{`${formatPrice(e?.moreData?.price)} VNĐ`}</div>
                  </div>
                  <div>x{e.amountBuy}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className='w-full border-[1px] border-gray-200 my-2' />

        <div className='flex w-full justify-end gap-1 px-3'>
          <span>{translate('bill.totalBill')}</span>
          <span>:</span>
          {renderTotalBill()}
        </div>
        <div className='flex w-full justify-end gap-2 mt-1 px-3'>
          {data.status === FILTER_BILL.Processing && (
            <Button variant='filled' onClick={() => handleCancelOrder(data)}>
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
