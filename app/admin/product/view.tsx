'use client'
import ImageAdmin from '@/components/ImageAdmin'
import MyTable from '@/components/MyTable'
import TextCopy from '@/components/TextCopy'
import { PAGE_SIZE_LIMIT, REQUEST_TYPE } from '@/constant/app'
import useAllProduct from '@/hook/tank-query/useAllProduct'
import useMedia from '@/hook/useMedia'
import useQuerySearch from '@/hook/useQuerySearch'
import useSearchBaseAdmin from '@/hook/useSearchBaseAdmin'
import { delayTime, detectImg, numberWithCommas } from '@/utils/functions'
import { Button } from 'antd'
import React, { useState } from 'react'
import ProductConfig from './Component/ModalConfig'
import useLanguage from '@/hook/useLanguage'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import useMyDrawer from '@/hook/useMyDrawer'
import fetchConfig from '@/configs/fetchConfig'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import { QUERY_KEY } from '@/constant/reactQuery'
import ModalDelete from '@/components/ModalDelete'
const ViewCreate = dynamic(() => import('./Component/ViewCreate'), {
  // Make sure we turn SSR off
  ssr: false,
})
const ProductAdminScreen = () => {
  const { renderContent } = useSearchBaseAdmin()
  const { queries } = useQuerySearch()
  const { data, isLoading, hasNextPage, isFetchingNextPage, loadMore } =
    useAllProduct(PAGE_SIZE_LIMIT, queries)
  const { isMobile } = useMedia()
  const { openModalDrawer, closeModalDrawer } = useMyDrawer()
  const { translate } = useLanguage()
  const { refreshQuery } = useRefreshQuery()

  const [productSelected, setProductSelected] = useState<any>(null)
  console.log('====================================')
  console.log({ productSelected })
  console.log('====================================')
  const handleUpdate = (item: any) => {
    setProductSelected(item)
    openModalDrawer({
      content: <ProductConfig item={item} />,
      useDrawer: true,
      title: (
        <div className="text-medium font-bold">
          {item ? `Update ${item.name}` : 'Create'}
        </div>
      ),
      configModal: {
        className: 'w-[700px]',
        width: '700px',
      },
    })
  }

  const handleDelete = (id: string) => {
    console.log({ id })

    const callBack = async () => {
      await fetchConfig({
        url: `product/delete/${id}`,
        method: REQUEST_TYPE.DELETE,
      })
      await delayTime(500)
      refreshQuery(QUERY_KEY.GetAllProduct)
      closeModalDrawer()
    }
    openModalDrawer({
      content: <ModalDelete callback={callBack} />,
    })
  }

  const renderItem = (name: string, value: any) => {
    return (
      <div className="flex gap-2 w-full items-center">
        <span className="font-bold text-blue-900 text-nowrap">{`${name} :`}</span>
        <span>{value}</span>
      </div>
    )
  }

  const renderTable = () => {
    const columns = [
      {
        title: '_id',
        key: '_id',
        dataIndex: '_id',
        render: (_: any, record: any) => {
          return (
            <div className="flex flex-col gap-2">
              {isMobile && (
                <div className="aspect-square md:w-[200px] w-[100px] overflow-hidden m-auto">
                  <ImageAdmin src={detectImg(record.imageMain)} />
                </div>
              )}

              {isMobile && (
                <Link
                  className="text-medium font-bold"
                  href={`/shop/${record.keyName}`}
                >
                  <p className="text-medium font-bold">{record.name}</p>
                </Link>
              )}
              <div className="flex gap-4 w-full">
                {!isMobile && (
                  <div className="aspect-square md:w-[200px] w-[100px] overflow-hidden m-auto">
                    <ImageAdmin src={detectImg(record.imageMain)} />
                  </div>
                )}
                <div className="flex flex-1 flex-col">
                  {!isMobile && (
                    <Link
                      className="text-medium font-bold"
                      href={`/shop/${record.keyName}`}
                    >
                      <p className="text-medium font-bold">{record.name}</p>
                    </Link>
                  )}
                  {renderItem(
                    translate('menuProduct.category'),
                    <TextCopy value={record.category} />
                  )}
                  {renderItem(
                    translate('productDetail.price'),
                    numberWithCommas(record.price)
                  )}
                  {renderItem(
                    translate('textPopular.cost'),
                    numberWithCommas(record.cost)
                  )}
                  {renderItem(
                    translate('textPopular.amount'),
                    numberWithCommas(record.amount)
                  )}
                  {renderItem(
                    translate('productDetail.sold'),
                    numberWithCommas(record.sold)
                  )}
                </div>
                {!isMobile && (
                  <div className="md:w-[100px] w-full flex flex-col justify-center items-center gap-4">
                    <Button
                      onClick={() => handleUpdate(record)}
                      className="w-full"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => handleDelete(record._id)}
                      className="w-full"
                      type="primary"
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
              {isMobile && (
                <div className="w-full flex  justify-center items-center gap-4">
                  <Button
                    onClick={() => handleUpdate(record)}
                    className="w-full"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => handleDelete(record._id)}
                    className="w-full"
                    type="primary"
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          )
        },
      },
    ]

    return (
      <MyTable
        loadMore={loadMore}
        hasMoreData={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        columns={columns}
        loading={isLoading}
        data={data || []}
        limit={PAGE_SIZE_LIMIT}
        total={20}
        extra={<Button onClick={() => handleUpdate(null)}>Add new</Button>}
      />
    )
  }

  return (
    <div className="flex flex-col w-full gap-3">
      <ViewCreate />
      {renderContent()}
      {renderTable()}
    </div>
  )
}

export default ProductAdminScreen
