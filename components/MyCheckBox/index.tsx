import React from 'react'
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
    <img
      src={images.icon.iconChecked}
      style={{
        width: size,
        height: size,
      }}
      alt={`icon-MyCheckBox-${alt}`}
      className={`transition-all   duration-500 cursor-pointer select-none ${className}`}
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
