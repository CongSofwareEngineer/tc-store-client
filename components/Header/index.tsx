'use client'
import { Affix } from 'antd'
import React from 'react'
import { images } from '@/configs/images'
import MyImage from '../MyImage'
// import Nav from './Component/Nav'
// import Account from './Component/Account'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const Nav = dynamic(() => import('./Component/Nav'), { ssr: true })
const Account = dynamic(() => import('./Component/Account'), { ssr: true })

const Header = () => {
  return (
    <header>
      <a
        href="mailto:hodiencong2000.@gmail.com"
        className="absolute z-[-1] opacity-0"
      />
      <a href="tel:0932225405" className="absolute z-[-1] opacity-0" />
      <Affix className="w-full h-14 ">
        <div className="border-b-2 border-green-300 w-full flex m-auto justify-center items-center bg-white">
          <div className="md:px-12 px-5 h-14 w-full max-w-[1350px] flex md:gap-3 justify-between items-center">
            <div className="h-full relative ">
              <Link href={'/'}>
                <MyImage
                  src={images.logo}
                  alt="logo-tcstore"
                  fill
                  widthImage={'auto'}
                  heightImage="1pCl00%"
                />
              </Link>
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
