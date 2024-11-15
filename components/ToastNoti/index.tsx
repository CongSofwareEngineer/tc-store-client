import useMedia from '@/hook/useMedia'
import React from 'react'
import { ToastContainer } from 'react-toastify'

const ToastNoti = () => {
  const { isMobile } = useMedia()

  return (
    <ToastContainer
      className={'mb-3'}
      style={{ marginTop: isMobile ? 65 : 42 }}
    />
  )
}

export default ToastNoti
