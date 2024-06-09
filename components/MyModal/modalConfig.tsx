import React from 'react'
import { ModalProps } from './type'
import { Modal } from 'antd'

const ModalConfig = ({ config, closeModal }: ModalProps) => {
  return (
    <Modal
      title={config?.title || <></>}
      open={config?.open || false}
      onCancel={closeModal}
      footer={<></>}
      centered
      {...config}
      closable={config.showBtnClose}
      keyboard={config?.overClickClose}
      maskClosable={config?.overClickClose}>
      <div className={`w-full h-full ${config?.classContent}`}>
        {config?.content}
      </div>
    </Modal>
  )
}

export default ModalConfig
