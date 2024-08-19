'use client'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import useAos from '@/hook/useAos'
import useMedia from '@/hook/useMedia'
import { useRouter } from 'next/router'
import React from 'react'

const ContactScreen = () => {
  useAos()
  const { isMobile } = useMedia()
  const router = useRouter()

  return (
    <div className="flex flex-col justify-center w-full gap-2">
      <h1>Liên hệ</h1>
      <h2 className="opacity-0 h-0 w-0 overflow-hidden absolute -z-10">
        Liên hệ với Shop nếu cần có thắc mắc cũng như muốn hợp tác với Shop
      </h2>
      <div className="w-full flex justify-between h-full items-center">
        {!isMobile && (
          <div
            data-aos="fade-right"
            className="flex-1 flex flex-col justify-center items-center max-w-[450px]"
          >
            <MyImage
              alt={'tc-store-logo-register'}
              className="cursor-pointer max-w-0["
              onClick={() => router.push('/')}
              src={images.logoStore}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ContactScreen
