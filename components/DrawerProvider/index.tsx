'use client'
import { Drawer } from 'antd'
import React, { useState } from 'react'
import { ConfigMyDrawerType, DrawerContext, defaultConfig } from './config'

const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<ConfigMyDrawerType>(defaultConfig)

  const closeDrawer = () => {
    setConfig({ ...config, content: null, open: false })
  }

  const openDrawer = (config?: ConfigMyDrawerType) => {
    setConfig((state) => ({ ...state, ...config, open: true }))
  }

  return (
    <DrawerContext.Provider value={{ config, closeDrawer, openDrawer }}>
      {children}
      <Drawer onClose={closeDrawer} {...config}>
        {config.content ?? <></>}
      </Drawer>
    </DrawerContext.Provider>
  )
}

export default DrawerProvider
