import React from 'react'
import MyImage from '../MyImage'
import { images } from '@/configs/images'
type MyCheckBoxProps = {
  className?: string
  onClick?: (param?: any) => any
  size?: number
  alt?: string
  value?: boolean
}
const MyCheckBox = ({
  className = '',
  onClick = () => {},
  size = 22,
  alt = '',
  value = false,
}: MyCheckBoxProps) => {
  return value ? (
    <MyImage
      src={images.icon.iconChecked}
      widthImage={`${size}px`}
      heightImage={`${size}px`}
      alt={`icon-MyCheckBox-${alt}`}
      className={`transition-all duration-500 cursor-pointer select-none ${className}`}
      onClick={onClick}
    />
  ) : (
    <div
      style={{ width: size }}
      onClick={onClick}
      className={`cursor-pointer aspect-square rounded-md border-2 border-green-500 ${className}`}
    />
  )
}

export default MyCheckBox
