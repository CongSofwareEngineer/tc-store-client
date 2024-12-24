import { persist, devtools } from 'zustand/middleware'
import { create } from 'zustand'
import { INIT_ZUSTAND, TYPE_ZUSTAND, ZUSTAND } from '@/constant/zustand'

type UserDataStoreState = { [ZUSTAND.UserData]: TYPE_ZUSTAND[ZUSTAND.UserData] }

type UserDataStoreActions = {
  setUserData: (nextUserData: UserDataStoreState[ZUSTAND.UserData]) => void
  reset: () => void
}

type UserDataStore = UserDataStoreState & UserDataStoreActions

const zustandUserData = create<UserDataStore>()(
  devtools(
    (set) => ({
      [ZUSTAND.UserData]: INIT_ZUSTAND[ZUSTAND.UserData],
      setUserData: (user: TYPE_ZUSTAND[ZUSTAND.UserData]) => set({ [ZUSTAND.UserData]: user }),
      reset: () => set({ [ZUSTAND.UserData]: INIT_ZUSTAND[ZUSTAND.UserData] }),
    }),
    { name: ZUSTAND.UserData },
  ),
)

export const useUserData = () => {
  const data = zustandUserData((state) => state[ZUSTAND.UserData])
  const setUserData = zustandUserData((state) => state.setUserData)
  const reset = zustandUserData((state) => state.reset)

  return {
    userData: data,
    setUserData,
    reset,
  }
}
