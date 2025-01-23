// import Image from 'next/image'
import { Image } from 'antd'
import React from 'react'
// import { LazyLoadImage } from 'react-lazy-load-image-component'

const MyImage = (props: any) => {
  // const [isLoaded, setIsLoaded] = useState(false)
  return (
    <>
      {/* <Image
        loading='lazy'
        placeholder='blur'
        blurDataURL='data:image/jpeg;base64,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'
        // onLoad={() => setIsLoaded(true)}
        fill
        {...props}
      /> */}
      <Image preview={false} loading='lazy' {...props} />
      {/* {!isLoaded && (
        <Image
          fill
          quality={10}
          src={
            'https://res.cloudinary.com/tc-store/image/upload/w_100/v1734883048/tc-store/bgWhiteBlur_yxlqi7.png'
          }
          alt='image-loading-blur'
          priority
        />
      )} */}
    </>
  )
}

export default MyImage
