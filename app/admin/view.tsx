import MyTable, { ColumnsType } from '@/components/MyTable'
import TextCopy from '@/components/TextCopy'
import { FILTER_BILL, PAGE_SIZE_LIMIT } from '@/constant/app'
import useRevenue from '@/hook/tank-query/Admin/useRevenue'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import useQuerySearch from '@/hook/useQuerySearch'
import useSearchBaseAdmin from '@/hook/useSearchBaseAdmin'
import { ellipsisText, getColorStatus, numberWithCommas } from '@/utils/functions'
import { formatDateTime } from '@/utils/momentFunc'
import { Button } from 'antd'
import { NextPage } from 'next'
import React from 'react'
import ModalViewBillDetail from './Component/ModalViewBillDetail'
import GraphRevenue from './Component/GraphRevenue'

const RevenueScreen: NextPage = () => {
  const { queries } = useQuerySearch()
  const { isMobile } = useMedia(568)
  const { translate } = useLanguage()
  const { openModalDrawer } = useModalDrawer()

  const { renderContent } = useSearchBaseAdmin(
    {
      dateEnd: true,
      dateStart: true,
      id: true,
    },
    {
      id: translate('bill.id'),
    },
  )

  const { data, isLoading, hasNextPage, isFetchingNextPage, loadMore } = useRevenue(PAGE_SIZE_LIMIT, queries)

  const handleViewDetail = (item: any) => {
    openModalDrawer({
      content: <ModalViewBillDetail data={item} />,
      title: translate('textPopular.viewDetail'),
      useDrawer: true,
    })
  }

  const getStatus = (key: string) => {
    switch (key) {
      case FILTER_BILL.Processing:
        return translate('myBill.processing')

      case FILTER_BILL.Canceled:
        return translate('common.cancelOrder')

      case FILTER_BILL.Delivering:
        return translate('myBill.delivering')

      default:
        return translate('myBill.deliverySuccess')
    }
  }

  const getColumns = (): ColumnsType[] => {
    if (isMobile) {
      const columns: ColumnsType[] = [
        {
          title: translate('bill.id'),
          key: '_id',
          dataIndex: '_id',
          render: (id: any) => {
            return <TextCopy value={id} textView={ellipsisText(id, 2, 2)} />
          },
        },
        {
          title: translate('textPopular.infor'),
          key: '_id',
          dataIndex: '_id',
          render: (id: string, record: any) => {
            return <TextCopy value={id} textView={ellipsisText(id, 2, 2)} />
          },
        },
      ]
      return columns
    }
    const columns: ColumnsType[] = [
      // {
      //   title: 'STT',
      //   key: '_id',
      //   dataIndex: '_id',
      //   render: (id: string, record: any, index: number) => {
      //     return <span>{index + 1}</span>
      //   },
      // },
      {
        title: translate('bill.id'),
        key: '_id',
        dataIndex: '_id',
        render: (id: any) => {
          return <TextCopy value={id} textView={ellipsisText(id, 2, 2)} />
        },
      },
      {
        title: 'SDT',
        key: 'sdt',
        dataIndex: 'sdt',
        render: (sdt: any) => {
          return <TextCopy value={sdt} textView={ellipsisText(sdt, 4, 4)} />
        },
      },
      // {
      //   title: translate('textPopular.status'),
      //   key: 'status',
      //   dataIndex: 'status',
      //   filters: [
      //     {
      //       text: getStatus(FILTER_BILL.DeliverySuccess),
      //       value: FILTER_BILL.DeliverySuccess,
      //     },
      //     {
      //       text: getStatus(FILTER_BILL.Delivering),
      //       value: FILTER_BILL.Delivering,
      //     },
      //     {
      //       text: getStatus(FILTER_BILL.Processing),
      //       value: FILTER_BILL.Processing,
      //     },
      //     {
      //       text: getStatus(FILTER_BILL.Canceled),
      //       value: FILTER_BILL.Canceled,
      //     },
      //   ],
      //   onFilter: (value, record) => record.status === value,
      //   render: (status: any) => {
      //     return (
      //       <div className='font-bold whitespace-nowrap' style={{ color: getColorStatus(status) }}>
      //         {getStatus(status)}
      //       </div>
      //     )
      //   },
      // },

      {
        title: translate('bill.totalBill'),
        key: 'totalBill',
        dataIndex: 'totalBill',
        render: (totalBill: any) => {
          return <div className='text-green-500'>{numberWithCommas(totalBill)}</div>
        },
      },
      {
        title: translate('textPopular.disCount'),
        key: 'discount',
        dataIndex: 'discount',
        render: (discount: any) => {
          return <div className='text-green-500 whitespace-nowrap'>{numberWithCommas(discount)}</div>
        },
      },
      {
        title: translate('bill.dateBuy'),
        key: 'date',
        dataIndex: 'date',
        render: (date: any) => {
          return <div className='whitespace-nowrap'>{formatDateTime(parseInt(date))}</div>
        },
      },
      {
        title: translate('textPopular.addressShip'),
        key: 'addressShip',
        dataIndex: 'addressShip',
        render: (addressShip: any) => {
          return (
            <div className='flex gap-1'>
              {/* <span className="text-nowrap">Address :</span> */}
              <div>{`${addressShip.addressDetail} (${addressShip.address.replaceAll('---', ', ')})`}</div>
            </div>
          )
        },
      },
      {
        title: '',
        key: 'addressShip',
        dataIndex: 'addressShip',
        fixed: 'right',
        render: (_: any, record: any) => {
          return (
            <div className='flex gap-2 flex-col'>
              {/* <Button>{translate('common.update')}</Button> */}
              <Button onClick={() => handleViewDetail(record)} type='primary'>
                {translate('textPopular.viewDetail')}
              </Button>
            </div>
          )
        },
      },
    ]

    return columns
  }

  return (
    <div className='flex flex-col gap-3 w-full overflow-y-auto '>
      {renderContent()}
      <GraphRevenue data={data} />
      <div>
        <MyTable
          loadMore={loadMore}
          hasMoreData={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          columns={getColumns()}
          loading={isLoading}
          data={data || []}
          limit={PAGE_SIZE_LIMIT}
          total={20}
        />
      </div>
    </div>
  )
}

export default RevenueScreen
