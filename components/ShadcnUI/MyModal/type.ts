import { createContext } from "react"

export type ConfigModal = {
  className?: string | 'w-[500px]'
  title?: React.ReactNode | string | undefined
  content?: React.ReactNode
  open?: boolean
  width?: string
  height?: string
  maxHeight?: string
}

export type ModalContextProps = {
  config: ConfigModal
  closeModal: () => void
  openModal: (param?: ConfigModal) => void
}

const defaultValue: ModalContextProps = {
  config: {
    content: null,
    width: 'w-screen',
    height: 'auto',
    maxHeight: '98vh',
  },
  closeModal: () => { },
  openModal: () => { },
}

export const defaultConfig: ConfigModal = {
  className: 'w-[500px]',
  title: 'Modal',
  content: null,
}


export const ModalContext = createContext<ModalContextProps>(defaultValue)
