import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import useUserData from '@/hook/useUserData'
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
  const { isLogin, logOut } = useUserData()
  const { translate } = useLanguage()
  const pathname = usePathname()
  const { closeModalDrawer } = useModalDrawer()

  const handleLogOut = () => {
    logOut()
    closeModalDrawer()
  }
  return (
    <div className="flex flex-1  flex-col gap-3 ml-2">
      {isLogin && (
        <LinkCustom
          onClick={closeModalDrawer}
          $isSelected={pathname === '/my-page'}
          href={'/my-page'}
        >
          {translate('myProfile.myProfile')}
        </LinkCustom>
      )}

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
        $isSelected={pathname === '/contact'}
        href={'/contact'}
      >
        {translate('header.contact')}
      </LinkCustom>
      {isLogin ? (
        <LinkCustom
          onClick={closeModalDrawer}
          $isSelected={pathname === '/cart'}
          href={'/cart'}
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
        <div onClick={handleLogOut}>{translate('common.logOut')}</div>
      )}
    </div>
  )
}

export default NavMobile
