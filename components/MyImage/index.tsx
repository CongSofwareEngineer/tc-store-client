import Image from 'next/image'
import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'

const MyImage = (props: any) => {
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: true })
  const [loaded, setLoaded] = useState(false)

  return (
    <Image
      ref={ref}
      loading='lazy'
      fill
      {...props}
      onLoad={() => setLoaded(true)}
      style={{
        filter: loaded ? 'none' : 'blur(20px)',
        transition: 'filter 0.2s ease-out',
        ...props.style,
      }}
      src={
        inView
          ? props.src
          : 'https://res.cloudinary.com/tc-store/image/upload/w_100/v1734883048/tc-store/bgWhiteBlur_yxlqi7.png'
      }
    />
  )
}

export default MyImage
