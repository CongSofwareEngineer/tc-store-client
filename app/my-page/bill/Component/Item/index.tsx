import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import {
  formatPrice,
  formatPriceBase,
  numberWithCommas,
} from '@/utils/functions'
import { useAppSelector } from '@/redux/store'
import { FILTER_BILL } from '@/constant/app'
import PrimaryButton from '@/components/PrimaryButton'
import useModalDrawer from '@/hook/useModalDrawer'
import ViewDetailBill from '../ViewDetailBill'
type Props = {
  data: { [key: string]: any }
}

moment.locale('vi')
moment.updateLocale('vi', {
  monthsShort: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
})
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

  return (
    <div className="w-full justify-center items-center flex gap-3 mt-1 border-b-2 border-gray-200 p-2">
      <div className="w-[20%] min-w-[100px] text-center flex flex-col gap-2">
        <div> {moment(Number(data.date)).format('DD/MM/YYYY')}</div>
        {isMobile && (
          <div className=" text-center">{getStatus(data.status)}</div>
        )}
      </div>
      <div className="flex flex-col lg:gap-3 gap-2 flex-1">
        {isMobile && (
          <>
            <div className="flex gap-1">
              <span className="text-nowrap font-bold">
                {translate('textPopular.totalMoney')}:
              </span>
              <span className="text-nowrap text-red-500 font-bold">
                <span>{`${numberWithCommas(data.totalBill || '0')} VNĐ`}</span>
              </span>
            </div>
            <div className="flex gap-1 ">
              <div className="font-bold">
                {translate('textPopular.amount')}:
              </div>
              <div>{`x${data?.listBill?.length || 1}`}</div>
            </div>
            <span className="flex gap-1 text-[12px] ">
              <span className="text-nowrap font-bold">
                {translate('header.address')} :
              </span>
              <span>{getAddressShip(data)}</span>
            </span>
            <div>
              <PrimaryButton
                size="small"
                onClick={() => handleViewDetail(data)}
              >
                {translate('textPopular.viewDetail')}
              </PrimaryButton>
            </div>
          </>
        )}
        {data?.listBill?.map((e: any) => {
          return (
            <div key={e._id} className="flex flex-col gap-1 ">
              {!isMobile && (
                <>
                  <div className="flex items-baseline gap-2">
                    <Link
                      className="text-black font-bold cursor-pointer hover:underline "
                      href={`shop/${e._id}/${e?.more_data?.keyName}`}
                    >
                      {e?.more_data.name}
                    </Link>
                    {!isMobile && (
                      <span className="flex ">
                        <span>{getTypeProduct(e.more_data.category)}</span>
                      </span>
                    )}
                  </div>
                  <div className=" text-xs flex gap-1">
                    <span>{translate('textPopular.amount')}:</span>
                    <span>{`x${e.amount}`}</span>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    <div>{translate('productDetail.price')}:</div>

                    <div className="text-green-500 lg:font-bold text-nowrap">
                      {`${formatPrice(e?.more_data?.price || '0')} VNĐ`}
                    </div>
                    <div className="text-green-500 line-through ml-2 text-nowrap ">
                      {`(${formatPriceBase(e?.more_data?.price || '0')} VNĐ)`}
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        })}
        {!isMobile && (
          <span className="flex gap-1 text-[12px] opacity-70 ">
            <span className="text-nowrap  ">
              {translate('header.address')} :
            </span>
            <span>{getAddressShip(data)}</span>
          </span>
        )}
      </div>
      {!isMobile && (
        <>
          <div className="w-[15%] text-end">
            <span>{`${numberWithCommas(data.totalBill || '0')} VNĐ`}</span>
          </div>
          <div className="w-[100px] text-center">{getStatus(data.status)}</div>
        </>
      )}
    </div>
  )
}

export default Item
