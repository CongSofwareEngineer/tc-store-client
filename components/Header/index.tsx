'use client'
import { Affix } from 'antd'
import React from 'react'
import { images } from '@/configs/images'
import MyImage from '../MyImage'
import Nav from './Component/Nav'
import Account from './Component/Account'

const Header = () => {
  return (
    <header>
      <Affix className="w-full h-14 ">
        <div className="border-b-2 border-green-300 w-full flex m-auto justify-center items-center bg-white">
          <div className="md:px-12 px-5 h-14 w-full max-w-[1350px] flex md:gap-3 justify-between items-center">
            <div className="h-full relative ">
              <MyImage
                src={images.logo}
                alt="logo"
                fill
                widthImage={'auto'}
                heightImage="100%"
              />
            </div>
            <Nav />
            <Account />
          </div>
        </div>
      </Affix>
    </header>
  )
}

export default Header
