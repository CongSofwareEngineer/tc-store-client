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
    const sectionMain = window.document.getElementById('id-section-content')
    const header = window.document.getElementById('id-container-header')
    if (patchName.includes('/admin')) {
      if (sectionMain) {
        sectionMain.classList.add('container-admin')
      }
      if (header) {
        header.classList.add('container-admin')
      }
    }

    return () => {
      sectionMain && sectionMain.classList.remove('container-admin')
      header && header.classList.remove('container-admin')
    }
  }, [patchName])

  useEffect(() => {
    if (!isLogin) {
      router.push('/')
    }
  }, [isLogin, router])

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
    {
      title: translate('menuProduct.category'),
      url: '/admin/category',
    },
  ]

  return (
    <div className="md:fixed  w-screen   flex md:flex-row flex-col h-full max-h-[calc(100vh-56px)]">
      {isLogin && isClient && (
        <>
          {!isMobile ? (
            <div className="w-[200px] flex flex-col p-3 gap-2 bg-[#000000d6]">
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
            <div className="flex w-full gap-4   pt-4  px-5 ">
              <div className="flex w-full gap-3  overflow-x-auto  pt-4 pb-3  ">
                {LIST_MENU.map((e) => {
                  return (
                    <div key={e.url} className="w-auto">
                      <Link
                        href={e.url}
                        className={`${
                          patchName === e.url ? 'font-bold underline' : ''
                        } text-nowrap bg-green-100 p-4 py-1 min-w-[50px] border-[1px] border-blue-300 rounded-lg text-black`}
                      >
                        {e.title}
                      </Link>
                    </div>
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
