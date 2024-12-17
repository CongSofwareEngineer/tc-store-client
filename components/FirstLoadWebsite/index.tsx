import { COOKIE_EXPIRED, COOKIE_KEY, OBSERVER_KEY } from '@/constant/app'
import { SLICE, TypeUserData } from '@/constant/redux'
import useCheckPatchName from '@/hook/tank-query/useCheckPatchName'
import { fetchMenuCategory } from '@/redux/categoryMenuSlice'
import { useAppSelector } from '@/redux/store'
import { setUserData } from '@/redux/userDataSlice'
import ClientApi from '@/services/clientApi'
import { deleteCookie, setCookie } from '@/services/CookiesService'
import ObserverService from '@/services/observer'
import { encryptData } from '@/utils/crypto'
import { Loading3QuartersOutlined } from '@ant-design/icons'
import { usePathname } from 'next/navigation'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import secureLocalStorage from 'react-secure-storage'

const listUrlExited: string[] = []
const FirstLoadWebsite: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  useCheckPatchName()
  const pathName = usePathname()
  const dispatch = useDispatch()
  const { UserData: userData } = useAppSelector((state) => state.app)

  useLayoutEffect(() => {
    if (userData) {
      ObserverService.emit(OBSERVER_KEY.ReLogin, userData)
    }
    dispatch(fetchMenuCategory())
  }, [])

  useEffect(() => {
    setIsLoading(false)
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
        dispatch(setUserData(data?.data))
        setCookie(COOKIE_KEY.Auth, data?.data.auth?.toString(), COOKIE_EXPIRED.ExpiredAuth)
        setCookie(COOKIE_KEY.AuthRefresh, data?.data.authRefresh?.toString(), COOKIE_EXPIRED.ExpiredAuthRefresh)
      }
      return data?.data || null
    }

    const refreshLogin = async (userData: TypeUserData) => {
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

    const routePage = ({ url = '' }: { url?: string }) => {
      console.log({ url })

      if (!listUrlExited.includes(url)) {
        setIsLoading(true)
        listUrlExited.push(url)
      }
    }
    ObserverService.on(OBSERVER_KEY.RoutePage, routePage)
    ObserverService.on(OBSERVER_KEY.LogOut, handleLogout)
    ObserverService.on(OBSERVER_KEY.UpdateCookieAuth, updateCookies)

    return () => {
      ObserverService.removeListener(OBSERVER_KEY.RoutePage)
      ObserverService.removeListener(OBSERVER_KEY.LogOut)
      ObserverService.removeListener(OBSERVER_KEY.UpdateCookieAuth)
    }
  }, [])

  return isLoading ? (
    <div className='fixed bg-green/10 flex justify-center items-center invisible'>
      <div className='text-2xl text-green-600'>
        <Loading3QuartersOutlined />
      </div>
    </div>
  ) : (
    <></>
  )
}

export default FirstLoadWebsite
