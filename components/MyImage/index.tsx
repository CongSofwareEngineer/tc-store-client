import Image from 'next/image'
import type { ImageProps } from 'next/image'
import React from 'react'
import styled from 'styled-components'
type ImageType = {
  heightImage?: string
  widthImage?: string
} & ImageProps

const ImageCustom = styled(Image)<{ $height?: string; $width?: string }>`
  position: relative !important;
  height: ${(props) => props.$height} !important;
  width: ${(props) => props.$width} !important;
`

const MyImage = ({
  heightImage = 'max-content',
  widthImage = '100%',
  ...props
}: ImageType) => {
  return (
    <ImageCustom $height={heightImage} $width={widthImage} fill {...props} />
  )
}

export default MyImage
