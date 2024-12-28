'use client'
import { Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import { ConfigMyDrawerType, DrawerContext, defaultConfig } from './config'
import useMedia from '@/hook/useMedia'
import { isIOS } from 'react-device-detect'

const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<ConfigMyDrawerType>(defaultConfig)
  const { isClient } = useMedia()

  useEffect(() => {
    if (config.content) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [config])

  const closeDrawer = () => {
    if (config?.afterClose) {
      config.afterClose()
    }
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
              config.placement === 'right' || config.placement === 'left' ? 'unset' : '95dvh',
          }}
          {...config}
        >
          <div
            className='flex flex-col w-full'
            style={{
              maxHeight:
                config.placement === 'right' || config.placement === 'left'
                  ? 'calc(100dvh - 100px)'
                  : 'calc(95dvh - 100px)',
              height: 'auto',
            }}
          >
            {config.content ?? <></>}
            {isIOS && <div className='w-full mb-1' />}
          </div>
        </Drawer>
      )}
    </DrawerContext.Provider>
  )
}

export default DrawerProvider
