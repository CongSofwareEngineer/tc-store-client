import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import useLengthCart from '@/hook/tank-query/useLengthCart'
import useUserData from '@/hook/useUserData'
import React from 'react'

const CartUser = () => {
  const { userData } = useUserData()
  const { data } = useLengthCart(userData?.id.toString())

  return (
    <div className="relative">
      {data?.data?.lengthCart && data?.data?.lengthCart > 0 && (
        <span className="text-[11px] leading-[21px] text-center rounded-[50%] absolute w-[20px] h-[20px] z-[1] top-[-7px] right-[13px] bg-[#00ffb4]">
          {data?.data?.lengthCart}
        </span>
      )}
      <MyImage
        src={images.icon.iconCart}
        alt="my-cart"
        widthImage="25px"
        heightImage="25px"
      />
    </div>
  )
}

export default CartUser
