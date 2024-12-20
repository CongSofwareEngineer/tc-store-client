'use client'
import React, { useLayoutEffect } from 'react'
import Header from '../Header'
import { useAppDispatch } from '@/redux/store'
import Footer from '../Footer'
import dynamic from 'next/dynamic'
import useAos from '@/hook/useAos'
import { fetchProvinces } from '@/redux/provincesSlice'
import { setMenuCategory } from '@/redux/categoryMenuSlice'

const LoadingFirstPage = dynamic(() => import('../LoadingFirstPage'), {
  ssr: true,
})

const ToastNoti = dynamic(() => import('../ToastNoti'), {
  ssr: false,
})

const Notification = dynamic(() => import('../Notification'), {
  ssr: false,
})

const CheckPingServer = dynamic(() => import('../CheckPingServer'), {
  ssr: false,
})

const MyModalAdmin = dynamic(() => import('../MyModalAdmin'), {
  ssr: false,
})

const FirstLoadWebsite = dynamic(() => import('../FirstLoadWebsite'), {
  ssr: false,
})

const ClientRender = ({ children, menuCategory = [] }: { children: React.ReactNode; menuCategory: any[] }) => {
  useAos()
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    dispatch(fetchProvinces())
    dispatch(setMenuCategory(menuCategory))
  }, [])

  return (
    <>
      <Header />
      <main className='main-content w-full flex justify-center min-h-[calc(100dvh-56px)]'>
        <section
          id='id-section-content'
          className='section-content  w-full max-w-[1350px]  md:px-12 px-[20px]  md:pt-5 pt-2'
        >
          {children}
        </section>
      </main>
      <Footer />
      <LoadingFirstPage />
      <ToastNoti />
      <Notification />
      <MyModalAdmin />
      <CheckPingServer />
      <FirstLoadWebsite />
    </>
  )
}

export default ClientRender
