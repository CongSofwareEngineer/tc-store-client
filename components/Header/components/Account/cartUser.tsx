import { images } from '@/configs/images'
import useMedia from '@/hooks/useMedia'
import useModalDrawer from '@/hooks/useModalDrawer'
import useUserData from '@/hooks/useUserData'
import React from 'react'
import useLanguage from '@/hooks/useLanguage'
import { QUERY_KEY } from '@/constants/reactQuery'
import Image from 'next/image'
import useRoutePage from '@/hooks/useRoutePage'
import useLengthCart from '@/hooks/tank-query/useLengthCart'
import useRefreshQuery from '@/hooks/tank-query/useRefreshQuery'
import CartNoLogin from '../CartNoLogin'

const CartUser = () => {
  const router = useRoutePage()
  const { userData, isLogin } = useUserData()
  const { data } = useLengthCart(userData?._id)
  const { openModalDrawer } = useModalDrawer()
  const { isMobile } = useMedia()
  const { translate } = useLanguage()
  const { refreshQuery } = useRefreshQuery()

  const handleClick = () => {
    if (isLogin) {
      router.push('/my-cart')
    } else {
      openModalDrawer({
        content: <CartNoLogin />,
        title: <div className='text-medium font-bold'>{translate('header.cart')}</div>,
        onlyDrawer: true,
        configDrawer: {
          position: isMobile ? 'bottom' : 'right',
          width: isMobile ? '100%' : '550px',
          afterClose: () => {
            refreshQuery(QUERY_KEY.MyCartUser)
            refreshQuery(QUERY_KEY.LengthCartUser)
          },
        },
      })
    }
  }

  return (
    <div className='relative' onClick={handleClick}>
      {data?.lengthCart > 0 && (
        <span className='text-[11px] leading-[21px] text-center rounded-[50%] absolute w-[20px] h-[20px] z-[1] top-[-7px] right-[13px] bg-[#00ffb4]'>
          {data?.lengthCart}
        </span>
      )}
      <Image fill alt='my-cart' className='!relative !w-[25px] !h-[25px' src={images.icon.iconCart} />
    </div>
  )
}

export default CartUser
