'use client'
import ModalDelete from '@/components/ModalDelete'
import MyTable from '@/components/MyTable'
import { PAGE_SIZE_LIMIT } from '@/constant/app'
import { QUERY_KEY } from '@/constant/reactQuery'
import useFanPage from '@/hook/tank-query/Admin/useFanPage'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import { formatDateTime } from '@/utils/momentFunc'
import { showNotificationSuccess } from '@/utils/notification'
import { Button } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import ModalConfig from './modalConfig'
import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import ImageAdmin from '@/components/ImageAdmin'
import AdminApi from '@/services/adminApi'

const FanPageScreen = () => {
  const { data, isLoading } = useFanPage()
  const { refreshQuery } = useRefreshQuery()
  const { translate, copyToClipboard } = useLanguage()
  const { isMobile } = useMedia()
  const { openModalDrawer } = useModalDrawer()

  const handleConfig = (item?: any) => {
    openModalDrawer({
      content: <ModalConfig data={item} />,
      useDrawer: true,
      title: item ? translate('common.update') : translate('common.create'),
      configModal: {
        className: '!max-w-[1200px] !w-[85dvw] ',
      },
      configDrawer: {
        height: 'auto',
        placement: 'bottom',
      },
    })
  }

  const handleDelete = (item?: any) => {
    const callback = async () => {
      const imageDelete = item.listImage || []
      const listId = [item?._id]

      const res = await AdminApi.deleteFanPage({
        imageDelete,
        listId,
      })
      if (res.data) {
        await refreshQuery(QUERY_KEY.GetFanPage)
        showNotificationSuccess(translate('success.delete'))
      }
    }

    openModalDrawer({
      content: <ModalDelete callback={callback} />,
    })
  }

  const getColumns = () => {
    if (isMobile) {
      const columns: ColumnsType = [
        {
          key: '_id',
          title: translate('textPopular.infor'),
          render: (id: any, record: any) => {
            console.log({ record })

            return (
              <div className='flex flex-col gap-2 w-full  '>
                <div className='flex gap-2 items-center'>
                  <span className='font-bold'>{translate('textPopular.date')}:</span>
                  <span>{formatDateTime(parseInt(record.date))}</span>
                </div>

                <div className='flex gap-2 items-center'>
                  <span className='font-bold'>{translate('textPopular.source')}:</span>
                  <span>{record.source}</span>
                </div>
                <div className='flex gap-2'>
                  <div className='font-bold'>{translate('admin.infoDetail')}:</div>
                  <div className='text-green-500'>
                    <CopyOutlined className='text-xl  cursor-pointer' onClick={() => copyToClipboard(record.des)} />
                  </div>
                </div>
                <div className='flex w-full max-h-[300px] py-2 overflow-y-auto'>
                  <div
                    className='whitespace-break-spaces '
                    dangerouslySetInnerHTML={{
                      __html: record.des,
                    }}
                  />
                </div>

                <div className='flex gap-3 w-full  max-w-[calc(100dvw-85px)]  overflow-auto py-2'>
                  {record.listImage.map((e: string) => {
                    return (
                      <div key={e} className='overflow-hidden relative w-[80px] min-w-[80px] aspect-square'>
                        <ImageAdmin src={e} />{' '}
                      </div>
                    )
                  })}
                </div>
                <div className='flex gap-3'>
                  <Button className='flex flex-1' onClick={() => handleConfig(record)}>
                    {translate('common.update')}
                  </Button>
                  <Button className='flex flex-1' onClick={() => handleDelete(record._id)} type='primary'>
                    {translate('common.delete')}
                  </Button>
                </div>
              </div>
            )
          },
        },
      ]

      return columns
    }

    const columns: ColumnsType = [
      {
        key: 'date',
        dataIndex: 'date',
        title: translate('textPopular.date'),
        render: (date: any) => {
          return <div className='whitespace-nowrap text-green-500 font-bold'>{formatDateTime(parseInt(date))}</div>
        },
      },

      {
        key: 'source',
        dataIndex: 'source',
        title: translate('textPopular.source'),
        render: (source: string) => {
          return <div className='min-w-16'>{source}</div>
        },
      },

      {
        key: 'des',
        dataIndex: 'des',
        title: translate('textPopular.infor'),
        width: 300,
        render: (des: any) => {
          return (
            <div className='flex w-full max-h-[300px] min-w-[300px] py-2 overflow-y-auto'>
              <div
                className='whitespace-break-spaces'
                dangerouslySetInnerHTML={{
                  __html: des,
                }}
              />
            </div>
          )
        },
      },
      {
        key: 'listImage',
        dataIndex: 'listImage',
        title: translate('textPopular.image'),
        render: (listImage: string[]) => {
          return (
            <div className='grid grid-cols-2 gap-3 w-[200px] overflow-y-auto flex-col max-h-[300px]'>
              {listImage.map((e: string) => {
                return (
                  <div
                    key={e}
                    className='overflow-hidden relative w-[80px] h-[80px] min-h-[80px] min-w-[80px] aspect-square'
                  >
                    <ImageAdmin src={e} />
                  </div>
                )
              })}
            </div>
          )
        },
      },
      {
        key: 'source',
        dataIndex: 'source',
        fixed: 'right',
        render: (source: any, record: any) => {
          return (
            <div className='flex gap-2  items-center justify-end'>
              <div className='text-2xl text-green-500'>
                <EditOutlined
                  className='hover:scale-105 cursor-pointer'
                  style={{ fontSize: 24 }}
                  onClick={() => handleConfig(record)}
                />
              </div>

              <div className='text-red-500'>
                <DeleteOutlined
                  onClick={() => handleDelete(record)}
                  className='hover:scale-105 cursor-pointer'
                  style={{ fontSize: 24 }}
                />
              </div>
            </div>
          )
        },
      },
    ]

    return columns
  }

  return (
    <MyTable
      className='!w-full'
      columns={getColumns()}
      loading={isLoading}
      data={data?.data || []}
      limit={PAGE_SIZE_LIMIT}
      total={20}
      extra={<Button onClick={() => handleConfig(null)}>{translate('common.addNew')}</Button>}
    />
  )
}

export default FanPageScreen
