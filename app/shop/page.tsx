'use client'
import React from 'react'
import MenuCategory from './Component/MenuCategory'
import useAllProduct from '@/hook/tank-query/useAllProduct'
import MyLoading from '@/components/MyLoading'
import ItemProduct from '@/components/ItemProduct'
import useQuerySearch from '@/hook/useQuerySearch'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import useLanguage from '@/hook/useLanguage'

const ShopScreen = () => {
  const { currentQueries } = useQuerySearch()
  const { data, isLoading } = useAllProduct(currentQueries)
  const { translate } = useLanguage()

  return (
    <div className="w-full flex md:flex-row flex-col  md:gap-6 gap-3  h-full justify-star md:mt-3">
      <div className="md:w-[250px] w-full">
        <MenuCategory />
      </div>
      <div className="flex-1 w-full  h-full">
        <Input
          className="w-full"
          suffix={
            <SearchOutlined
              className="cursor-pointer hover:scale-105"
              placeholder={translate('textPopular.searchNameProduct')}
            />
          }
        />
        {data?.data && (
          <div className="mt-2  w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3   2xl:grid-cols-4 gap-3 md:gap-6">
            {data?.data?.map((item: any) => {
              return (
                <ItemProduct
                  // className={'h-[305px] md:h-auto'}
                  showFeedback
                  showSold
                  key={item.id}
                  item={item}
                  href={`/shop/${item.id}/${item.keyName}`}
                />
              )
            })}
          </div>
        )}

        {data?.data.length === 0 && (
          <div className="mt-3">Chưa có sản phẩm</div>
        )}

        {isLoading && <MyLoading className="mt-6" />}
      </div>
    </div>
  )
}

export default ShopScreen
