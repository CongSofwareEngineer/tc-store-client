import { useAppDispatch, useAppSelector } from '@/redux/store'
import { setUserData } from '@/redux/userDataSlice'
import { useCallback, useMemo } from 'react'
import useLanguage from './useLanguage'
import {
  showNotificationError,
  showNotificationSuccess,
} from '@/utils/functions'
import secureLocalStorage from 'react-secure-storage'
import { decryptData, encryptData } from '@/utils/crypto'
import { SLICE } from '@/constant/redux'
import useModalDrawer from './useModalDrawer'
import { COOKIE_EXPIRED, COOKIE_KEY, REQUEST_TYPE } from '@/constant/app'
import { deleteCookie, setCookie } from '@/services/CookeisService'
import ClientApi from '@/services/clientApi'

const useUserData = () => {
  const dispatch = useAppDispatch()
  const { UserData: userData } = useAppSelector((state) => state.app)
  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()

  const isLogin = useMemo(() => {
    return !!userData
  }, [userData])

  const loginWithDB = useCallback(
    async (sdt: string, pass: string) => {
      const dataBody = encryptData(
        JSON.stringify({
          sdt,
          pass,
        })
      )

      const data = await ClientApi.fetchData({
        url: `user/login`,
        method: REQUEST_TYPE.POST,
        body: {
          data: dataBody,
        },
        isAthu: false,
      })

      if (data?.data) {
        dispatch(setUserData(data?.data))
        setCookie(
          COOKIE_KEY.Auth,
          data?.data.auth?.toString(),
          COOKIE_EXPIRED.ExpiredAuth
        )
        setCookie(
          COOKIE_KEY.AuthRefresh,
          data?.data.authRefresh?.toString(),
          COOKIE_EXPIRED.ExpiredAuthRefresh
        )
      }
      return data?.data || null
    },
    [dispatch]
  )

  const logOut = useCallback(() => {
    dispatch(setUserData(null))
    secureLocalStorage.removeItem(SLICE.UserData)
    deleteCookie(COOKIE_KEY.Auth)
    deleteCookie(COOKIE_KEY.AuthRefresh)
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

  const login = useCallback(
    async (numberPhone: string, pass: string, saveLogin = true) => {
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
    },
    [translate, closeModalDrawer, loginWithDB]
  )

  return {
    userData,
    isLogin: !!isLogin,
    logOut,
    login,
    refreshLogin,
    reLogin,
  }
}

export default useUserData
