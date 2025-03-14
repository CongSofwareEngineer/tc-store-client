'use client'
import React from 'react'
import useAos from '@/hooks/useAos'

import useFirstLoadPage from '@/hooks/useFirstLoadPage'
import MenuCategory from './Components/MenuCategory'
import InputSearch from '@/components/InputSearch'
import Content from './Components/Content'

const ShopScreen = () => {
  useAos()
  useFirstLoadPage()
  return (
    <div className='w-full flex md:flex-row flex-col  md:gap-6 gap-3  h-full justify-star md:mt-3'>
      <div className='md:w-[250px] w-full' data-aos='fade-right'>
        <MenuCategory />
      </div>
      <div className='flex-1 w-full  h-full' data-aos='fade-left'>
        <Content />
      </div>
    </div>
  )
}

export default ShopScreen
