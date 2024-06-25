import { DrawerProps } from "antd"
import React, { createContext } from "react"

export type ConfigMyDrawerType = {
  content?: React.ReactNode
} & DrawerProps

export type MyDrawerContextProps = {
  config: ConfigMyDrawerType,
  closeDrawer: () => void,
  openDrawer: (param?: ConfigMyDrawerType) => void
}

const defaultValue: MyDrawerContextProps = {
  config: {
    content: null,
  },
  closeDrawer: () => { },
  openDrawer: () => { },
}
export const defaultConfig: ConfigMyDrawerType = {
  content: null,
}

export const DrawerContext = createContext<MyDrawerContextProps>(defaultValue)
