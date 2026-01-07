import { images } from '@/configs/images'
import { cn } from '@/utils/tailwind'
import Image, { ImageProps } from 'next/image'
import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'

type IImage = {
  onLoaded?: () => any
  showPreView?: boolean
  isAnimation?: boolean
} & ImageProps
const MyImage = ({ isAnimation = false, ...props }: IImage) => {
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: true, rootMargin: '150px' })
  const [loaded, setLoaded] = useState(false)

  return (
    <Image
      ref={ref}
      fill
      draggable={false}
      {...props}
      className={cn('!relative', props?.className)}
      src={inView ? props.src : 'https://res.cloudinary.com/tc-store/image/upload/w_100/v1734883048/tc-store/bgWhiteBlur_yxlqi7.png'}
      style={{
        filter: loaded ? 'none' : 'blur(20px)',
        transition: !isAnimation ? 'none' : 'filter 0.08s ease-out',
        ...props.style,
      }}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null
        currentTarget.src = images.icon.unknowTokenIcon
      }}
      onLoad={() => {
        setLoaded(true)
        if (props.onLoaded) {
          props.onLoaded()
        }
      }}
    />
  )
}

export default MyImage
