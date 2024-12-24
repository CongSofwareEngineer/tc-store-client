import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
import { INIT_ZUSTAND, TYPE_ZUSTAND, ZUSTAND } from '@/constant/zustand'

type ModalAdminStoreState = { [ZUSTAND.ModalAdmin]: TYPE_ZUSTAND[ZUSTAND.ModalAdmin] }

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
      setModalAdmin: (param: TYPE_ZUSTAND[ZUSTAND.ModalAdmin]) => set({ [ZUSTAND.ModalAdmin]: param }),
      openModal: (param: TYPE_ZUSTAND[ZUSTAND.ModalAdmin]) => {
        const {
          title = '',
          open = true,
          body,
          className = '',
          width = '500px',
          height = '',
          callBackAfter = () => {},
          classNameContent = '',
          overClickClose = false,
          showBtnClose = true,
        } = param

        set({
          [ZUSTAND.ModalAdmin]: {
            open,
            body,
            className,
            width,
            height,
            callBackAfter,
            title,
            classNameContent,
            overClickClose,
            showBtnClose,
          },
        })
      },
      closeModal: () => {
        const config = {
          open: false,
          body: null,
          className: '',
          width: '500px',
          height: 'auto',
          classNameContent: '',
          overClickClose: true,
          title: '',
          showBtnClose: true,
        }
        set({
          [ZUSTAND.ModalAdmin]: config,
        })
      },
    }),
    {
      name: `zustand-$${ZUSTAND.ModalAdmin}`,
      enabled: process.env.NODE_ENV !== 'production',
    },
  ),
)

export const useModalAdmin = () => {
  const data = zustandModalAdmin((state) => state[ZUSTAND.ModalAdmin])
  const setModalAdmin = zustandModalAdmin((state) => state.setModalAdmin)
  const closeModal = zustandModalAdmin((state) => state.closeModal)
  const openModal = zustandModalAdmin((state) => state.openModal)

  return {
    modalAdmin: data,
    setModalAdmin,
    openModal,
    closeModal,
  }
}
