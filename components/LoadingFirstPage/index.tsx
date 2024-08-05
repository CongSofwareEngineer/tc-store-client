'use client'
import React, { useEffect, useState } from 'react'

const LoadingFirstPage = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return isClient ? (
    <></>
  ) : (
    <div className="bg-white z-[999999999] flex w-screen h-screen fixed justify-center items-center inset-0">
      <iframe src="https://lottie.host/embed/1ab2ebfc-a8ca-4bc7-9442-60730846ab8b/7LAWUClNe2.json"></iframe>
    </div>
  )
}

export default LoadingFirstPage
