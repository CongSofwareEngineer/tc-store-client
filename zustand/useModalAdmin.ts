import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
import { INIT_ZUSTAND, ZUSTAND } from '@/constants/zustand'

type IModalAdmin = {
  open?: boolean
  body?: React.ReactNode
  className?: string
  classNameContent?: string
  width?: string
  height?: string
  onCloseAfter?: (param?: any) => any
  onClose?: () => any
  title?: React.ReactNode
  showBtnClose?: boolean
  overClickClose?: boolean
  position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

type ModalAdminStore = {
  [ZUSTAND.ModalAdmin]: IModalAdmin
  setModalAdmin: (nextModalAdmin: IModalAdmin) => void
  openModal: (nextModalAdmin: IModalAdmin) => void
  closeModal: (isIconClose?: boolean) => void
}

const zustandModalAdmin = create<ModalAdminStore>()(
  devtools(
    (set) => ({
      [ZUSTAND.ModalAdmin]: INIT_ZUSTAND[ZUSTAND.ModalAdmin],
      setModalAdmin: (param: IModalAdmin) => set({ [ZUSTAND.ModalAdmin]: param }),
      openModal: (param: IModalAdmin) => {
        set({
          [ZUSTAND.ModalAdmin]: {
            showBtnClose: true,
            position: 'center',
            overClickClose: true,
            ...param,
            open: true,
          },
        })
      },
      closeModal: (isIconClose: boolean = false) => {
        set((state) => {
          if (!isIconClose) {
            if (state?.[ZUSTAND.ModalAdmin]?.onCloseAfter) {
              state?.[ZUSTAND.ModalAdmin].onCloseAfter()
            }
          }
          return {
            [ZUSTAND.ModalAdmin]: INIT_ZUSTAND[ZUSTAND.ModalAdmin],
          }
        })
      },
    }),
    {
      name: `zustand-${ZUSTAND.ModalAdmin}`,
      enabled: process.env.NEXT_PUBLIC_ENV !== 'production',
    }
  )
)

export const useModalAdmin = () => {
  return zustandModalAdmin((state) => state)
}
