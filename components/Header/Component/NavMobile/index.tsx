import { OBSERVER_KEY } from '@/constant/app'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import useUserData from '@/hook/useUserData'
import ObserverService from '@/services/observer'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import styled from 'styled-components'
const LinkCustom = styled(styled(Link)<{ $isSelected?: Boolean }>``).attrs({
  className: 'hover:underline hover:text-blue-700',
})`
  color: ${(props) => (props.$isSelected ? 'blue !important' : 'black')};
  font-weight: ${(props) => (props.$isSelected ? '700 !important' : 'nonce')};
`

const NavMobile = () => {
  const { isLogin, userData } = useUserData()
  const { translate } = useLanguage()
  const pathname = usePathname()
  const { closeModalDrawer } = useModalDrawer()

  const handleLogOut = () => {
    ObserverService.emit(OBSERVER_KEY.LogOut)
    closeModalDrawer()
  }
  return (
    <div className="flex flex-1  flex-col gap-3 ml-2">
      <LinkCustom
        onClick={closeModalDrawer}
        $isSelected={pathname === '/' || pathname === ''}
        href={'/'}
      >
        {translate('header.home')}
      </LinkCustom>
      <LinkCustom
        onClick={closeModalDrawer}
        $isSelected={pathname === '/shop'}
        href={'/shop'}
      >
        {translate('header.shop')}
      </LinkCustom>

      <LinkCustom
        onClick={closeModalDrawer}
        $isSelected={pathname === '/nests'}
        href={'/nests'}
      >
        {translate('textPopular.nest')}
      </LinkCustom>
      <LinkCustom
        onClick={closeModalDrawer}
        $isSelected={pathname === '/shoes'}
        href={'/shoes'}
      >
        {translate('textPopular.shoes')}
      </LinkCustom>
      <LinkCustom
        onClick={closeModalDrawer}
        $isSelected={pathname === '/contact'}
        href={'/contact'}
      >
        {translate('header.contact')}
      </LinkCustom>
      {isLogin ? (
        <LinkCustom
          onClick={closeModalDrawer}
          $isSelected={pathname === '/my-cart'}
          href={'/my-cart'}
        >
          {translate('header.cart')}
        </LinkCustom>
      ) : (
        <LinkCustom
          onClick={closeModalDrawer}
          $isSelected={pathname === '/register'}
          href={'/register'}
        >
          {translate('header.register')}
        </LinkCustom>
      )}

      {isLogin && (
        <LinkCustom
          onClick={closeModalDrawer}
          $isSelected={pathname.includes('/my-page')}
          href={'/my-page'}
        >
          {translate('myProfile.myProfile')}
        </LinkCustom>
      )}
      {isLogin && (
        <div onClick={handleLogOut}>{translate('common.logOut')}</div>
      )}

      {!!userData?.isAdmin && (
        <LinkCustom $isSelected={pathname.includes('/admin')} href={'/admin'}>
          Admin
        </LinkCustom>
      )}
    </div>
  )
}

export default NavMobile
