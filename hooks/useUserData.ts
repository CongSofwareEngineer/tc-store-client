import useLanguage from './useLanguage'
import secureLocalStorage from 'react-secure-storage'
import { encryptData } from '@/utils/crypto'
import useModalDrawer from './useModalDrawer'
import { COOKIE_EXPIRED, COOKIE_KEY, OBSERVER_KEY } from '@/constants/app'
import ClientApi from '@/services/clientApi'
import ObserverService from '@/services/observer'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import { useUserData as userUserDataZustand } from '@/zustand/useUserData'
import { ZUSTAND } from '@/constants/zustand'
import { setCookie } from '@/services/cookiesService'
import { removeDataLocal } from '@/utils/functions'

const useUserData = () => {
  const { translate } = useLanguage()

  const { closeModalDrawer } = useModalDrawer()
  const {
    setUserData: setUserDataZustand,
    userData,
    connecting,
    setConnecting,
  } = userUserDataZustand()

  const loginWithDB = async (sdt: string, pass: string) => {
    const data = await ClientApi.login(sdt, pass)

    if (data?.data) {
      setUserDataZustand(data?.data)
      removeDataLocal(COOKIE_KEY.MyCart)
      await Promise.all([
        setCookie(COOKIE_KEY.Auth, data?.data.auth?.toString(), COOKIE_EXPIRED.ExpiredAuth),
        setCookie(
          COOKIE_KEY.AuthRefresh,
          data?.data.authRefresh?.toString(),
          COOKIE_EXPIRED.ExpiredAuthRefresh
        ),
      ])
    }

    return data?.data || null
  }

  const refreshLogin = async () => {
    try {
      setConnecting(true)
      if (userData) {
        const data = await loginWithDB(userData?.sdt!, userData?.pass!)
        if (!data) {
          ObserverService.emit(OBSERVER_KEY.LogOut)
        }
      } else {
        ObserverService.emit(OBSERVER_KEY.LogOut)
      }
    } catch {
      ObserverService.emit(OBSERVER_KEY.LogOut)
    } finally {
      setConnecting(false)
    }
  }

  const login = async (numberPhone: string, pass: string, saveLogin = true) => {
    try {
      setConnecting(true)
      const encodePass = encryptData(pass)
      const data = await loginWithDB(numberPhone, encodePass)

      if (data) {
        if (saveLogin) {
          const userEncode = encryptData(JSON.stringify(data))
          secureLocalStorage.setItem(ZUSTAND.UserData, userEncode)
        }
        showNotificationSuccess(translate('success.login'))
        closeModalDrawer()
      } else {
        showNotificationError(translate('noti.loginError'))
      }
    } catch {
      showNotificationError(translate('noti.loginError'))
    } finally {
      setConnecting(false)
    }
  }

  return {
    userData,
    isLogin: !!userData,
    login,
    refreshLogin,
    connecting,
  }
}

export default useUserData
