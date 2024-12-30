'use client'

import useMedia from '@/hook/useMedia'
import { useModal } from '@/zustand/useModal'
import { Modal } from 'antd'

const MyModalProvider = () => {
  const { isClient } = useMedia()
  const { modal, closeModal } = useModal()

  if (!isClient) {
    return <></>
  }

  return (
    <Modal
      title={modal?.title || <></>}
      open={modal?.open || false}
      onCancel={closeModal}
      footer={<></>}
      centered
      {...modal}
      closable={modal.showBtnClose}
      keyboard={modal?.overClickClose}
      maskClosable={modal?.overClickClose}
    >
      <div className={`w-full h-full max-h-[90dvh]  overflow-y-auto ${modal?.classContent}`}>
        {modal?.content}
      </div>
    </Modal>
  )
}

export default MyModalProvider
