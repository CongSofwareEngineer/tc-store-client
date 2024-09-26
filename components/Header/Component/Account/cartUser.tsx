import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import useLengthCart from '@/hook/tank-query/useLengthCart'
import useUserData from '@/hook/useUserData'
import { useRouter } from 'next/navigation'
import React from 'react'

const CartUser = () => {
  const router = useRouter()
  const { userData } = useUserData()
  const { data } = useLengthCart(userData?._id)

  const handleClick = () => {
    if (data?.lengthCart > 0) {
      router.push('/my-cart')
    }
  }
  return (
    <div className="relative" onClick={handleClick}>
      {data?.lengthCart > 0 && (
        <span className="text-[11px] leading-[21px] text-center rounded-[50%] absolute w-[20px] h-[20px] z-[1] top-[-7px] right-[13px] bg-[#00ffb4]">
          {data?.lengthCart}
        </span>
      )}
      <MyImage
        src={images.icon.iconCart}
        alt="my-cart"
        widthImg="[25px]"
        heightImg="[25px]"
      />
    </div>
  )
}

export default CartUser
