import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import React from 'react'
import ModalLogin from '../ModalLogin'
import { DownOutlined, MenuOutlined } from '@ant-design/icons'
import NavMobile from '../NavMobile'
import { Dropdown, MenuProps } from 'antd'
import CartUser from './cartUser'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'

const Account = () => {
  const { openModalDrawer } = useModalDrawer()
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
        width: '70%',
        placement: 'right',
      },
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
          <div className="flex gap-2 items-center">
            <CartUser />
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
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <div onClick={handleLogin} className="cursor-pointer">
            {translate('myProfile.myProfile')}
          </div>
        ),
      },
      {
        key: '2',
        label: (
          <div onClick={handleLogin} className="cursor-pointer">
            {translate('common.logOut')}
          </div>
        ),
      },
    ]

    return (
      <div className="h-full fex gap-2 items-center">
        <div className="rounded h-full cursor-pointer  flex justify-center items-center">
          {isLogin ? (
            <div className="flex gap-4 items-center">
              <CartUser />

              <Dropdown menu={{ items }}>
                <div className="flex gap-3">
                  {`${userData?.name || userData?.sdt}`}
                  <DownOutlined />
                </div>
              </Dropdown>
            </div>
          ) : (
            <span onClick={handleLogin} className="text-black underline  w-24 ">
              {translate('common.login')}
            </span>
          )}
        </div>
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default Account
