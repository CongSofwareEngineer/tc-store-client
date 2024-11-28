'use client'
import MyTable from '@/components/MyTable'
import { PAGE_SIZE_LIMIT } from '@/constant/app'
import useSubCategories from '@/hook/tank-query/Admin/useSubCategories'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import useQuerySearch from '@/hook/useQuerySearch'
import useSearchBaseAdmin from '@/hook/useSearchBaseAdmin'
import { Button } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import SubCategoriesConfig from './modalConfig'

const SubCategoriesScreen = () => {
  const { renderContent } = useSearchBaseAdmin({
    category: false,
    admin: false,
    dateEnd: false,
    dateStart: false,
    oneDate: false,
    status: false,
    sdt: false,
  })

  const { queries } = useQuerySearch()
  const { isMobile } = useMedia()
  const { translate, lang } = useLanguage()
  const { openModalDrawer } = useModalDrawer()
  const { data, isLoading } = useSubCategories(queries)

  const getColumn = () => {
    if (isMobile) {
      const column: ColumnsType = [
        {
          title: 'Info',
          key: 'isShow',
          dataIndex: 'isShow',
          filters: [
            {
              text: translate('textPopular.showScreen'),
              value: true,
            },
          ],
          onFilter: (value, record) => record.isShow === value,
          render: (_: any, record: any) => {
            return <div className="flex flex-col gap-2">{_}</div>
          },
        },
      ]
      return column
    }

    const column: ColumnsType = [
      {
        title: 'Info',
        key: 'isShow',
        dataIndex: 'isShow',
        filters: [
          {
            text: translate('textPopular.showScreen'),
            value: true,
          },
        ],
        onFilter: (value, record) => record.isShow === value,
        render: (_: any, record: any) => {
          return <div className="flex flex-col gap-2">{_}</div>
        },
      },
    ]
    return column
  }

  const getName = (type: Record<string, string>) => {
    try {
      return type[lang]
    } catch (error) {
      return lang
    }
  }

  const handleUpdate = (item?: any) => {
    openModalDrawer({
      content: <SubCategoriesConfig item={item} />,
      title: item ? `Update ${getName(item.lang)}` : 'Create',
    })
  }

  return (
    <div className="flex flex-col w-full h-full gap-2">
      {renderContent()}
      <MyTable
        columns={getColumn()}
        loading={isLoading}
        data={data?.data || []}
        limit={PAGE_SIZE_LIMIT}
        total={20}
        extra={
          <Button onClick={() => handleUpdate()}>
            {translate('common.addNew')}
          </Button>
        }
      />
    </div>
  )
}

export default SubCategoriesScreen
