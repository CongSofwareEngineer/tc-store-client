import Image from 'next/image'
import type { ImageProps } from 'next/image'
import React from 'react'
import styled from 'styled-components'
const ImageCustom = styled(Image)`
  position: relative !important;
`
type ImageType = {
  className: string | ''
  alt: string
  src: string | URL
} & ImageProps

const MyImage = ({
  className = '',
  alt = '',
  src = '',
  ...props
}: ImageType) => {
  return (
    <ImageCustom className={className} fill alt={alt} src={src} {...props} />
  )
}

export default MyImage
