import Image from 'next/image'
import type { ImageProps } from 'next/image'
import React, { useState } from 'react'

const MyImage = (props: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <>
      <Image {...props} onLoad={() => setIsLoaded(true)} fill />
      {!isLoaded && (
        <Image
          fill
          quality={10}
          src={
            'https://ipfsgw.bountykinds.com/ipfs/QmZnHddnniAY7TQYyitKZpXwCdYQj47927a75ypixxCQAS?filename=bgWhiteBlur.avif'
          }
          alt='image-loading-blur'
          priority
        />
      )}
    </>
  )
}

export default MyImage
