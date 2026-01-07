import { OBSERVER_KEY } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'
import useUserData from '@/hooks/useUserData'
import ObserverService from '@/services/observer'
import { TbCashRegister } from 'react-icons/tb'
import { IoIosLogIn } from 'react-icons/io'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiOutlineContacts, AiOutlineHome, AiOutlineInfo, AiOutlineShop, AiOutlineUser } from 'react-icons/ai'
import styled from 'styled-components'
const LinkCustom = styled(styled(Link)<{ $isSelected?: boolean }>``).attrs({
  className: 'hover:underline hover:text-blue-700',
})`
  color: ${(props) => (props.$isSelected ? 'blue !important' : 'black')};
  font-weight: ${(props) => (props.$isSelected ? '700 !important' : 'nonce')};
`

const LinkRoute = ({ text, icon, path }: { text?: string; icon?: React.ReactNode; path: string }) => {
  const pathname = usePathname()
  const { closeModalDrawer } = useModalDrawer()

  const checkSelected = () => {
    if (pathname === '/' || pathname === '') {
      return pathname === path
    }
    if (path === '/') {
      return false
    }

    return pathname.includes(path)
  }

  return (
    <LinkCustom $isSelected={checkSelected()} href={path} onClick={closeModalDrawer}>
      <span className='flex gap-2 items-center'>
        {icon && <span className='text-green-500 text-base'>{icon}</span>}

        <span>{text}</span>
      </span>
    </LinkCustom>
  )
}
const NavMobile = () => {
  const { isLogin } = useUserData()
  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()

  const handleLogOut = () => {
    ObserverService.emit(OBSERVER_KEY.LogOut, false)
    closeModalDrawer()
  }

  return (
    <div className='flex flex-1  flex-col gap-3 mt-3'>
      {isLogin && <LinkRoute icon={<AiOutlineUser />} path='/my-page' text={translate('myProfile.myProfile')} />}
      <LinkRoute icon={<AiOutlineHome />} path='/' text={translate('header.home')} />

      <LinkRoute icon={<AiOutlineShop />} path='/shop' text={translate('header.shop')} />

      {/* <LinkRoute path='/nests' icon={<ShopOutlined />} text={translate('textPopular.nest')} /> */}

      <LinkRoute icon={<AiOutlineShop />} path='/shoes' text={translate('textPopular.shoes')} />

      <LinkRoute icon={<AiOutlineContacts />} path='/contact' text={translate('header.contact')} />
      <LinkRoute icon={<AiOutlineInfo />} path='/about' text={translate('header.about')} />

      {!isLogin && <LinkRoute icon={<TbCashRegister />} path='/register' text={translate('header.register')} />}
      {isLogin && (
        <div className='flex gap-2 items-center' onClick={handleLogOut}>
          <span className='text-green-500 text-base'>
            <IoIosLogIn />
          </span>
          <span className='cursor-pointer hover:underline'>{translate('common.logOut')}</span>
        </div>
      )}
      {/* 
      {!!userData?.isAdmin && (
        <LinkCustom $isSelected={pathname.includes('/admin')} href={'/admin'}>
          Admin
        </LinkCustom>
      )} */}
    </div>
  )
}

export default NavMobile
