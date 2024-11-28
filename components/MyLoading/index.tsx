import React from 'react'
import MyImage from '../MyImage'
import { LoadingOutlined } from '@ant-design/icons'
// import MyLottie from '../MyLottie'
// import MyLottie from '../MyLottie'

type MyLoadingType = {
  icon?: string
  className?: string
  size?: any
}
const MyLoading = ({ icon, className }: MyLoadingType) => {
  return (
    <div className={`w-full flex justify-center items-center ${className}`}>
      {icon ? (
        <MyImage src={icon} alt="icon loading" />
      ) : (
        <div className="my-5 text-medium">
          <LoadingOutlined />
        </div>
      )}
    </div>
  )
}

export default MyLoading
