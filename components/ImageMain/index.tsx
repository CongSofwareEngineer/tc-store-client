import { IProduct } from '@/services/ClientApi/type'
import React from 'react'
import MyImage from '../MyImage'
import { detectImg } from '@/utils/functions'
import { cn } from '@/utils/tailwind'
import dynamic from 'next/dynamic'
// import MyImageZoom from '../MyImageZoom'
const MyImageZoom = dynamic(() => import('../MyImageZoom'), { ssr: false })

type IImageMain = {
  model?: string
  listImage: IProduct['images']
  className?: string
  isZoom?: boolean
}
const ImageMain = ({ model, listImage, className, isZoom = false }: IImageMain) => {
  let img

  if (Array.isArray(listImage)) {
    if (model) {
      img = listImage?.find((img) => img.model === model)
    } else {
      img = listImage[0]
    }
  }

  return isZoom ? (
    <MyImageZoom url={img?.url.toString() || ''} />
  ) : (
    <MyImage
      className={cn('!relative ', className)}
      alt={img?.url.toString() || ''}
      src={detectImg(img?.url.toString() || '')}
    />
  )
}

export default ImageMain
