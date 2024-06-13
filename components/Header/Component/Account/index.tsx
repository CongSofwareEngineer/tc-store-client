import useLanguage from '@/hook/useLanguage'
import useModal from '@/hook/useModal'
import useUserData from '@/hook/useUserData'
import React from 'react'
import ModalLogin from '../ModalLogin'
import { MenuOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import useDrawer from '@/hook/useDrawer'
import NavMobile from '../NavMobile'
import Media from 'react-media'

const Account = () => {
  const { openModal } = useModal()
  const { openDrawer } = useDrawer()
  const { translate } = useLanguage()
  const { isLogin, logOut, userData } = useUserData()

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

  const handleViewMenu = () => {
    openDrawer({
      content: <NavMobile />,
      width: '70%',
      title: renderTitleDrawer(),
    })
  }

  const renderTitleDrawer = () => {
    return (
      <div className="flex gap-1 items-center">
        <span>{userData?.name}</span>
        <div className="bg-black w-[2px] h-[14px]" />
        <span>{userData?.sdt}</span>
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div className="flex gap-2">
        {isLogin ? (
          <div className="flex gap-2">
            <ShoppingCartOutlined style={{ fontSize: 18 }} />
            <div>{userData?.name}</div>
            <MenuOutlined onClick={handleViewMenu} style={{ fontSize: 20 }} />
          </div>
        ) : (
          <div
            onClick={handleLogin}
            className="rounded h-full cursor-pointer w-24   flex justify-center items-center"
          >
            <span className="text-black underline">
              {isLogin ? translate('common.logOut') : translate('common.login')}
            </span>
          </div>
        )}
      </div>
    )
  }

  const renderDesktop = () => {
    return (
      <div className="h-full fex gap-2 items-center">
        <div
          onClick={handleLogin}
          className="rounded h-full cursor-pointer w-24   flex justify-center items-center"
        >
          <span className="text-black underline">
            {isLogin ? translate('common.logOut') : translate('common.login')}
          </span>
        </div>
      </div>
    )
  }

  return (
    <Media query="(min-width: 768px)">
      {(match) => {
        if (match) {
          return renderDesktop()
        }
        return renderMobile()
      }}
    </Media>
  )
}

export default Account
