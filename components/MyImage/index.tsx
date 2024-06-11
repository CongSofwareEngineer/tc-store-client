import Image from 'next/image'
import type { ImageProps } from 'next/image'
import React from 'react'
import styled from 'styled-components'

const ImageCustom = styled(Image)`
  position: relative !important;
`

const MyImage = ({ ...props }: ImageProps) => {
  return <ImageCustom fill {...props} />
}

export default MyImage
