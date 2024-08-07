'use client'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useUserData from '@/hook/useUserData'
import { TagFilled } from '@ant-design/icons'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const ContainerAdmin = ({ children }: { children: React.ReactNode }) => {
  const { isMobile, isClient } = useMedia()
  const { translate } = useLanguage()
  const patchName = usePathname()
  const { isLogin } = useUserData()
  const router = useRouter()

  useEffect(() => {
    const sessionMain = window.document.getElementById('id-section-content')
    const header = window.document.getElementById('id-container-header')
    if (patchName.includes('/admin')) {
      if (sessionMain) {
        sessionMain.classList.add('container-admin')
      }
      if (header) {
        header.classList.add('container-admin')
      }
    }

    return () => {
      sessionMain && sessionMain.classList.remove('container-admin')
      header && header.classList.remove('container-admin')
    }
  }, [])

  useEffect(() => {
    if (!isLogin) {
      router.push('/')
    }
  }, [isLogin])

  const LIST_MENU = [
    {
      title: translate('admin.revenue'),
      url: '/admin',
    },
    {
      title: translate('bill.title'),
      url: '/admin/bill',
    },
    {
      title: translate('header.cart'),
      url: '/admin/cart',
    },
    {
      title: translate('textPopular.comment'),
      url: '/admin/comment',
    },
    {
      title: translate('textPopular.product'),
      url: '/admin/product',
    },
  ]

  return (
    <div className="md:fixed  w-screen   flex md:flex-row flex-col h-full max-h-[calc(100vh-56px)]">
      {isLogin && isClient && (
        <>
          {!isMobile ? (
            <div className="w-[200px] flex flex-col p-3 gap-3 bg-[#000000d6]">
              <div className="w-full">
                <MyImage
                  alt="logo-admin"
                  src={images.logo}
                  widthImage="100%"
                  heightImage="auto"
                />
              </div>
              {LIST_MENU.map((e) => {
                return (
                  <div key={e.url} className="flex gap-3 items-center">
                    <TagFilled style={{ color: 'white' }} />
                    <Link
                      href={e.url}
                      className="capitalize text-medium hover:underline text-white"
                      style={{
                        fontWeight: patchName.includes(e.url)
                          ? 'bold'
                          : 'normal',
                      }}
                    >
                      {e.title}
                    </Link>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex w-full gap-4   h-10 justify-center pt-4 ">
              <div className="flex gap-4 overflow-x-auto pb-5 px-5">
                {LIST_MENU.map((e) => {
                  return (
                    <Link
                      key={e.url}
                      href={e.url}
                      className={`${
                        patchName === e.url ? 'font-bold' : ''
                      } text-nowrap`}
                    >
                      {e.title}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
          <div className="flex flex-1 md:p-4 p-5 md:max-w-[calc(100vw-212px)]">
            {children}
          </div>
        </>
      )}
    </div>
  )
}

export default ContainerAdmin
