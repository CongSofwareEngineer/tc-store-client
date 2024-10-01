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
          style={{
            maxHeight:
              config.placement === 'right' || config.placement === 'left'
                ? 'unset'
                : '95dvh',
          }}
          {...config}
        >
          <div
            className="flex flex-col w-full"
            style={{
              maxHeight:
                config.placement === 'right' || config.placement === 'left'
                  ? 'calc(100dvh - 100px)'
                  : 'calc(95dvh - 100px)',
            }}
          >
            {config.content ?? <></>}
          </div>
        </Drawer>
      )}
    </DrawerContext.Provider>
  )
}

export default DrawerProvider
