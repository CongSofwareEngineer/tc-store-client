import Image from 'next/image'
import type { ImageProps } from 'next/image'
import React, { useState } from 'react'

const MyImage = (props: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <>
      <Image loading='lazy' {...props} onLoad={() => setIsLoaded(true)} fill />
      {!isLoaded && (
        <Image
          fill
          quality={10}
          src={'https://res.cloudinary.com/tc-store/image/upload/w_100/v1734883048/tc-store/bgWhiteBlur_yxlqi7.png'}
          alt='image-loading-blur'
          priority
        />
      )}
    </>
  )
}

export default MyImage
