'use client'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useUserData from '@/hook/useUserData'
import { scrollTop } from '@/utils/functions'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { PropsWithChildren } from 'react'

const Container = ({ children }: PropsWithChildren) => {
  const { isMobile, isClient } = useMedia()
  const { translate } = useLanguage()
  const { userData } = useUserData()
  const patchName = usePathname()

  useEffect(() => {
    setTimeout(() => {
      scrollTop()
    }, 100)
  }, [])

  const renderItem = (icon: string, name: string, link: string) => {
    return (
      <Link
        href={link}
        className="cursor-pointer text-black cursor-default flex md:flex-row flex-col gap-1 md:items-start items-center hover:underline"
        style={{
          fontWeight: patchName === link ? 'bold' : 'normal',
          color: 'black',
        }}
      >
        <MyImage
          src={icon}
          alt={`icon-menu-my-profile-${name}`}
          widthImage={isMobile ? '20px' : '25px'}
          heightImage={isMobile ? '20px' : '25px'}
        />
        <span>{name}</span>
      </Link>
    )
  }

  const renderMobile = () => {
    return (
      <div className="bg-white w-[calc(100%+40px)]  p-4 top-[-6px] relative left-[-20px]">
        <div className="w-full relative ">
          <div className="fixed bg-white  w-full flex justify-around bottom-0 left-0 py-3  border-t-[1px] shadow-gray1 border-gray-300">
            {renderItem(images.icon.iconHome, translate('header.home'), '/')}
            {renderItem(
              images.icon.iconHistory,
              translate('myPage.myOder'),
              '/my-page/bill'
            )}
            {renderItem(
              images.icon.iconMyUser,
              translate('myPage.myUser'),
              '/my-page'
            )}
          </div>
          {children}
        </div>
      </div>
    )
  }

  const renderDesktop = () => {
    return (
      <div className="w-full flex gap-6 h-full">
        <div className="w-[200px] flex flex-col  items-center gap-3 h-full">
          <div className="w-[150px] relative overflow-hidden rounded-[50%]">
            <MyImage
              src={
                userData?.avatar?.toString() || images.userDetail.iconUserDetail
              }
              alt="avatar"
              widthImage="100%"
              heightImage="auto"
            />
          </div>
          <div className="text-center text-medium">{userData?.name}</div>
          <div className="flex flex-col w-full gap-3 text-medium">
            {renderItem(
              images.icon.iconMyUser,
              translate('myProfile.myProfile'),
              '/my-page'
            )}
            {renderItem(
              images.icon.avatarDefault,
              translate('bill.title'),
              '/my-page/bill'
            )}
          </div>
        </div>
        <div className="flex flex-1 bg-white p-4 h-fit max-h-[calc(100vh-80px)] overflow-y-auto">
          {children}
        </div>
      </div>
    )
  }

  return isClient && (isMobile ? renderMobile() : renderDesktop())
}

export default Container
