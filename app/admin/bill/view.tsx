import MyTable from '@/components/MyTable'
import TextCopy from '@/components/TextCopy'
import { FILTER_BILL, PAGE_SIZE_LIMIT, REQUEST_TYPE } from '@/constant/app'
import useBillAdmin from '@/hook/tank-query/Admin/useBillAdmin'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import useSearchBaseAdmin from '@/hook/useSearchBaseAdmin'
import {
  formatDateTime,
  formatPrice,
  showNotificationError,
  showNotificationSuccess,
} from '@/utils/functions'
import React from 'react'
import ItemDetail from './Components/Itemdetail'
import ModalDelete from '@/components/ModalDelete'
import ServerApi from '@/services/serverApi'
import useLanguage from '@/hook/useLanguage'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import { QUERY_KEY } from '@/constant/reactQuery'
import MyButton from '@/components/MyButton'
import useQuerySearch from '@/hook/useQuerySearch'

const BillAdminScreen = () => {
  const { renderContent } = useSearchBaseAdmin({
    admin: false,
    category: false,
    keyName: false,
    oneDate: false,
  })
  const { queries } = useQuerySearch()
  const { data, isLoading } = useBillAdmin(queries)
  const { isMobile } = useMedia()
  const { openModalDrawer, closeModalDrawer } = useModalDrawer()
  const { translate } = useLanguage()
  const { refreshQuery } = useRefreshQuery()

  const getAmountBuy = (item: any) => {
    let amount = 0
    item.listBill.forEach((e: any) => {
      amount += e.amount
    })
    return amount
  }

  const handleSubmit = (item: any, status: FILTER_BILL) => {
    const callBack = async () => {
      const res = await ServerApi.requestBase({
        url: `bill/update/${item._id}`,
        body: {
          status: status,
        },
        method: REQUEST_TYPE.POST,
      })

      if (res?.data) {
        showNotificationSuccess(translate('myPage.updateSuccess'))
        refreshQuery(QUERY_KEY.BillAdmin)
      } else {
        showNotificationError(translate('textPopular.updateFailed'))
      }
      closeModalDrawer()
    }
    openModalDrawer({
      content: <ModalDelete title="Do you Delivery Bill" callback={callBack} />,
    })
  }

  // const handleDelete = async (id: string) => {
  //   const callback = async () => {
  //     const data = await fetchConfig({
  //       url: `/bill/delete/${id}`,
  //       method: REQUEST_TYPE.DELETE,
  //     })
  //     if (data?.data) {
  //       showNotificationSuccess(translate('success.delete'))
  //       refreshQuery(QUERY_KEY.BillAdmin)
  //     } else {
  //       showNotificationError(translate('error.delete'))
  //     }
  //     closeModalDrawer()
  //   }

  //   openModalDrawer({
  //     content: <ModalDelete title="Do you delete Bill" callback={callback} />,
  //   })
  // }

  const handleViewDetail = (item: any) => {
    openModalDrawer({
      content: <ItemDetail data={item} />,
      useDrawer: true,
      configDrawer: {
        placement: 'bottom',
        title: (
          <p className="text-center text-medium font-bold ">
            {translate('bill.infoBill')}
          </p>
        ),
        height: 'auto',
      },
    })
  }

  const renderStatus = (status: string) => {
    switch (status) {
      case FILTER_BILL.Processing:
        return (
          <span className="text-blue-700 font-bold">
            {translate('myBill.processing')}
          </span>
        )
      case FILTER_BILL.Delivering:
        return (
          <span className="text-green-500 font-bold">
            {translate('myBill.delivering')}
          </span>
        )

      case FILTER_BILL.Canceled:
        return (
          <span className="text-red-500 font-bold">
            {translate('common.cancelBill')}
          </span>
        )

      default:
        return (
          <span className="text-green-500 font-bold">
            {translate('myBill.deliverySuccess')}
          </span>
        )
    }
  }

  const columns = [
    {
      title: '_id',
      key: '_id',
      dataIndex: '_id',
      render: (_: any, record: any) => {
        return (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="font-bold">{`${translate(
                'bill.dateBuy'
              )} :`}</span>
              <span className="text-nowrap">
                {formatDateTime(parseInt(record?.date))}
              </span>{' '}
            </div>
            <div className="flex gap-2">
              <span className="font-bold">ID: </span>
              <TextCopy textView={record._id} />
            </div>
            <div className="flex gap-2">
              <span className="font-bold">SĐT :</span>
              <TextCopy textView={record.sdt} />
            </div>
            <div className="flex gap-2">
              <span className="font-bold">{`${translate(
                'textPopular.amount'
              )} :`}</span>
              <span>{getAmountBuy(record)}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">{`${translate(
                'textPopular.status'
              )} :`}</span>
              {renderStatus(record.status)}
            </div>
            <div className="flex gap-2">
              <span className="font-bold">{`${translate(
                'textPopular.totalMoney'
              )} :`}</span>
              <span className="text-green-500 font-bold">
                {formatPrice(record?.totalBill || '0')}
              </span>
            </div>

            <div className="flex gap-5 md:flex-row">
              {record?.status === FILTER_BILL.Processing && (
                <MyButton
                  onClick={() => handleSubmit(record, FILTER_BILL.Delivering)}
                  widthBtn={isMobile ? '100%' : '150px'}
                >
                  {translate('myBill.delivering')}
                </MyButton>
              )}
              {record?.status === FILTER_BILL.Delivering && (
                <MyButton
                  onClick={() =>
                    handleSubmit(record, FILTER_BILL.DeliverySuccess)
                  }
                  widthBtn={isMobile ? '100%' : '150px'}
                >
                  {translate('myBill.deliverySuccess')}
                </MyButton>
              )}
              <div className="flex md:flex-auto flex-1">
                <MyButton
                  onClick={() => handleViewDetail(record)}
                  type="primary"
                >
                  {translate('common.view')}
                </MyButton>
              </div>
            </div>
          </div>
        )
      },
    },
  ]
  return (
    <div className="flex flex-col gap-3 w-full">
      {renderContent()}
      <MyTable
        columns={columns}
        loading={isLoading}
        data={data || []}
        limit={PAGE_SIZE_LIMIT}
        total={20}
      />
    </div>
  )
}

export default BillAdminScreen
