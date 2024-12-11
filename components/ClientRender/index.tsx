'use client'
import React, { useRef } from 'react'
import Header from '../Header'
import { useAppDispatch } from '@/redux/store'
import { setMenuCategory } from '@/redux/categoryMenuSlice'
import Footer from '../Footer'
import dynamic from 'next/dynamic'
import useAos from '@/hook/useAos'
import { fetchProvinces } from '@/redux/provincesSlice'
import { SLICE } from '@/constant/redux'
import secureLocalStorage from 'react-secure-storage'
import { setUserData } from '@/redux/userDataSlice'
import { decryptData } from '@/utils/crypto'

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

const ClientRender = ({ children, menuCategory }: { children: React.ReactNode; menuCategory: any[] }) => {
  useAos()
  const dispatch = useAppDispatch()
  const isClientRef = useRef(false)

  if (!isClientRef.current) {
    const dataSecure = secureLocalStorage.getItem(SLICE.UserData)
    if (dataSecure) {
      const dataDecode = decryptData(dataSecure.toString())
      dispatch(setUserData(JSON.parse(dataDecode)))
    }
    dispatch(setMenuCategory(menuCategory))
    dispatch(fetchProvinces())

    isClientRef.current = true
  }

  return (
    <>
      <Header />
      <main className='main-content w-full flex justify-center min-h-[calc(100vh-56px)]'>
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
