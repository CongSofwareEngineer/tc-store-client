import { images } from '@/configs/images'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import type { ImageProps } from 'next/image'
import React from 'react'
type ImageType = {
  src?: string | undefined | StaticImport
  className?: string
  position?: 'relative' | 'absolute'
  widthImg?: string
  heightImg?: string
} & ImageProps

const MyImage = ({
  className = '',
  src = '',
  position = 'relative',
  widthImg = 'full',
  heightImg = 'auto',
  ...props
}: ImageType) => {
  return (
    <Image
      src={src || images.userDetail.iconUserDetail}
      fill
      {...props}
      className={`!${position} !h-${heightImg} !w-${widthImg} ${className}`}
    />
  )
}

export default MyImage
