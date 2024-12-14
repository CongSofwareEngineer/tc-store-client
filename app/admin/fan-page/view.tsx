'use client'
import ModalDelete from '@/components/ModalDelete'
import MyTable from '@/components/MyTable'
import TextCopy from '@/components/TextCopy'
import { PAGE_SIZE_LIMIT } from '@/constant/app'
import { QUERY_KEY } from '@/constant/reactQuery'
import useFanPage from '@/hook/tank-query/Admin/useFanPage'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import ServerApi from '@/services/serverApi'
import { ellipsisText } from '@/utils/functions'
import { formatDateTime } from '@/utils/momentFunc'
import { showNotificationSuccess } from '@/utils/notification'
import { Button } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import ModalConfig from './modalConfig'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const FanPageScreen = () => {
  const { data, isLoading } = useFanPage()
  const { refreshQuery } = useRefreshQuery()
  const { translate } = useLanguage()
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

      const res = await ServerApi.deleteFanPage({
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
        },
      ]

      return columns
    }

    const columns: ColumnsType = [
      {
        key: '_id',
        dataIndex: '_id',
        title: 'ID',
        render: (id: any) => {
          return <TextCopy value={id} textView={ellipsisText(id, 3, 4)} />
        },
      },
      {
        key: 'date',
        dataIndex: 'date',
        title: translate('textPopular.date'),
        render: (date: any) => {
          return <div className='whitespace-nowrap'>{formatDateTime(parseInt(date))}</div>
        },
      },

      {
        key: 'source',
        dataIndex: 'source',
        title: translate('textPopular.source'),
        render: (source: any) => {
          return <div>{source}</div>
        },
      },
      {
        key: 'source',
        dataIndex: 'source',
        title: translate('textPopular.source'),
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
