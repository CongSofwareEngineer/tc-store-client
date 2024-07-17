import { useAppDispatch, useAppSelector } from '@/redux/store'
import { setUserData } from '@/redux/userDataSlice'
import { useCallback, useEffect, useMemo } from 'react'
import useLanguage from './useLanguage'
import { showNotificationError, showNotificationSuccess } from '@/utils/functions'
import secureLocalStorage from "react-secure-storage";
import { decryptData, encryptData } from '@/utils/crypto'
import { SLICE } from '@/constant/redux'
import useModalDrawer from './useModalDrawer'
import ServerApi from '@/services/serverApi'
import { CookieExpired, CookieKey, ObserverKey, RequestType } from '@/constant/app'
import { deleteCookie, setCookie } from '@/services/CookeisService'
import ObserverService from '@/services/observer'

const useUserData = () => {
  const dispatch = useAppDispatch()
  const { UserData: userData } = useAppSelector(state => state.app)
  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()

  useEffect(() => {
    const updateCookies = (auth: string) => {
      setCookie(CookieKey.Auth, auth, CookieExpired.ExpiredAuth)
    }
    ObserverService.on(ObserverKey.LogOut, () => logOut())
    ObserverService.on(ObserverKey.UpdateCookieAuth, updateCookies)
    return () => ObserverService.removeListener(ObserverKey.LogOut)
  }, [])


  const isLogin = useMemo(() => {
    return !!userData
  }, [userData])

  const loginWithDB = useCallback(async (sdt: string, pass: string) => {
    const data = await ServerApi.requestBase({
      url: `user/login`,
      method: RequestType.POST,
      encode: true,
      checkAuth: false,
      body: {
        sdt,
        pass
      }
    })

    if (data?.data) {
      dispatch(setUserData(data?.data))
      setCookie(CookieKey.Auth, data?.data.auth?.toString(), CookieExpired.ExpiredAuth)
      setCookie(CookieKey.AuthRefresh, data?.data.authRefresh?.toString(), CookieExpired.ExpiredAuthRefresh)
    }
    return data?.data || null
  }, [dispatch])

  const logOut = useCallback(() => {
    dispatch(setUserData(null))
    secureLocalStorage.removeItem(SLICE.UserData)
    deleteCookie(CookieKey.Auth)
    deleteCookie(CookieKey.AuthRefresh)
  }, [dispatch])

  const refreshLogin = useCallback(async () => {
    if (userData) {
      const data = await loginWithDB(userData?.sdt || '', userData?.pass || '')
      if (!data) {
        logOut()
      }
    } else {
      logOut()
    }
  }, [logOut, userData, loginWithDB])

  const reLogin = useCallback(async () => {
    const dataSecure = secureLocalStorage.getItem(SLICE.UserData)
    if (dataSecure) {
      const dataDecode = decryptData(dataSecure.toString())
      const dataPare = JSON.parse(dataDecode)

      const data = await loginWithDB(dataPare?.sdt, dataPare?.pass)
      if (data) {
        const userEncode = encryptData(JSON.stringify(data))
        secureLocalStorage.setItem(SLICE.UserData, userEncode)
      } else {
        logOut()
      }
    } else {
      logOut()
    }
  }, [logOut, loginWithDB])

  const login = useCallback(async (numberPhone: string, pass: string, saveLogin = true) => {
    try {
      const encodePass = encryptData(pass)
      const data = await loginWithDB(numberPhone, encodePass)

      if (data) {
        if (saveLogin) {
          const userEncode = encryptData(JSON.stringify(data))
          secureLocalStorage.setItem(SLICE.UserData, userEncode)
        }
        showNotificationSuccess(translate('success.login'))
        closeModalDrawer()
      } else {
        showNotificationError(translate('noti.loginError'))
      }

    } catch (error) {
      showNotificationError(translate('noti.loginError'))
    }
  }, [translate, closeModalDrawer, loginWithDB])


  return {
    userData,
    isLogin: !!isLogin,
    logOut,
    login,
    refreshLogin,
    reLogin
  }
}

export default useUserData