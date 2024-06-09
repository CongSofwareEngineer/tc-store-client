import { useAppDispatch, useAppSelector } from '@/redux/store'
import { setUserData } from '@/redux/userDataSlice'
import { useCallback, useMemo } from 'react'

const useUserData = () => {
  const dispatch = useAppDispatch()
  const { UserData: userData } = useAppSelector(state => state.app)
  const isLogin = useMemo(() => !!userData, [userData])

  const logOut = useCallback(() => {
    dispatch(setUserData(null))
  }, [dispatch])

  const login = useCallback(async (numberPhone: string, pass: string) => {
    try {
      console.log('====================================');
      console.log({ numberPhone, pass });
      console.log('====================================');

    } catch (error) {

    }
  }, [])


  return {
    userData,
    isLogin,
    logOut,
    login
  }
}

export default useUserData