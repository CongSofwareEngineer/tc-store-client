import React, { useEffect } from 'react'
import { ListProductType } from './type'
import ItemProduct from '@/components/ItemProduct'
import useLanguage from '@/hook/useLanguage'
import Link from 'next/link'
import { FilterAPI, TYPE_LOADING_GET_DATA } from '@/constant/app'
import {
  AlignLeftOutlined,
  CaretRightOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { CollapseCustom } from './styled'
import useProductByLimit from '@/hook/tank-query/useProductByLimit'
import { scrollTop } from '@/utils/functions'
import LoadingGetData from '@/components/LoadingGetData'

const ListProduct = ({ title, type = 'all' }: ListProductType) => {
  const { data, isLoading } = useProductByLimit(type, 5)
  const { translate } = useLanguage()

  useEffect(() => {
    scrollTop()
  }, [])

  const renderListItem = () => {
    return (
      <div className="flex gap-3 md:gap-5">
        <LoadingGetData
          loading={isLoading}
          type={TYPE_LOADING_GET_DATA.ListProductInHome}
        />

        {Array.isArray(data?.data) &&
          data?.data?.map((item) => {
            return (
              <ItemProduct
                showFeedback
                showSold
                key={item.id}
                item={item}
                href={`/shop/${item.keyName}`}
                className={'w-[180px] md:w-[230px] h-[310px] md:h-[350px]'}
              />
            )
          })}

        {Array.isArray(data?.data) && data?.data?.length === 0 && (
          <div>{translate('warning.noData')}</div>
        )}
      </div>
    )
  }

  const items = [
    {
      key: type,
      expandIcon: <AlignLeftOutlined style={{ fontSize: 20 }} />,
      label: (
        <div className="flex justify-between items-center">
          <div className="flex text-medium w-full ">{title}</div>
        </div>
      ),
      children: renderListItem(),
      extra: (
        <Link
          href={`shop?${FilterAPI.Category}=${type || 'all'}`}
          className="text-medium cursor-pointer hover:font-semibold hover:text-green-600"
        >
          {translate('textPopular.viewMore')}
          <RightOutlined className="text-sm ml-2" />
        </Link>
      ),
    },
  ]

  return (
    <CollapseCustom
      expandIcon={({ isActive }: any) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      defaultActiveKey={[type]}
      items={items}
      style={{ background: 'transparent' }}
    />
  )
}

export default ListProduct
