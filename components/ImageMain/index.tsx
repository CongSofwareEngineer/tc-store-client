import { IProduct } from '@/services/ClientApi/type'
import React from 'react'
import MyImage from '../MyImage'
import { detectImg } from '@/utils/functions'
import { cn } from '@/utils/tailwind'

type IImageMain = {
  model?: string
  listImage: IProduct['images']
  className?: string
}
const ImageMain = ({ model, listImage, className }: IImageMain) => {
  let img
  if (listImage) {
    if (model) {
      img = listImage?.find((img) => img.model === model)
    } else {
      img = listImage[0]
    }
  }

  return (
    <MyImage
      className={cn('!relative ', className)}
      alt={img?.url.toString() || ''}
      src={detectImg(img?.url.toString() || '')}
    />
  )
}

export default ImageMain
