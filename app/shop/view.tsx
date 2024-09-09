'use client'
import React from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import useLanguage from '@/hook/useLanguage'
import useAos from '@/hook/useAos'
import dynamic from 'next/dynamic'
const Content = dynamic(() => import('./Component/Content'), { ssr: false })
const MenuCategory = dynamic(() => import('./Component/MenuCategory'), {
  ssr: false,
})

const ShopScreen = () => {
  useAos(1000)
  const { translate } = useLanguage()

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
        <Content />
      </div>
    </div>
  )
}

export default ShopScreen
