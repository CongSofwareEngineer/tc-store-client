import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import useLengthCart from '@/hook/tank-query/useLengthCart'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import useUserData from '@/hook/useUserData'
import { useRouter } from 'next/navigation'
import React from 'react'
import CartNoLogin from '../CartNoLogin'
import useLanguage from '@/hook/useLanguage'

const CartUser = () => {
  const router = useRouter()
  const { userData, isLogin } = useUserData()
  const { data } = useLengthCart(userData?._id)
  const { openModalDrawer } = useModalDrawer()
  const { isMobile } = useMedia()
  const { translate } = useLanguage()

  const handleClick = () => {
    if (isLogin) {
      router.push('/my-cart')
    } else {
      openModalDrawer({
        content: <CartNoLogin />,
        title: (
          <div className="text-medium font-bold">
            {translate('header.cart')}
          </div>
        ),
        onlyDrawer: true,
        configDrawer: {
          placement: isMobile ? 'bottom' : 'right',
          width: isMobile ? '100%' : '550px',
        },
      })
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
        widthImage="25px"
        heightImage="25px"
      />
    </div>
  )
}

export default CartUser
