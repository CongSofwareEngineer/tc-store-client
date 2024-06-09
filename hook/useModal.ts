import { ModalContext } from '@/components/MyModal'
import { ConfigModal } from '@/components/MyModal/type'
import { useContext } from 'react'

const useModal = () => {
  const { closeModal, openModal: open } = useContext(ModalContext)

  const openModal = (config: ConfigModal) => {
    open({
      ...config,
      showBtnClose: config.showBtnClose === false ? false : config.overClickClose,
      open: true
    })
  }

  return {
    openModal,
    closeModal
  }
}

export default useModal
