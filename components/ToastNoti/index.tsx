import useMedia from '@/hook/useMedia'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from '../ui/button'

const ToastNoti = () => {
  const { isMobile } = useMedia()

  return <>
  <ToastContainer className={'mb-3'} style={{ marginTop: isMobile ? 65 : 42 }} />
  <Button className='bg-green-500' >
      sadasd
  </Button>
  </>
}

export default ToastNoti
