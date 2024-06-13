import useDrawer from '@/hook/useDrawer'
import useLanguage from '@/hook/useLanguage'
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
  const { closeDrawer } = useDrawer()

  const handleLogOut = () => {
    logOut()
    closeDrawer()
  }
  return (
    <div className="flex flex-1  flex-col gap-5 ml-2">
      <LinkCustom
        onClick={closeDrawer}
        $isSelected={pathname === '/' || pathname === ''}
        href={'/'}
      >
        {translate('header.home')}
      </LinkCustom>
      <LinkCustom
        onClick={closeDrawer}
        $isSelected={pathname === '/shop'}
        href={'/shop'}
      >
        {translate('header.shop')}
      </LinkCustom>
      <LinkCustom
        onClick={closeDrawer}
        $isSelected={pathname === '/contact'}
        href={'/contact'}
      >
        {translate('header.contact')}
      </LinkCustom>
      {isLogin ? (
        <LinkCustom
          onClick={closeDrawer}
          $isSelected={pathname === '/cart'}
          href={'/cart'}
        >
          {translate('header.cart')}
        </LinkCustom>
      ) : (
        <LinkCustom
          onClick={closeDrawer}
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
