import useLanguage from '@/hooks/useLanguage'
import useUserData from '@/hooks/useUserData'
import React from 'react'
import ModalLogin from '../ModalLogin'
import NavMobile from '../NavMobile'
// import CartUser from './cartUser'
import useMedia from '@/hooks/useMedia'
import useModalDrawer from '@/hooks/useModalDrawer'
import dynamic from 'next/dynamic'
import ObserverService from '@/services/observer'
import { OBSERVER_KEY } from '@/constants/app'
import Image from 'next/image'
import { detectAvatar } from '@/utils/functions'
import useRoutePage from '@/hooks/useRoutePage'
import { AiOutlineDown, AiOutlineMenu, AiOutlineUser } from 'react-icons/ai'
import MyDropDown, { IItemDropDown } from '@/components/MyDropDown'
import { FiLogOut } from 'react-icons/fi'
const CartUser = dynamic(() => import('./cartUser'), { ssr: false })

const Account = () => {
  const { openModalDrawer } = useModalDrawer()
  const { translate } = useLanguage()
  const { isLogin, userData } = useUserData()

  const { isMobile, isClient } = useMedia(900)
  const route = useRoutePage()

  const handleLogin = () => {
    if (isLogin) {
      ObserverService.emit(OBSERVER_KEY.LogOut, false)
    } else {
      openModalDrawer({
        content: <ModalLogin />,
        title: translate('common.login'),
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
        position: 'right',
      },
    })
  }

  const renderTitleDrawer = () => {
    return (
      <div className='flex flex-col text-sm gap-1  w-full'>
        <span>{userData?.name}</span>
        <span>{userData?.sdt}</span>
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div className='flex gap-2 items-center'>
        <CartUser />
        {isLogin ? (
          <div className='flex gap-2 items-center pr-1'>
            {userData?.avatar && <Image fill alt='user-avatar' className='!relative !w-6 !h-6 rounded-[50%]' src={detectAvatar(userData?.avatar)} />}
            <div>{userData?.name}</div>
          </div>
        ) : (
          <div className='rounded h-full cursor-pointer w-24  flex justify-center items-center' onClick={handleLogin}>
            <span className='text-black underline'>{translate('common.login')}</span>
          </div>
        )}
        <AiOutlineMenu className='cursor-pointer' style={{ fontSize: 20 }} onClick={handleViewMenu} />
      </div>
    )
  }

  const renderDesktop = () => {
    if (!isClient) {
      return <></>
    }
    const items: IItemDropDown[] = [
      {
        children: (
          <div className='flex items-center gap-2 cursor-pointer' onClick={() => route.push('/my-page')}>
            <AiOutlineUser />
            <div>{translate('myProfile.myProfile')}</div>
          </div>
        ),
      },
      {
        children: (
          <div className='flex items-center gap-2 cursor-pointer' onClick={handleLogin}>
            <FiLogOut />
            <div>{translate('common.logOut')}</div>
          </div>
        ),
      },
    ]

    return (
      <div className='h-full fex gap-2 items-center'>
        <div className='rounded h-full cursor-pointer  flex justify-center items-center'>
          {isLogin ? (
            <div className='flex gap-4 items-center'>
              <CartUser />

              <MyDropDown items={items}>
                <div className='flex gap-2 items-center '>
                  {userData?.avatar && (
                    <Image
                      key={detectAvatar(userData?.avatar)}
                      fill
                      alt='user-avatar'
                      className='!relative !w-6 !h-6 rounded-[50%]'
                      src={detectAvatar(userData?.avatar)}
                    />
                  )}

                  <div className='whitespace-nowrap mr-1 max-w-[120px] text-ellipsis overflow-hidden'>{`${userData?.name || userData?.sdt}`}</div>
                  <AiOutlineDown />
                </div>
              </MyDropDown>
            </div>
          ) : (
            <div className='flex gap-2 items-center'>
              <CartUser />
              <span className='text-black underline  w-24 ' onClick={handleLogin}>
                {translate('common.login')}
              </span>
              {isLogin && <AiOutlineMenu style={{ fontSize: 20 }} onClick={handleViewMenu} />}
            </div>
          )}
        </div>
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default Account
