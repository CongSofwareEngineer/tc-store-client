import { Spin } from 'antd'
import React from 'react'
import MyImage from '../MyImage'

type MyLoadingType = {
  icon?: string
  className?: string
  size?: any
}
const MyLoading = ({ icon, className, size = 'default' }: MyLoadingType) => {
  return (
    <div className={`w-full flex justify-center items-center ${className}`}>
      {icon ? (
        <MyImage src={icon} alt="icon loading" />
      ) : (
        <Spin size={size} style={{ color: 'green' }} />
      )}
    </div>
  )
}

export default MyLoading
