import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
import { INIT_ZUSTAND, TYPE_ZUSTAND, ZUSTAND } from '@/constant/zustand'

export type ModalData = TYPE_ZUSTAND[typeof ZUSTAND.Modal]

type ModalStoreState = { [ZUSTAND.Modal]: ModalData }

type ModalStoreActions = {
  openModal: (nextModal: ModalStoreState[ZUSTAND.Modal]) => void
  closeModal: () => void
}

type ModalStore = ModalStoreState & ModalStoreActions

const zustandModal = create<ModalStore>()(
  devtools(
    (set) => ({
      [ZUSTAND.Modal]: INIT_ZUSTAND[ZUSTAND.Modal],
      openModal: (param: ModalData) => set({ [ZUSTAND.Modal]: param }),
      closeModal: () => {
        set({
          [ZUSTAND.Modal]: {
            width: '500px',
            className: '',
            content: null,
            open: false,
          },
        })
      },
    }),
    {
      name: `zustand-${ZUSTAND.Modal}`,
      enabled: process.env.NEXT_PUBLIC_DISABLE_DEV === undefined,
    }
  )
)

export const useModal = () => {
  const modal = zustandModal((state) => state[ZUSTAND.Modal])
  const closeModal = zustandModal((state) => state.closeModal)
  const openModal = zustandModal((state) => state.openModal)

  return {
    modal,
    openModal,
    closeModal,
  }
}
