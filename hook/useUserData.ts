import { QueryData } from '@/constant/firebase'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { setUserData } from '@/redux/userDataSlice'
import { useCallback, useMemo } from 'react'
import useLanguage from './useLanguage'
import { showNotificationError, showNotificationSuccess } from '@/utils/functions'
import secureLocalStorage from "react-secure-storage";
import { decryptData, encryptData } from '@/utils/crypto'
import { SLICE } from '@/constant/redux'
import ClientApi from '@/services/clientApi'
import useModalDrawer from './useModalDrawer'

const useUserData = () => {
  const dispatch = useAppDispatch()
  const { UserData: userData } = useAppSelector(state => state.app)
  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()


  const isLogin = useMemo(() => {
    return !!userData
  }, [userData])

  const loginFireBase = useCallback(async (sdt: string, pass: string) => {
    const listQuery: QueryData[] = [
      {
        key: 'sdt',
        match: '==',
        value: sdt
      },
      {
        key: 'pass',
        match: '==',
        value: pass
      }
    ]
    const data = await ClientApi.login(listQuery)
    return data?.data || []
  }, [])

  const logOut = useCallback(() => {
    dispatch(setUserData(null))
    secureLocalStorage.removeItem(SLICE.UserData)
  }, [dispatch])

  const refreshLogin = useCallback(async () => {
    const dataSecure = secureLocalStorage.getItem(SLICE.UserData)
    if (dataSecure) {

      const dataDecode = decryptData(dataSecure.toString())
      const dataPare = JSON.parse(dataDecode)

      const data = await loginFireBase(dataPare.sdt, dataPare.pass)
      if (data.length === 0) {
        logOut()
      } else {
        dispatch(setUserData(data[0]))
        const userEncode = encryptData(JSON.stringify(data[0]))
        secureLocalStorage.setItem(SLICE.UserData, userEncode)
      }
    } else {
      logOut()
    }
  }, [dispatch, loginFireBase, logOut])


  const login = useCallback(async (numberPhone: string, pass: string) => {
    try {
      const encodePass = encryptData(pass)
      const data = await loginFireBase(numberPhone, encodePass)

      if (data.length === 0) {
        showNotificationError(translate('noti.loginError'))
      } else {
        const userEncode = encryptData(JSON.stringify(data[0]))
        secureLocalStorage.setItem(SLICE.UserData, userEncode)
        dispatch(setUserData(data[0]))
        showNotificationSuccess(translate('success.login'))
        closeModalDrawer()
      }

    } catch (error) {
      showNotificationError(translate('noti.loginError'))
    }
  }, [dispatch, loginFireBase, translate, closeModalDrawer])


  return {
    userData,
    isLogin: !!isLogin,
    logOut,
    login,
    refreshLogin
  }
}

export default useUserData