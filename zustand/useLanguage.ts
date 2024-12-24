import { persist, devtools } from 'zustand/middleware'

import { create } from 'zustand'
import { SLICE } from '@/constant/redux'
import { INIT_ZUSTAND, ZUSTAND } from '@/constant/zustand'

type LanguageStoreState = { [SLICE.Language]: { locale: string; messages: any } }

type LanguageStoreActions = {
  setLanguage: (nextLanguage: LanguageStoreState[SLICE.Language]) => void
}

type LanguageStore = LanguageStoreState & LanguageStoreActions

const zustandLanguage = create<LanguageStore>()(
  devtools(
    persist(
      (set) => ({
        [SLICE.Language]: INIT_ZUSTAND[ZUSTAND.Language],
        setLanguage: (language) => set({ [SLICE.Language]: language }),
      }),
      {
        name: SLICE.Language,
      },
    ),
    { name: SLICE.Language },
  ),
)

export const useLanguage = () => {
  const data = zustandLanguage((state) => state[SLICE.Language])
  const setLanguage = zustandLanguage((state) => state.setLanguage)
  return {
    language: data,
    setLanguage,
  }
}
