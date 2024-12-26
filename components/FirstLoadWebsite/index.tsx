import { COOKIE_EXPIRED, COOKIE_KEY, LOCAL_STORAGE_KEY, OBSERVER_KEY } from '@/constant/app'
import { TYPE_USER_DATA, TYPE_ZUSTAND, ZUSTAND } from '@/constant/zustand'
import useCheckPatchName from '@/hook/tank-query/useCheckPatchName'
import ClientApi from '@/services/clientApi'
import { deleteCookie, getCookie, setCookie } from '@/services/CookiesService'
import ObserverService from '@/services/observer'
import { encryptData } from '@/utils/crypto'
import { getDataLocal, removeDataLocal, scrollTop } from '@/utils/functions'
import { useCategoryMenu } from '@/zustand/useCategoryMenu'
import { useProvinces } from '@/zustand/useProvinces'
import { useUserData } from '@/zustand/useUserData'
import { LoadingOutlined } from '@ant-design/icons'
import { NextPage } from 'next'
import { usePathname } from 'next/navigation'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'

const FirstLoadWebsite: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  useCheckPatchName()
  const pathName = usePathname()
  const { fetchData: fetchCategoryMenu } = useCategoryMenu()
  const { fetchData: fetchDataProvinces } = useProvinces()
  const { reset: resetUser, userData, setUserData, loadDataLocal } = useUserData()
  const listUrlExitedRef = useRef<string[]>([])
  const userRef = useRef<TYPE_ZUSTAND[ZUSTAND.UserData]>(null)

  useLayoutEffect(() => {
    fetchCategoryMenu()
    fetchDataProvinces()
    loadDataLocal()
  }, [])
  useEffect(() => {
    if (!userRef.current) {
      userRef.current = userData
    }
  }, [userData])

  useLayoutEffect(() => {
    if (userData) {
      ObserverService.emit(OBSERVER_KEY.ReLogin, userData)
    }
  }, [])

  useEffect(() => {
    setIsLoading(false)
    scrollTop()
  }, [pathName])

  //re login
  useEffect(() => {
    const loginWithDB = async (sdt: string, pass: string) => {
      const dataBody = encryptData(
        JSON.stringify({
          sdt,
          pass,
        }),
      )
      const body = {
        data: dataBody,
      }
      const data = await ClientApi.login(body)

      if (data?.data) {
        setUserData(data?.data)
        setCookie(COOKIE_KEY.Auth, data?.data.auth?.toString(), COOKIE_EXPIRED.ExpiredAuth)
      }
      return data?.data || null
    }

    const refreshLogin = async (userData: TYPE_USER_DATA) => {
      const refreshAuth = await getCookie(COOKIE_KEY.AuthRefresh)
      if (!refreshAuth) {
        ObserverService.emit(OBSERVER_KEY.LogOut)
        return
      }
      const data = await loginWithDB(userData.sdt!, userData.pass!)
      if (!data) {
        ObserverService.emit(OBSERVER_KEY.LogOut)
      }
    }
    ObserverService.on(OBSERVER_KEY.ReLogin, refreshLogin)
    return () => ObserverService.removeListener(OBSERVER_KEY.ReLogin)
  }, [])

  //logout
  useEffect(() => {
    const handleLogout = async (isReload = true) => {
      if (userRef.current && Array.isArray(userRef.current?.tokenNoti)) {
        const tokenLocal = getDataLocal(LOCAL_STORAGE_KEY.TokenFirebase)
        const tokens = userRef.current?.tokenNoti.filter((item: string) => item !== tokenLocal)

        ClientApi.updateTokenNoti(userRef.current?._id!, {
          tokenNoti: tokens,
          isLogout: true,
        })

        userRef.current = null
      }
      resetUser()
      setTimeout(() => {
        secureLocalStorage.removeItem(ZUSTAND.UserData)
        deleteCookie(COOKIE_KEY.Auth)
        deleteCookie(COOKIE_KEY.AuthRefresh)
        removeDataLocal(LOCAL_STORAGE_KEY.TokenFirebase)
      }, 100)
      if (isReload) {
        window.location.href = '/'
      }
    }

    const routePage = ({ url = '' }: { url?: string }) => {
      if (!listUrlExitedRef.current.includes(url)) {
        setIsLoading(true)
        listUrlExitedRef.current.push(url)
        setTimeout(() => {
          setIsLoading(false)
        }, 1500)
      }
    }

    ObserverService.on(OBSERVER_KEY.RoutePage, routePage)
    ObserverService.on(OBSERVER_KEY.LogOut, handleLogout)

    return () => {
      ObserverService.removeListener(OBSERVER_KEY.RoutePage, () => setIsLoading(false))
      ObserverService.removeListener(OBSERVER_KEY.LogOut)
    }
  }, [])

  return isLoading ? (
    <div
      style={{
        position: 'fixed',
        zIndex: 999999999999999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: '#8487843d',
        backdropFilter: 'blur(1px)',
      }}
    >
      <div className='text-2xl text-green-600'>
        <LoadingOutlined style={{ fontSize: 35 }} />
      </div>
    </div>
  ) : (
    <></>
  )
}

export default FirstLoadWebsite
