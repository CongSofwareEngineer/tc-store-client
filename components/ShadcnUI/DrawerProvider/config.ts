import React, { createContext } from 'react'

export type ConfigMyDrawerType = {
  content?: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  open?: boolean
  width?: string
  height?: string
  maxHeight?: string
  title?: string | React.ReactNode | undefined
  configFooter?: {
    showFull?: boolean
    showSubmit?: boolean
    showClose?: boolean
    callBackSubmit?: (e?: any) => any
    callBackClose?: (e?: any) => any
    titelSubmit?: string | React.ReactNode | undefined
    titelClose?: string | React.ReactNode | undefined
  } | null
}

export type MyDrawerContextProps = {
  config: ConfigMyDrawerType
  closeDrawer: () => void
  openDrawer: (param?: ConfigMyDrawerType) => void
}

const defaultValue: MyDrawerContextProps = {
  config: {
    content: null,
    position: 'bottom',
    width: 'w-screen',
    height: 'auto',
    maxHeight: '98vh',
  },
  closeDrawer: () => {},
  openDrawer: () => {},
}

export const defaultConfig: ConfigMyDrawerType = {
  content: null,
  position: 'bottom',
  width: 'w-screen',
  height: 'auto',
  configFooter: null,
}

export const DrawerContext = createContext<MyDrawerContextProps>(defaultValue)
