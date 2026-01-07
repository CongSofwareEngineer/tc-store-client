import { cn } from '@/utils/tailwind'
import { useModal } from '@/zustand/useModal'
import { Modal } from '@mantine/core'

const MyModal = () => {
  const { modal, closeModal } = useModal()

  return (
    <Modal
      centered
      closeOnClickOutside={modal?.overClickClose}
      closeOnEscape={modal?.overClickClose}
      opened={modal?.open!}
      size={modal.width || 500}
      styles={{
        header: {
          minHeight: modal?.title ? 45 : 20,
          paddingBottom: 0,
          paddingTop: 0,
        },
      }}
      title={modal?.open ? modal?.title || <></> : <></>}
      withCloseButton={modal.showBtnClose}
      onClose={() => {
        closeModal()
        if (modal?.onClose) {
          modal.onClose()
        }
      }}
    >
      <div className={cn('w-full h-full max-h-[90dvh]  overflow-y-auto ', modal?.classContent)}>{modal?.content}</div>
    </Modal>
  )
}

export default MyModal
