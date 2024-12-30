import { persist, devtools } from 'zustand/middleware'

import { create } from 'zustand'

import { INIT_ZUSTAND, ZUSTAND } from '@/constant/zustand'

type LanguageStoreState = { [ZUSTAND.Language]: { locale: string; messages: any } }

type LanguageStoreActions = {
  setLanguage: (nextLanguage: LanguageStoreState[ZUSTAND.Language]) => void
}

type LanguageStore = LanguageStoreState & LanguageStoreActions

export const zustandLanguage = create<LanguageStore>()(
  devtools(
    persist(
      (set) => ({
        [ZUSTAND.Language]: INIT_ZUSTAND[ZUSTAND.Language],
        setLanguage: (language) => set({ [ZUSTAND.Language]: language }),
      }),
      {
        name: ZUSTAND.Language,
      }
    ),
    {
      name: `zustand-${ZUSTAND.Language}`,
      enabled: process.env.NEXT_PUBLIC_DISABLE_DEV === undefined,
    }
  )
)

export const useLanguage = () => {
  const data = zustandLanguage((state) => state[ZUSTAND.Language])
  const setLanguage = zustandLanguage((state) => state.setLanguage)
  return {
    language: data,
    setLanguage,
  }
}
