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
  const { isLogin, logOut, userData } = useUserData()
  const { translate } = useLanguage()
  const pathname = usePathname()

  const handleLogOut = () => {
    logOut()
  }
  return (
    <div className="flex flex-1  flex-col gap-3">
      <LinkCustom $isSelected={pathname === '/' || pathname === ''} href={'/'}>
        {translate('header.home')}
      </LinkCustom>
      <LinkCustom $isSelected={pathname === '/shop'} href={'/shop'}>
        {translate('header.shop')}
      </LinkCustom>
      <LinkCustom $isSelected={pathname === '/contact'} href={'/contact'}>
        {translate('header.contact')}
      </LinkCustom>
      {isLogin ? (
        <LinkCustom $isSelected={pathname === '/my-cart'} href={'/my-cart'}>
          {translate('header.cart')}
        </LinkCustom>
      ) : (
        <LinkCustom $isSelected={pathname === '/register'} href={'/register'}>
          {translate('header.register')}
        </LinkCustom>
      )}

      {isLogin && (
        <LinkCustom
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
