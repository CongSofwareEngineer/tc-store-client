'use client'
import React, { useLayoutEffect, useState } from 'react'
import { Spin } from 'antd'
import { ToastContainer } from 'react-toastify'
import useMedia from '@/hook/useMedia'

const LoadingFirstPage = () => {
  const { isMobile } = useMedia()

  const [isClient, setIsClient] = useState(false)
  useLayoutEffect(() => {
    setIsClient(true)
  }, [])
  return !isClient ? (
    <div className="bg-white z-[999999999] flex w-screen h-screen fixed justify-center items-center inset-0">
      <Spin />
    </div>
  ) : (
    <ToastContainer
      className={'mb-3'}
      style={{ marginTop: isMobile ? 65 : 0 }}
    />
  )
}

export default LoadingFirstPage
