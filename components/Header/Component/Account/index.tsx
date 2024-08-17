import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import React from 'react'
import ModalLogin from '../ModalLogin'
import { MenuOutlined } from '@ant-design/icons'
import NavMobile from '../NavMobile'
import CartUser from './cartUser'
import useMedia from '@/hook/useMedia'
import MyNavigationMenu, {
  NavigationMenuProps,
} from '@/components/ShadcnUI/MyNavigationMenu'
import useMyDrawer from '@/hook/useMyDrawer'

const Account = () => {
  const { openModalDrawer } = useMyDrawer()
  const { translate } = useLanguage()
  const { isLogin, logOut, userData } = useUserData()
  const { isMobile } = useMedia()

  const handleLogin = () => {
    if (isLogin) {
      logOut()
    } else {
      openModalDrawer({
        content: <ModalLogin />,
        configModal: {
          showHeader: true,
        },
      })
    }
  }

  const handleViewMenu = () => {
    openModalDrawer({
      content: <NavMobile />,
      onlyDrawer: true,
      title: renderTitleDrawer(),
      configDrawer: {
        width: '70vw',
        position: 'right',
      },
    })
  }

  const renderTitleDrawer = () => {
    return (
      <div className="flex flex-col   w-full">
        <span>{userData?.name}</span>
        <span>{userData?.sdt}</span>
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div className="flex gap-2">
        {isLogin ? (
          <div className="flex gap-2 items-center">
            <CartUser />
            <div>{userData?.name}</div>
          </div>
        ) : (
          <div
            onClick={handleLogin}
            className="rounded h-full cursor-pointer w-24  flex justify-center items-center"
          >
            <span className="text-black underline">
              {isLogin ? translate('common.logOut') : translate('common.login')}
            </span>
          </div>
        )}
        <MenuOutlined onClick={handleViewMenu} style={{ fontSize: 20 }} />
      </div>
    )
  }

  const renderDesktop = () => {
    const items: NavigationMenuProps[] = [
      {
        title: (
          <div className="flex gap-3">
            {`${userData?.name || userData?.sdt}`}
          </div>
        ),
        content: [
          {
            title: (
              <div className="cursor-pointer">
                {translate('myProfile.myProfile')}
              </div>
            ),
            url: '/my-page',
          },
          {
            title: (
              <div onClick={handleLogin} className="cursor-pointer">
                {translate('common.logOut')}
              </div>
            ),
          },
        ],
      },
    ]

    return (
      <div className="h-full fex gap-2 items-center">
        <div className="rounded h-full cursor-pointer  flex justify-center items-center">
          {isLogin ? (
            <div className="flex gap-4 items-center">
              <CartUser />
              <MyNavigationMenu data={items} />
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <CartUser />
              <span
                onClick={handleLogin}
                className="text-black underline  w-24 "
              >
                {translate('common.login')}
              </span>
              {isLogin && (
                <MenuOutlined
                  onClick={handleViewMenu}
                  style={{ fontSize: 20 }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default Account
