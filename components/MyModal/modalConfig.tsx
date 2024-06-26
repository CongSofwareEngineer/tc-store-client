import React from 'react'
import { ModalPropsType } from './type'
import { Modal } from 'antd'

const ModalConfig = ({ config, closeModal }: ModalPropsType) => {
  return config?.content ? (
    <Modal
      title={config?.title || <></>}
      open={config?.open || false}
      onCancel={closeModal}
      footer={<></>}
      centered
      {...config}
      closable={config.showBtnClose}
      keyboard={config?.overClickClose}
      maskClosable={config?.overClickClose}
    >
      <div
        className={`w-full h-full max-h-[calc(90vh-70px)] overflow-y-auto ${config?.classContent}`}
      >
        {config?.content}
      </div>
    </Modal>
  ) : (
    <></>
  )
}

export default ModalConfig
