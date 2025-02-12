'use client'
import React, { useLayoutEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const FirstLoading = () => {
  const [isClient, setIsClient] = useState(false)

  useLayoutEffect(() => {
    setIsClient(true)
  }, [])
  return isClient ? (
    <div className='fixed h-screen w-screen inset-0 bg-white flex justify-center items-center'>
      <AiOutlineLoading3Quarters style={{ fontSize: 20 }} />
    </div>
  ) : (
    <></>
  )
}

export default FirstLoading
