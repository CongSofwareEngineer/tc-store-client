import { cn } from '@/utils/functions'
import { useModal } from '@/zustand/useModal'
import { Modal } from '@mantine/core'

const MyModalProvider = () => {
  const { modal, closeModal } = useModal()

  return (
    <Modal
      title={modal?.title || <></>}
      onClose={() => closeModal()}
      centered
      opened={modal?.open!}
      withCloseButton={modal.showBtnClose}
      closeOnClickOutside={modal?.overClickClose}
      size={modal.width}
    >
      <div className={cn('w-full h-full max-h-[90dvh]  overflow-y-auto ', modal?.classContent)}>
        {modal?.content}
      </div>
    </Modal>
  )
}

export default MyModalProvider
