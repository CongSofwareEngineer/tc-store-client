'use client'
import ImageAdmin from '@/components/ImageAdmin'
import MyTable, { ColumnsType } from '@/components/MyTable'
import TextCopy from '@/components/TextCopy'
import TextWithToggle from '@/components/TextWithToggle'
import { TYPE_PRODUCT } from '@/constant/admin'
import { PAGE_SIZE_LIMIT } from '@/constant/app'
import useCommentAdmin from '@/hook/tank-query/Admin/useCommentAdmin'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import useQuerySearch from '@/hook/useQuerySearch'
import useSearchBaseAdmin from '@/hook/useSearchBaseAdmin'
import { ellipsisText } from '@/utils/functions'
import { formatDateTime } from '@/utils/momentFunc'
import { CommentOutlined } from '@ant-design/icons'
import { Button, Rate } from 'antd'
import Link from 'next/link'

import React from 'react'
import ModalReplay from './Component/ModalReplay'

const CommentClient = () => {
  const { isMobile } = useMedia()
  const { translate } = useLanguage()
  const { queries } = useQuerySearch()
  const { openModalDrawer } = useModalDrawer()
  const { data, isLoading } = useCommentAdmin(queries)
  const { renderContent } = useSearchBaseAdmin(
    {
      dateEnd: true,
      dateStart: true,
      idProduct: true,
      sdt: true,
    },
    {
      idProduct: `ID ${translate('textPopular.product')}`,
    },
  )

  const getRouteProduct = (product: any) => {
    if (product?.category === TYPE_PRODUCT.shoes) {
      return `/shoes/${product.keyName}`
    }
    return `/shop/${product?.keyName}`
  }

  const handleReply = (item: any) => {
    openModalDrawer({
      content: <ModalReplay />,
      useDrawer: true,
      configDrawer: {
        // height:
      },
    })
  }
  const getColumns = () => {
    if (isMobile) {
      const column: ColumnsType[] = [
        {
          key: translate('textPopular.infor'),
          dataIndex: 'date',
          title: translate('textPopular.date'),
          render: (_: string, record: any) => {
            return (
              <div className='flex flex-col gap-2 w-full'>
                <div className='flex w-full justify-between text-xs'>
                  <div className='flex gap-2'>
                    <span className='font-bold'>{'SDT'}:</span>
                    <TextCopy textView={ellipsisText(record?.sdt, 4, 3)} value={record?.sdt} classText='text-xs' />
                  </div>
                  <span>{formatDateTime(record?.date)}</span>
                </div>
                <Rate style={{ fontSize: 12 }} value={record?.rate} className='text-xs' />

                <div className='flex gap-2'>
                  <span className='font-bold'>{translate('header.name')}:</span>
                  <span>{record?.name}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='font-bold'>{translate('textPopular.product')}:</span>
                  {record?.product ? (
                    <Link href={getRouteProduct(record?.product)}>{record?.product?.name || ''}</Link>
                  ) : (
                    <span>{''}</span>
                  )}
                </div>
                <div className='font-bold'>{translate('textPopular.comment')}</div>
                <TextWithToggle text={record?.note} />
                {record?.listImg?.length > 0 && (
                  <>
                    <div className='font-bold'>{translate('textPopular.image')}</div>
                    <div className='flex gap-2'>
                      {record?.listImg?.map((src: string) => {
                        return (
                          <div key={src} className='w-[80px]'>
                            <ImageAdmin src={src} />
                          </div>
                        )
                      })}
                    </div>
                  </>
                )}

                <Button onClick={() => handleReply(record)}>{translate('common.reply')}</Button>
              </div>
            )
          },
        },
      ]

      return column
    }

    const column: ColumnsType[] = [
      {
        key: 'date',
        dataIndex: 'date',
        title: translate('textPopular.date'),
        render: (date: string) => {
          return <div className='whitespace-nowrap'> {formatDateTime(date)}</div>
        },
      },
      {
        key: 'rate',
        dataIndex: 'rate',
        title: translate('textPopular.rate'),
        render: (rate: string) => {
          return <div className='w-full text-center whitespace-nowrap'> {`${rate} (⭐)`}</div>
        },
      },
      {
        title: `SDT`,
        key: 'sdt',
        dataIndex: 'sdt',
        render: (sdt: string) => {
          return <TextCopy classText='whitespace-nowrap' textView={ellipsisText(sdt, 3, 4)} value={sdt} />
        },
      },
      {
        title: translate('header.name'),
        key: 'name',
        dataIndex: 'name',
        render: (name: string) => {
          return <span>{name}</span>
        },
      },
      {
        title: `ID ${translate('textPopular.product')}`,
        key: 'idProduct',
        dataIndex: 'idProduct',
        render: (idProduct: string) => {
          return <TextCopy classText='whitespace-nowrap' textView={ellipsisText(idProduct, 3, 4)} value={idProduct} />
        },
      },

      {
        title: translate('textPopular.nameProduct'),
        key: 'note',
        dataIndex: 'note',
        render: (note: any, record: any) => {
          if (record?.product) {
            return (
              <Link className='hover:underline hover:!text-blue-600' href={getRouteProduct(record?.product)}>
                {record?.product?.name}
              </Link>
            )
          }

          return <span>{''}</span>
        },
      },
      {
        title: translate('textPopular.comment'),
        key: 'note',
        dataIndex: 'note',
        render: (note: string) => {
          return (
            <div className='min-w-[250px]'>
              <TextWithToggle text={note} />
            </div>
          )
        },
      },
      {
        title: translate('textPopular.image'),
        key: 'listImg',
        dataIndex: 'listImg',
        render: (listImg: string[]) => {
          return (
            <div className='flex flex-nowrap gap-3'>
              {listImg.map((src) => {
                return (
                  <div key={src} className='w-[100px]'>
                    <ImageAdmin src={src} />
                  </div>
                )
              })}
            </div>
          )
        },
      },
      {
        title: '.',
        key: 'listImg',
        dataIndex: 'listImg',
        render: (_: string[], record: any) => {
          return (
            <CommentOutlined onClick={() => handleReply(record)} className='text-2xl cursor-pointer hover:scale-110' />
          )
        },
      },
    ]

    return column
  }
  return (
    <div className='flex flex-col gap-2 w-full'>
      {renderContent()}
      <MyTable columns={getColumns()} loading={isLoading} data={data || []} limit={PAGE_SIZE_LIMIT} total={20} />
    </div>
  )
}

export default CommentClient
