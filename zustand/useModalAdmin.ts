import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
import { INIT_ZUSTAND, TYPE_ZUSTAND, ZUSTAND } from '@/constant/zustand'

type ModalAdminStoreState = { [ZUSTAND.ModalAdmin]: TYPE_ZUSTAND[ZUSTAND.ModalAdmin] }

type ModalAdminStoreActions = {
  setModalAdmin: (nextModalAdmin: ModalAdminStoreState[ZUSTAND.ModalAdmin]) => void
}

type ModalAdminStore = ModalAdminStoreState & ModalAdminStoreActions

const zustandModalAdmin = create<ModalAdminStore>()(
  devtools(
    (set) => ({
      [ZUSTAND.ModalAdmin]: INIT_ZUSTAND[ZUSTAND.ModalAdmin],
      setModalAdmin: (user: TYPE_ZUSTAND[ZUSTAND.ModalAdmin]) => set({ [ZUSTAND.ModalAdmin]: user }),
    }),
    { name: ZUSTAND.ModalAdmin },
  ),
)

export const useModalAdmin = () => {
  const data = zustandModalAdmin((state) => state[ZUSTAND.ModalAdmin])
  const setModalAdmin = zustandModalAdmin((state) => state.setModalAdmin)

  return {
    ModalAdmin: data,
    setModalAdmin,
  }
}
