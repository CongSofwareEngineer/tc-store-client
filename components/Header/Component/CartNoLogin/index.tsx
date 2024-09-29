import Payment from '@/app/my-cart/Component/Payment'
import { DataItemType } from '@/app/my-cart/type'
import MyImage from '@/components/MyImage'
import SubAndPlus from '@/components/SubAndPlus'
import { COOKIE_KEY } from '@/constant/app'
import { DataAddCart } from '@/constant/mongoDB'
import { QUERY_KEY } from '@/constant/reactQuery'
import useMyCart from '@/hook/tank-query/useMyCart'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import { setCookie } from '@/services/CookeisService'
import { detectImg, formatPriceBase, numberWithCommas } from '@/utils/functions'
import { Button } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const CartNoLogin = () => {
  const { openModalDrawer, closeModalDrawer } = useModalDrawer()
  const { translate, getLabelCategory } = useLanguage()
  const { data } = useMyCart()
  const { refreshQuery } = useRefreshQuery()
  const { isMobile } = useMedia()

  const [listCart, setListCart] = useState<Array<DataItemType>>([])

  useEffect(() => {
    if (Array.isArray(data) && listCart.length === 0) {
      setListCart(data)
    }
  }, [data, listCart])

  const onChangeAmount = (index: number, isPlus = false) => {
    const arrTemp = [...listCart]

    if (isPlus) {
      arrTemp[index].amount++
    } else {
      if (arrTemp[index].amount > 1) {
        arrTemp[index].amount--
      }
    }
    setListCart(arrTemp)
    setCookie(COOKIE_KEY.MyCart, arrTemp)
  }

  const handlePayment = () => {
    refreshQuery(QUERY_KEY.MyCartUser)
    openModalDrawer({
      content: (
        <Payment dataCart={listCart} clickBack={() => closeModalDrawer()} />
      ),
    })
  }

  const renderItem = (item: DataItemType, index: number) => {
    return (
      <div
        key={`item-cart-${item.idProduct}`}
        className="w-full flex un  gap-3 md:py-6 py-4 first:pt-0 border-b-2 border-gray-300"
      >
        <div className="md:w-[120px] w-[100px] aspect-square relative overflow-hidden">
          <MyImage
            src={detectImg(item.moreConfig?.imageMain)}
            alt={`cart-${item.moreConfig?.name}`}
            widthImage="100%"
            heightImage="auto"
          />
        </div>
        <div className="flex flex-1 flex-col self-stretch gap-1">
          <Link href={`/shop/${item.moreConfig?.keyName}`}>
            <p className="font-bold text-black hover:underline">
              {item.moreConfig?.name}
            </p>
          </Link>
          <div className="text-[11px] opacity-75">
            {`
              ${translate('category')} :
             ${getLabelCategory(item.moreConfig?.category)}
            `}
          </div>
          <div className="line-through font-medium">
            {formatPriceBase(item.moreConfig?.price, item.moreConfig?.disCount)}
          </div>
          <div className="text-green-500 font-bold mb-2">
            {`
                ${numberWithCommas(item.moreConfig?.price)}
                VNĐ
              `}
          </div>
          <SubAndPlus
            isSquare
            value={item?.amount || 1}
            callBackPlus={() => onChangeAmount(index, true)}
            callBackSub={() => onChangeAmount(index, false)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="list-none">
      {listCart.map((e, index) => {
        return renderItem(e, index)
      })}
      <div className="flex md:justify-end justify-center w-full mt-5">
        <Button onClick={handlePayment} className="md:w-[200px] w-full">
          {translate('cart.payment')}
        </Button>
      </div>
    </div>
  )
}

export default CartNoLogin
