import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
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

const zustandUserData = create<UserDataStore>()(
  devtools(
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
      enabled: process.env.NODE_ENV !== 'production',
    },
  ),
)

export const useUserData = () => {
  const userData = zustandUserData((state) => state[ZUSTAND.UserData])
  const setUserData = zustandUserData((state) => state.setUserData)
  const reset = zustandUserData((state) => state.reset)
  const loadDataLocal = zustandUserData((state) => state.loadDataLocal)

  return {
    userData,
    setUserData,
    reset,
    loadDataLocal,
  }
}
