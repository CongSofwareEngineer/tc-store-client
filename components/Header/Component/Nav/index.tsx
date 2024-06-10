import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Media from 'react-media'
import styled from 'styled-components'

const LinkCustom = styled(styled(Link)<{ $isSelected?: Boolean }>``).attrs({
  className: 'hover:underline hover:text-blue-700',
})`
  color: ${(props) => (props.$isSelected ? 'blue !important' : 'black')};
  font-weight: ${(props) => (props.$isSelected ? '700 !important' : 'nonce')};
`
const Nav = () => {
  const { isLogin } = useUserData()
  const { translate } = useLanguage()
  const pathname = usePathname()

  const renderDesktop = () => {
    return (
      <div className="flex flex-1 gap-5 ml-2">
        <LinkCustom
          $isSelected={pathname === '/' || pathname === ''}
          href={'/'}
        >
          {translate('header.home')}
        </LinkCustom>
        <LinkCustom $isSelected={pathname === '/shop'} href={'/shop'}>
          {translate('header.shop')}
        </LinkCustom>
        <LinkCustom $isSelected={pathname === '/contact'} href={'/contact'}>
          {translate('header.contact')}
        </LinkCustom>
        {isLogin ? (
          <LinkCustom $isSelected={pathname === '/cart'} href={'/cart'}>
            {translate('header.cart')}
          </LinkCustom>
        ) : (
          <LinkCustom $isSelected={pathname === '/register'} href={'/register'}>
            {translate('header.register')}
          </LinkCustom>
        )}
      </div>
    )
  }

  return (
    <Media query="(min-width: 768px)">
      {(match) => {
        if (match) {
          return renderDesktop()
        }
        return <></>
      }}
    </Media>
  )
}

export default Nav
