import { SLICE, TYPE_PERSIST_REDUCER, WHITE_LIST_PERSIT_REDUX } from '@/constant/redux'
import { configureStore } from '@reduxjs/toolkit'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

import appReducer from './appReducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import secureLocalStorage from 'react-secure-storage'
import { decryptData } from '@/utils/crypto'
import { setUserData } from './userDataSlice'

const reducer = (state: Partial<unknown> | unknown, action: any) => {
  return appReducer(state || {}, action)
}

export const makeStore = () => {
  const isClient = typeof window !== 'undefined'

  const persistConfig = {
    key: 'nextjs',
    storage,
    whitelist: WHITE_LIST_PERSIT_REDUX,
    stateReconciler: autoMergeLevel2
  }
  const persistedReducer = persistReducer<TYPE_PERSIST_REDUCER>(persistConfig, reducer)
  const storeRedux = configureStore({
    reducer: {
      app: persistedReducer
    }
  })
  if (isClient) {
    const dataSecure = secureLocalStorage.getItem(SLICE.UserData)
    if (dataSecure) {
      const dataDecode = decryptData(dataSecure.toString())
      storeRedux.dispatch(setUserData(JSON.parse(dataDecode)))
    }
    return storeRedux
  }

  return storeRedux
}
const persistor = persistStore(makeStore())
const storeRedux = makeStore()

export type RootState = ReturnType<typeof storeRedux.getState>
export type AppDispatch = typeof storeRedux.dispatch

const useAppDispatch = useDispatch.withTypes<AppDispatch>()
const useAppSelector = useSelector.withTypes<RootState>()

export { persistor, useAppDispatch, useAppSelector }
export default storeRedux
