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
} & ImageProps

const ImageCustom = styled(Image)<{ $height?: string; $width?: string }>`
  position: relative !important;
  height: ${(props) => props.$height} !important;
  width: ${(props) => props.$width} !important;
`

const MyImage = ({
  heightImage = 'fit-content',
  widthImage = '100%',
  src = '',
  ...props
}: ImageType) => {
  return (
    <ImageCustom
      src={src || images.userDetail.iconUserDetail}
      $height={heightImage}
      $width={widthImage}
      fill
      {...props}
    />
  )
}

export default MyImage
