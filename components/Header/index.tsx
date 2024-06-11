'use client'
import { Affix } from 'antd'
import React from 'react'
import { images } from '@/configs/images'
import MyImage from '../MyImage'
import Nav from './Component/Nav'
import useModal from '@/hook/useModal'
import useLanguage from '@/hook/useLanguage'
import ModalLogin from './Component/ModalLogin'
import useUserData from '@/hook/useUserData'

const Header = () => {
  const { openModal } = useModal()
  const { translate } = useLanguage()
  const { isLogin, logOut } = useUserData()

  const handleLogin = () => {
    if (isLogin) {
      logOut()
    } else {
      openModal({
        content: <ModalLogin />,
        showHeader: true,
      })
    }
  }
  return (
    <header>
      <Affix className="w-full h-14 ">
        <div className="border-b-4 border-indigo-500  w-full flex m-auto justify-center items-center bg-white">
          <div className="md:px-12 px-5 h-14 w-full max-w-[1350px] flex md:gap-3 justify-between items-center">
            <div className="h-full relative ">
              <MyImage src={images.logo} alt="logo" fill className="relative" />
            </div>
            <Nav />
            <div className="h-full fex gap-2 items-center">
              <div
                onClick={handleLogin}
                className="rounded h-full cursor-pointer w-24 bg-green-500 flex justify-center items-center"
              >
                <span className="text-black hover:underline">
                  {isLogin
                    ? translate('common.logOut')
                    : translate('common.login')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Affix>
    </header>
  )
}

export default Header
