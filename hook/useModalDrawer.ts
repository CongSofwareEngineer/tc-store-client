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
  configDrawer?: ConfigMyDrawerType,
  content: React.ReactNode
}

const useModalDrawer = () => {
  const { closeModal, openModal: open } = useContext(ModalContext)
  const { closeDrawer, openDrawer } = useContext(DrawerContext)
  const { isMobile } = useMedia()

  const openModalDrawer = useCallback((config: UseModalType) => {
    if (config.onlyDrawer) {
      openDrawer({
        content: config.content,
        ...config.configDrawer
      })
    } else {
      if (isMobile && config.useDrawer) {
        openDrawer({
          content: config.content,
          ...config.configDrawer
        })
      } else {
        open({
          ...config.configModal,
          content: config.content,
          showBtnClose: config?.configModal?.showBtnClose === false ? false : config?.configModal?.overClickClose,
          open: true
        })
      }
    }
  }, [open, isMobile, openDrawer])

  const closeModalDrawer = useCallback(() => {
    closeModal()
    closeDrawer()
  }, [closeModal, closeDrawer])


  return {
    openModalDrawer,
    closeModalDrawer
  }
}

export default useModalDrawer
