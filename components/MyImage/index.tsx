import Image from 'next/image'
import type { ImageProps } from 'next/image'
import React, { useState } from 'react'

const MyImage = (props: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <>
      <Image {...props} onLoad={() => setIsLoaded(true)} fill />
      {!isLoaded && <Image fill quality={10} src={'/images/CoffeeDetail/bgWhiteBlur.avif'} alt='image-loading-blur' />}
    </>
  )
}

export default MyImage
