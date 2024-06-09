'use client'
import React, { useLayoutEffect, useState } from 'react'
import { Spin } from 'antd'

const LoadingFirstPage = () => {
  const [isClient, setIsClient] = useState(false)
  useLayoutEffect(() => {
    setIsClient(true)
  }, [])
  return !isClient ? (
    <div className="bg-black z-[100] flex w-screen h-screen fixed justify-center items-center">
      <Spin />
    </div>
  ) : (
    <></>
  )
}

export default LoadingFirstPage
