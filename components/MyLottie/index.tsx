import React from 'react'
import Lottie from 'react-lottie'
import loading from '@/public/json/loading.json'
type Props = {
  width?: number
  height?: number
  src?: string
}
const MyLottie = ({ height = 400, width = 400, src = '' }: Props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: src || loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return <Lottie options={defaultOptions} height={height} width={width} />
}

export default MyLottie
