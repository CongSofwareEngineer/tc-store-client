import { ModalContext } from '@/components/MyModal'
import { ConfigModal } from '@/components/MyModal/type'
import { useContext, useCallback } from 'react';
import useMedia from './useMedia'
import { ConfigMyDrawerType, DrawerContext } from '@/components/DrawerProvider/config';
import React from 'react';

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

  const openModalDrawer = useCallback((config: UseModalType) => {
    if (config.onlyDrawer) {
      openDrawer({
        content: config.content,
        ...config.configDrawer,
        title: config.configDrawer?.title || config.title

      })
    } else {
      if (isMobile && config.useDrawer) {
        openDrawer({
          content: config.content,
          ...config.configDrawer,
          title: config.configDrawer?.title || config.title
        })
      } else {
        open({
          ...config.configModal,
          title: config.configModal?.title || config.title,
          content: config.content,
          showBtnClose: config?.configModal?.showBtnClose === false ? false : config?.configModal?.overClickClose,
          open: true
        })
      }
    }
  }, [open, isMobile, openDrawer])

  const closeModalDrawer = useCallback(() => {
    if (configDrawer.open) {
      closeDrawer()
    } else {
      closeModal()
    }
  }, [closeModal, closeDrawer, configDrawer])


  return {
    openModalDrawer,
    closeModalDrawer
  }
}

export default useModalDrawer
