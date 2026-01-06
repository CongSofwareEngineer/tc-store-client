'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { images } from '@/configs/images'
const Nav = dynamic(() => import('./components/Nav'))
const Account = dynamic(() => import('./components/Account'))
// import Nav from './components/Nav'
// import Account from './components/Account'

const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header>
      <div className='w-full h-14 ' />
      <div className='w-full h-14 fixed z-10 inset-0 '>
        <div className='border-b-2 border-green-300 w-full flex m-auto justify-center items-center bg-white'>
          <div className='md:px-12 px-5 h-14 w-full max-w-[1350px] flex md:gap-3 justify-between items-center' id='id-container-header'>
            <div className='h-full relative '>
              <Link href={'/'}>
                <Image fill alt='logo-tcstore' className='!relative !w-auto !h-full' src={images.logo} />
              </Link>
            </div>

            <Nav />
            <Account />
          </div>
        </div>
      </div>
      {children}
    </header>
  )
}

export default Header
