'use client'
import React, { useEffect, useRef } from 'react'
import Header from '../Header'
import 'react-toastify/dist/ReactToastify.css'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { setMenuCategory } from '@/redux/categoryMenuSlice'
import useCheckPatchName from '@/hook/tank-query/useCheckPatchName'
import Footer from '../Footer'
import dynamic from 'next/dynamic'
import useUserData from '@/hook/useUserData'
import moment from 'moment'
import {
  COOKIE_EXPIRED,
  COOKIE_KEY,
  LANGUAGE_SUPPORT,
  OBSERVER_KEY,
} from '@/constant/app'
import useAos from '@/hook/useAos'
import { fetchProvinces } from '@/redux/provincesSlice'
import { deleteCookie, setCookie } from '@/services/CookeisService'
import ObserverService from '@/services/observer'
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

const ClientRender = ({
  children,
  menuCategory,
}: {
  children: React.ReactNode
  menuCategory: any[]
}) => {
  const { Language } = useAppSelector((state) => state.app)

  useAos()
  useCheckPatchName()
  const dispatch = useAppDispatch()
  const { reLogin } = useUserData()
  const isClientRef = useRef(false)

  if (!isClientRef.current) {
    console.log({ menuCategory })

    const dataSecure = secureLocalStorage.getItem(SLICE.UserData)
    if (dataSecure) {
      const dataDecode = decryptData(dataSecure.toString())
      dispatch(setUserData(JSON.parse(dataDecode)))
    }
    dispatch(setMenuCategory(menuCategory))
    dispatch(fetchProvinces())
    setTimeout(() => {
      reLogin()
    }, 200)
    isClientRef.current = true
  }

  useEffect(() => {
    const updateCookies = (auth: string) => {
      setCookie(COOKIE_KEY.Auth, auth, COOKIE_EXPIRED.ExpiredAuth)
    }
    const handleLogout = (isReload = true) => {
      secureLocalStorage.removeItem(SLICE.UserData)
      deleteCookie(COOKIE_KEY.Auth)
      deleteCookie(COOKIE_KEY.AuthRefresh)
      dispatch(setUserData(null))

      if (isReload) {
        window.location.href = '/'
      }
    }

    ObserverService.on(OBSERVER_KEY.LogOut, handleLogout)
    ObserverService.on(OBSERVER_KEY.UpdateCookieAuth, updateCookies)

    return () => {
      ObserverService.removeListener(OBSERVER_KEY.LogOut)
      ObserverService.removeListener(OBSERVER_KEY.UpdateCookieAuth)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    switch (Language?.locale) {
      case LANGUAGE_SUPPORT.VN:
        // moment.locale('vi')
        break

      default:
        moment.locale('vi')
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Language])

  return (
    <>
      <Header />
      <main className="main-content w-full flex justify-center min-h-[calc(100vh-56px)]">
        <section
          id="id-section-content"
          className="section-content  w-full max-w-[1350px]  md:px-12 px-[20px]  md:pt-5 pt-2"
        >
          {children}
        </section>
      </main>
      <Footer />
      <LoadingFirstPage />
      <ToastNoti />
    </>
  )
}

export default ClientRender
