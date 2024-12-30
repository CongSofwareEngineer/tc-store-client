import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
import { INIT_ZUSTAND, TYPE_ZUSTAND, ZUSTAND } from '@/constant/zustand'

type ModalAdminData = TYPE_ZUSTAND[typeof ZUSTAND.ModalAdmin]

type ModalAdminStoreState = { [ZUSTAND.ModalAdmin]: ModalAdminData }

type ModalAdminStoreActions = {
  setModalAdmin: (nextModalAdmin: ModalAdminStoreState[ZUSTAND.ModalAdmin]) => void
  openModal: (nextModalAdmin: ModalAdminStoreState[ZUSTAND.ModalAdmin]) => void
  closeModal: () => void
}

type ModalAdminStore = ModalAdminStoreState & ModalAdminStoreActions

const zustandModalAdmin = create<ModalAdminStore>()(
  devtools(
    (set) => ({
      [ZUSTAND.ModalAdmin]: INIT_ZUSTAND[ZUSTAND.ModalAdmin],
      setModalAdmin: (param: ModalAdminData) => set({ [ZUSTAND.ModalAdmin]: param }),
      openModal: (param: ModalAdminData) => {
        set((state) => ({
          [ZUSTAND.ModalAdmin]: {
            ...state,
            ...param,
            open: true,
          },
        }))
      },
      closeModal: () => {
        set({
          [ZUSTAND.ModalAdmin]: {
            ...INIT_ZUSTAND[ZUSTAND.ModalAdmin],
            open: false,
          },
        })
      },
    }),
    {
      name: `zustand-${ZUSTAND.ModalAdmin}`,
      enabled: process.env.NEXT_PUBLIC_DISABLE_DEV === 'true',
    }
  )
)

export const useModalAdmin = () => {
  const modalAdmin = zustandModalAdmin((state) => state[ZUSTAND.ModalAdmin])
  const setModalAdmin = zustandModalAdmin((state) => state.setModalAdmin)
  const closeModal = zustandModalAdmin((state) => state.closeModal)
  const openModal = zustandModalAdmin((state) => state.openModal)

  return {
    modalAdmin,
    setModalAdmin,
    openModal,
    closeModal,
  }
}
