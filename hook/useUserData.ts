import { useAppDispatch, useAppSelector } from '@/redux/store'
import { setUserData } from '@/redux/userDataSlice'
import useLanguage from './useLanguage'

import secureLocalStorage from 'react-secure-storage'
import { decryptData, encryptData } from '@/utils/crypto'
import { SLICE } from '@/constant/redux'
import useModalDrawer from './useModalDrawer'
import {
  COOKIE_EXPIRED,
  COOKIE_KEY,
  OBSERVER_KEY,
  REQUEST_TYPE,
} from '@/constant/app'
import { deleteCookie, setCookie } from '@/services/CookiesService'
import ClientApi from '@/services/clientApi'
import ObserverService from '@/services/observer'
import {
  showNotificationError,
  showNotificationSuccess,
} from '@/utils/notification'

const useUserData = () => {
  const dispatch = useAppDispatch()
  const { UserData: userData } = useAppSelector((state) => state.app)
  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()

  const loginWithDB = async (sdt: string, pass: string) => {
    const dataBody = encryptData(
      JSON.stringify({
        sdt,
        pass,
      })
    )
    const body = {
      data: dataBody,
    }
    const data = await ClientApi.login(body)

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
  }

  const refreshLogin = async () => {
    if (userData) {
      const data = await loginWithDB(userData?.sdt || '', userData?.pass || '')
      if (!data) {
        ObserverService.emit(OBSERVER_KEY.LogOut)
      }
    } else {
      ObserverService.emit(OBSERVER_KEY.LogOut)
    }
  }

  const reLogin = async () => {
    const dataSecure = secureLocalStorage.getItem(SLICE.UserData)
    if (dataSecure) {
      const dataDecode = decryptData(dataSecure.toString())
      const dataPare = JSON.parse(dataDecode)

      const data = await loginWithDB(dataPare?.sdt, dataPare?.pass)
      if (data) {
        const userEncode = encryptData(JSON.stringify(data))
        secureLocalStorage.setItem(SLICE.UserData, userEncode)
      } else {
        ObserverService.emit(OBSERVER_KEY.LogOut, false)
      }
    } else {
      ObserverService.emit(OBSERVER_KEY.LogOut, false)
    }
  }

  const login = async (numberPhone: string, pass: string, saveLogin = true) => {
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
  }

  return {
    userData,
    isLogin: !!userData,
    login,
    refreshLogin,
    reLogin,
  }
}

export default useUserData
