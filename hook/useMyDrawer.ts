 import {
  ConfigMyDrawerType,
  DrawerContext,
} from '@/components/ShadcnUI/DrawerProvider/config'
import React, { useContext } from 'react'
import useMedia from './useMedia'
import { ConfigModal, ModalContext } from '@/components/ShadcnUI/MyModal/type'
 type UseModalType = {
  useDrawer?: boolean | false
  onlyDrawer?: boolean | false
  configModal?: ConfigModal
  configDrawer?: ConfigMyDrawerType
  content: React.ReactNode
  title?: string | React.ReactNode | undefined
}

const useMyDrawer = () => {
  const { isMobile } = useMedia()
  const {
    closeDrawer,
    openDrawer,
    config: configDrawer,
  } = useContext(DrawerContext)
  const { closeModal, openModal: open } = useContext(ModalContext)

  const openModalDrawer = (config: UseModalType) => {
    const configDrawerBase: ConfigMyDrawerType = {
      content: config.content,
      position: 'bottom',
      width: '100vw',
      height: 'auto',
      maxHeight: '70vh',
      configFooter: null,
      ...config.configDrawer,
      title: config.configDrawer?.title || config?.title,
    }
    if (config.onlyDrawer) {
      openDrawer(configDrawerBase)
    } else {
      if (isMobile && config.useDrawer) {
        openDrawer(configDrawerBase)
      } else {
        open({
          width:'500px',
          ...config.configModal,
          title: config.configModal?.title || config.title,
          content: config.content, 
          open: true,
        })
      }
    }
  }

  const closeModalDrawer = () => {
    if (configDrawer.open) {
      closeDrawer()
    } else {
      closeModal()
    }
  }

  return {
    openModalDrawer,
    closeModalDrawer,
  }
}

export default useMyDrawer
