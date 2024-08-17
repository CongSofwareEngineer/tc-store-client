'use client'
import { DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Dialog, DialogTitle } from '@radix-ui/react-dialog'
import React, { useState } from 'react'
import { ConfigModal, defaultConfig, ModalContext } from './type'

const MyModalShadcnUI = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<ConfigModal>(defaultConfig)

  const closeModal = () => {
    setConfig({ ...config, width: '500px', content: null, open: false })
  }

  const openModal = (config?: ConfigModal) => {
    setConfig((state) => ({ ...state, width: '500', ...config, open: true }))
  }

  const onChangeOpen = (value: boolean) => {
    setConfig((state) => ({ ...state, width: '500px', open: value }))
  }

  return (
    <ModalContext.Provider value={{ closeModal, config, openModal }}>
      {children}
      <Dialog open={config?.open} onOpenChange={onChangeOpen}>
        <DialogContent style={{ width: config?.width }}>
          {config.title && (
            <DialogHeader>
              <DialogTitle>{config.title}</DialogTitle>
            </DialogHeader>
          )}

          {config?.content && config?.content}
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  )
}

export default MyModalShadcnUI
