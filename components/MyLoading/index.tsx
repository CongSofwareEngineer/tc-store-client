import React from 'react'
import MyImage from '../MyImage'
import MyLottie from '../MyLottie'
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
        <MyLottie width={200} height={200} />
      )}
    </div>
  )
}

export default MyLoading
