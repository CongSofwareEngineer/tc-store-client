'use client'
import { Affix } from 'antd'
import React from 'react'
import PrimaryButton from '../PrimaryButton'
import { images } from '@/configs/images'
import MyImage from '../MyImage'
import Nav from './Component/Nav'
import useModal from '@/hook/useModal'

const Header = () => {
  const { openModal } = useModal()

  const handleLogin = () => {}
  return (
    <Affix className="w-full h-14 ">
      <div className="border-b-4 border-indigo-500  w-full flex m-auto justify-center items-center bg-white">
        <div className="md:px-12 px-5 h-14 w-full max-w-[1350px] flex md:gap-3 justify-between items-center">
          <div className="h-full relative ">
            <MyImage src={images.logo} alt="logo" fill className="relative" />
          </div>
          <Nav />
          <div className="h-full fex gap-2 items-center">
            <PrimaryButton className="h-full w-24">Login</PrimaryButton>
          </div>
        </div>
      </div>
    </Affix>
  )
}

export default Header
