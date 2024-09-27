import { images } from '@/configs/images'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import type { ImageProps } from 'next/image'
import React from 'react'
import styled from 'styled-components'
type ImageType = {
  heightImage?: string
  widthImage?: string
  src?: string | undefined | StaticImport
  positionImg?: 'relative' | 'absolute' | 'fixed'
} & ImageProps

const ImageCustom = styled(Image)<{
  $positionImg?: string
  $height?: string
  $width?: string
}>`
  position: ${(props) => props.$positionImg} !important;
  height: ${(props) => props.$height} !important;
  width: ${(props) => props.$width} !important;
`

const MyImage = ({
  heightImage = 'auto',
  widthImage = '100%',
  src = '',
  positionImg = 'relative',
  ...props
}: ImageType) => {
  return (
    <ImageCustom
      $positionImg={positionImg}
      src={src || images.userDetail.iconUserDetail}
      $height={heightImage}
      $width={widthImage}
      fill
      {...props}
    />
  )
}

export default MyImage
