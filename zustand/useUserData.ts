import { devtools, persist } from 'zustand/middleware'
import { create } from 'zustand'
import secureLocalStorage from 'react-secure-storage'

import { INIT_ZUSTAND, TYPE_ZUSTAND, ZUSTAND } from '@/constants/zustand'
import { decryptData } from '@/utils/crypto'

type UserDataStore = {
  setUserData: (nextUserData: TYPE_ZUSTAND[ZUSTAND.UserData]) => void
  setConnecting: (connecting: boolean) => void
  [ZUSTAND.UserData]: TYPE_ZUSTAND[ZUSTAND.UserData]
  connecting: boolean
}

const zustandUserData = create<UserDataStore>()(
  devtools(
    persist(
      (set) => ({
        connecting: true,
        [ZUSTAND.UserData]: INIT_ZUSTAND[ZUSTAND.UserData],
        setConnecting: (connecting: boolean) => set({ connecting }),
        setUserData: (user: TYPE_ZUSTAND[ZUSTAND.UserData]) => {
          set({
            [ZUSTAND.UserData]: user,
            connecting: false,
          })
        },
      }),
      {
        onRehydrateStorage: (state) => {
          const dataSecure = secureLocalStorage.getItem(ZUSTAND.UserData)

          if (dataSecure) {
            const dataDecode = decryptData(dataSecure.toString())

            state[ZUSTAND.UserData] = JSON.parse(dataDecode)
            state.connecting = false
          }
        },
        name: `zustand-${ZUSTAND.UserData}`,
        storage: {
          getItem: () => null,
          removeItem: () => {},
          setItem: () => {},
        },
      }
    ),
    {
      name: `zustand-${ZUSTAND.UserData}`,
      enabled: process.env.NEXT_PUBLIC_ENV !== 'production',
    }
  )
)

export const useUserData = () => {
  return zustandUserData((state) => state)
}
