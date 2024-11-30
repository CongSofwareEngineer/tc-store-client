import { ModalContext } from '@/components/MyModal'
import { ConfigModal } from '@/components/MyModal/type'
import { useContext } from 'react'
import useMedia from './useMedia'

import React from 'react'
import { ConfigMyDrawerType, DrawerContext } from '@/components/DrawerProvider/config'

type UseModalType = {
  useDrawer?: boolean | false
  onlyDrawer?: boolean | false
  configModal?: ConfigModal
  configDrawer?: ConfigMyDrawerType
  content: React.ReactNode
  title?: string | React.ReactNode | undefined
}

const useModalDrawer = () => {
  const { closeModal, openModal: open } = useContext(ModalContext)
  const { closeDrawer, openDrawer, config: configDrawer } = useContext(DrawerContext)
  const { isMobile } = useMedia()

  const openModalDrawer = (config: UseModalType) => {
    const configDrawerBase: ConfigMyDrawerType = {
      content: config.content,
      placement: 'bottom',
      height: 'auto',
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
          ...config.configModal,
          title: config.configModal?.title || config.title,
          content: config.content,
          showBtnClose: config?.configModal?.showBtnClose === false ? false : config?.configModal?.overClickClose,
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

export default useModalDrawer
