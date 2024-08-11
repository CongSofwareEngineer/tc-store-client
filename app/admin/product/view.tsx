'use client'
import ImageAdmin from '@/components/ImageAdmin'
import MyTable from '@/components/MyTable'
import TextCopy from '@/components/TextCopy'
import { PAGE_SIZE_LIMIT } from '@/constant/app'
import useAllProduct from '@/hook/tank-query/useAllProduct'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import useQuerySearch from '@/hook/useQuerySearch'
import useSearchBaseAdmin from '@/hook/useSearchBaseAdmin'
import { detectImg, numberWithCommas } from '@/utils/functions'
import { Button } from 'antd'
import React from 'react'
import ProductConfig from './Component/ModalConfig'

const ProductAdminScreen = () => {
  const { renderContent } = useSearchBaseAdmin()
  const { queries } = useQuerySearch()
  const { data, isLoading } = useAllProduct(PAGE_SIZE_LIMIT, queries)
  const { isMobile } = useMedia()
  const { openModalDrawer } = useModalDrawer()

  const handleUpdate = (item: any) => {
    openModalDrawer({
      content: <ProductConfig item={item} />,
      useDrawer: true,
      title: (
        <div className="text-medium font-bold">
          {item ? `Update ${item.name}` : 'Create'}
        </div>
      ),
      configModal: {
        width: '700px',
      },
      configDrawer: {
        height: 'max-content',
        placement: 'bottom',
      },
    })
  }

  const renderItem = (name: string, value: any) => {
    return (
      <div className="flex gap-2 w-full items-center">
        <span className="font-bold text-blue-900">{`${name} :`}</span>
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
            <div className="flex gap-4 w-full">
              <div className="aspect-square md:w-[200px] w-[150px] overflow-hidden">
                <ImageAdmin src={detectImg(record.imageMain)} />
              </div>
              <div className="flex flex-1 flex-col">
                <p className="text-medium font-bold">{record.name}</p>
                {renderItem('id', <TextCopy value={record._id} />)}
                {renderItem('category', <TextCopy value={record._category} />)}
                {renderItem('Price', numberWithCommas(record.price))}
                {renderItem('Cost', numberWithCommas(record.cost))}
                {renderItem('amount', numberWithCommas(record.amount))}
                {renderItem('sold', numberWithCommas(record.sold))}
                {!isMobile && <>{renderItem('keyName', record.keyName)}</>}
              </div>
              {!isMobile && (
                <div className="w-[100px] flex flex-col justify-center items-center gap-4">
                  <Button
                    onClick={() => handleUpdate(record)}
                    className="w-full"
                  >
                    Update
                  </Button>
                  <Button className="w-full" type="primary">
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
      {renderContent()}
      {renderTable()}
    </div>
  )
}

export default ProductAdminScreen
