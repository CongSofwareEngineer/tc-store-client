'use client'
import React, { useState } from 'react'
import { ConfigMyDrawerType, defaultConfig, DrawerContext } from './config'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import MyButton from '../MyButton'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import { CloseOutlined } from '@ant-design/icons'

const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const { translate } = useLanguage()
  const { isMobile, isClient } = useMedia()

  const [config, setConfig] = useState<ConfigMyDrawerType>(defaultConfig)

  const closeDrawer = () => {
    setConfig({ ...config, content: null, open: false, position: 'bottom' })
  }

  const openDrawer = (config?: ConfigMyDrawerType) => {
    setConfig((state) => ({ ...state, ...config, open: true }))
  }

  const onChangeOpen = (value: boolean) => {
    setConfig((state) => ({ ...state, open: value }))
  }

  const classNameContent = () => {
    if (config?.position == 'right' || config?.position == 'left') {
      return 'relative h-screen top-0 right-0 left-auto mt-0 w-auto rounded-none overflow-y-auto  md:px-12 px-3 py-2'
    }
    return 'relative w-screen overflow-y-auto max-h-[calc(100%-20px)] md:px-12 px-5'
  }

  const classNameContainerContent = () => {
    if (config?.position == 'right') {
      return 'h-screen top-0 right-0 left-auto mt-0 w-auto rounded-none'
    }
    return 'max-h-[98vh]'
  }

  return (
    <DrawerContext.Provider value={{ config, closeDrawer, openDrawer }}>
      {children}
      {isClient && (
        <Drawer
          preventScrollRestoration
          fixed
          direction={config?.position}
          onOpenChange={onChangeOpen}
          open={config?.open}
        >
          <DrawerContent className={`bg-white  ${classNameContainerContent()}`}>
            {config?.position === 'bottom' && (
              <div className="mx-auto mt-[5px] h-[5px] w-[100px] rounded-full bg-black/40" />
            )}
            {config?.title && (
              <div className="text-medium font-bold flex w-full justify-center items-center pt-2 md:px-12 px-3 pb-2 mb-1 border-b-2 border-b-gray-200">
                {isMobile && config?.position !== 'bottom' && (
                  <CloseOutlined onClick={closeDrawer} />
                )}
                <div className="flex-1 flex text-center justify-center items-center">
                  {config?.title}
                </div>
              </div>
            )}
            <div
              className={`pb-3 ${classNameContent()} ${config.className}`}
              style={{ width: config?.width, maxHeight: config?.maxHeight }}
            >
              {config?.content || <></>}
            </div>
            {config?.configFooter && (
              <div className="flex gap-3 md:px-12 px-5 pb-3">
                <MyButton
                  size={isMobile ? 'small' : 'default'}
                  className="w-full"
                  onClick={async () => {
                    if (config?.configFooter?.callBackSubmit) {
                      await config?.configFooter?.callBackSubmit()
                    }
                    closeDrawer()
                  }}
                >
                  {config?.configFooter?.titelSubmit || translate('common.ok')}
                </MyButton>

                {(config?.configFooter?.showFull ||
                  config?.configFooter?.showClose) && (
                  <MyButton
                    size={isMobile ? 'small' : 'default'}
                    className="w-full"
                    typeBtn={'secondary'}
                    onClick={async () => {
                      if (config?.configFooter?.callBackClose) {
                        await config?.configFooter?.callBackClose()
                      }
                      closeDrawer()
                    }}
                  >
                    {config?.configFooter?.titelSubmit ||
                      translate('common.close')}
                  </MyButton>
                )}
              </div>
            )}
          </DrawerContent>
        </Drawer>
      )}
    </DrawerContext.Provider>
  )
}

export default DrawerProvider
