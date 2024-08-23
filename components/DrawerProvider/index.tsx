'use client'
import { Drawer } from 'antd'
import React, { useState } from 'react'
import { ConfigMyDrawerType, DrawerContext, defaultConfig } from './config'
import useMedia from '@/hook/useMedia'

const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<ConfigMyDrawerType>(defaultConfig)
  const { isClient } = useMedia()
  const closeDrawer = () => {
    setConfig({ ...config, content: null, open: false })
  }

  const openDrawer = (config?: ConfigMyDrawerType) => {
    setConfig((state) => ({ ...state, ...config, open: true }))
  }

  return (
    <DrawerContext.Provider value={{ config, closeDrawer, openDrawer }}>
      {children}
      {isClient && (
        <Drawer
          onClose={closeDrawer}
          className={`max-h-[${
            config.placement === 'right' || config.placement === 'left'
              ? 'unset'
              : '85vh'
          }]`}
          {...config}
        >
          {config.content ?? <></>}
        </Drawer>
      )}
    </DrawerContext.Provider>
  )
}

export default DrawerProvider
