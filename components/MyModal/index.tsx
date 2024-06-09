'use client'
import React, { createContext, useState } from 'react'
import ModalConfig from './modalConfig'
import { ConfigModal, ContainerContextProps } from './type'

const defaultValue: ContainerContextProps = {
  config: {
    content: <></>,
  },
  closeModal: () => {},
  openModal: () => {},
}

const defaultConfig: ConfigModal = {
  content: <></>,
  showHeader: true,
}
export const ModalContext = createContext<ContainerContextProps>(defaultValue)

const MyModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<ConfigModal>(defaultConfig)

  const closeModal = () => {
    setConfig({ ...config, open: false })
  }

  const openModal = (config: ConfigModal) => {
    setConfig((state) => ({ ...state, ...config, open: true }))
  }

  return (
    <ModalContext.Provider value={{ config, closeModal, openModal }}>
      {children}
      <ModalConfig config={config} closeModal={closeModal} />
    </ModalContext.Provider>
  )
}

export default MyModalProvider
