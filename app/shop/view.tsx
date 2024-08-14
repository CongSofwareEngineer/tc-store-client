'use client'
import React from 'react'
import MenuCategory from './Component/MenuCategory'
import ItemProduct from '@/components/ItemProduct'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import useLanguage from '@/hook/useLanguage'
import useQuerySearch from '@/hook/useQuerySearch'
import useAllProduct from '@/hook/tank-query/useAllProduct'
import { PAGE_SIZE_LIMIT, TYPE_LOADING_GET_DATA } from '@/constant/app'
import useAos from '@/hook/useAos'
import MyLoadMore from '@/components/MyLoadMore'
import LoadingGetData from '@/components/LoadingGetData'

const ShopScreen = () => {
  useAos()
  const { translate } = useLanguage()
  const { queries } = useQuerySearch()
  const { data, isLoading, loadMore, hasNextPage, isFetchingNextPage } =
    useAllProduct(PAGE_SIZE_LIMIT, queries)

  return (
    <div className="w-full flex md:flex-row flex-col  md:gap-6 gap-3  h-full justify-star md:mt-3">
      <h1 className="absolute opacity-0">
        Shop tc store - Uy tín nhất Gia Lai
      </h1>
      <h2 className="absolute opacity-0">
        Shop với rất nhiều sản phẩm chất lượng và uy tí<nav></nav>
      </h2>
      <div className="md:w-[250px] w-full" data-aos="fade-right">
        <MenuCategory />
      </div>
      <div className="flex-1 w-full  h-full" data-aos="fade-left">
        <Input
          className="w-full"
          suffix={
            <SearchOutlined
              className="cursor-pointer hover:scale-105"
              placeholder={translate('textPopular.searchNameProduct')}
            />
          }
        />
        {data.length > 0 && (
          <div className="mt-2  w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3   2xl:grid-cols-4 gap-3 md:gap-6">
            {data.map((item: any) => {
              return (
                <ItemProduct
                  showFeedback
                  showSold
                  key={item.id}
                  item={item}
                  href={`/shop/${item.keyName}`}
                />
              )
            })}
          </div>
        )}

        {data.length === 0 && !isLoading && (
          <div className="mt-3">Chưa có sản phẩm</div>
        )}

        {isLoading && (
          <LoadingGetData
            loading={isLoading}
            type={TYPE_LOADING_GET_DATA.Shop}
          />
        )}
        <MyLoadMore
          callback={loadMore}
          hasLoadMore={hasNextPage}
          loading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  )
}

export default ShopScreen
