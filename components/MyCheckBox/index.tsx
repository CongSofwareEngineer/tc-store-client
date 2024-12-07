import React from 'react'
import { images } from '@/configs/images'
import Image from 'next/image'
type MyCheckBoxProps = {
  className?: string
  onClick?: (param?: any) => any
  size?: number
  alt?: string
  value?: boolean
}
const MyCheckBox = ({ className = '', onClick = () => {}, size = 22, alt = '', value = false }: MyCheckBoxProps) => {
  return value ? (
    <Image
      fill
      priority
      src={images.icon.iconChecked}
      alt={`icon-MyCheckBox-${alt}`}
      className={`!relative !w-[${size}px] !h-[${size}px] transition-all duration-500 cursor-pointer select-none ${className}`}
      onClick={() => onClick(!value)}
    />
  ) : (
    <div
      style={{ width: size }}
      onClick={() => onClick(!value)}
      className={`cursor-pointer aspect-square rounded-md border-2 border-green-500 ${className}`}
    />
  )
}

export default MyCheckBox
