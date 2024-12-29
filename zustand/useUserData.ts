import { devtools, persist } from 'zustand/middleware'
import { createStore } from 'zustand'
import { INIT_ZUSTAND, TYPE_ZUSTAND, ZUSTAND } from '@/constant/zustand'
import secureLocalStorage from 'react-secure-storage'
import { decryptData } from '@/utils/crypto'

type UserDataStoreState = { [ZUSTAND.UserData]: TYPE_ZUSTAND[ZUSTAND.UserData] }

type UserDataStoreActions = {
  setUserData: (nextUserData: UserDataStoreState[ZUSTAND.UserData]) => void
  reset: () => void
  loadDataLocal: () => void
}

type UserDataStore = UserDataStoreState & UserDataStoreActions

const zustandUserData = createStore<UserDataStore>()(
  devtools(
    persist(
      (set) => ({
        [ZUSTAND.UserData]: INIT_ZUSTAND[ZUSTAND.UserData],
        setUserData: (user: TYPE_ZUSTAND[ZUSTAND.UserData]) => set({ [ZUSTAND.UserData]: user }),
        reset: () => set({ [ZUSTAND.UserData]: INIT_ZUSTAND[ZUSTAND.UserData] }),
        loadDataLocal: () => {
          const dataSecure = secureLocalStorage.getItem(ZUSTAND.UserData)

          if (dataSecure) {
            const dataDecode = decryptData(dataSecure.toString())
            set({ [ZUSTAND.UserData]: JSON.parse(dataDecode) })
          }
        },
      }),
      {
        name: `zustand-${ZUSTAND.UserData}`,
        storage: {
          getItem: () => {
            const dataSecure = secureLocalStorage.getItem(ZUSTAND.UserData)

            if (dataSecure) {
              const dataDecode = decryptData(dataSecure.toString())
              return JSON.parse(dataDecode)
            }
            return null
          },
          removeItem: () => null,
          setItem: () => null,
        },
      }
    ),
    {
      name: `zustand-${ZUSTAND.UserData}`,
      enabled: process.env.NODE_ENV !== 'production',
    }
  )
)

export const useUserData = () => {
  const userData = zustandUserData.getState()[ZUSTAND.UserData]
  const setUserData = zustandUserData.getState().setUserData
  const reset = zustandUserData.getState().reset
  const loadDataLocal = zustandUserData.getState().loadDataLocal

  return {
    userData,
    setUserData,
    reset,
    loadDataLocal,
  }
}
