import { COOKIE_EXPIRED, COOKIE_KEY, OBSERVER_KEY } from '@/constant/app'
import { SLICE, TypeUserData } from '@/constant/redux'
import useCheckPatchName from '@/hook/tank-query/useCheckPatchName'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { setUserData } from '@/redux/userDataSlice'
import ClientApi from '@/services/clientApi'
import { deleteCookie, setCookie } from '@/services/CookiesService'
import ObserverService from '@/services/observer'
import { encryptData } from '@/utils/crypto'
import React, { useEffect } from 'react'
import secureLocalStorage from 'react-secure-storage'

const FirstLoadWebsite: React.FC = () => {
  useCheckPatchName()
  const dispatch = useAppDispatch()
  const { UserData: userData } = useAppSelector((state) => state.app)

  useEffect(() => {
    if (userData) {
      ObserverService.emit(OBSERVER_KEY.ReLogin, userData)
    }
  }, [])

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

    ObserverService.on(OBSERVER_KEY.LogOut, handleLogout)
    ObserverService.on(OBSERVER_KEY.UpdateCookieAuth, updateCookies)

    return () => {
      ObserverService.removeListener(OBSERVER_KEY.LogOut)
      ObserverService.removeListener(OBSERVER_KEY.UpdateCookieAuth)
    }
  }, [])

  return <></>
}

export default FirstLoadWebsite
