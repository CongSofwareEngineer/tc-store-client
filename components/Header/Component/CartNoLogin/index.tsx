import MyImage from '@/components/MyImage'
import SubAndPlus from '@/components/SubAndPlus'
import { DataAddCart } from '@/constant/mongoDB'
import useMyCart from '@/hook/tank-query/useMyCart'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import { detectImg, formatPriceBase, numberWithCommas } from '@/utils/functions'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const CartNoLogin = () => {
  const { closeModalDrawer } = useModalDrawer()
  const { translate, getLabelCategory } = useLanguage()
  const { data } = useMyCart()

  const [listCart, setListCart] = useState<Array<DataAddCart>>([])

  useEffect(() => {
    if (Array.isArray(data)) {
      setListCart(data)
    }
  }, [data])

  const getPrice = () => {
    console.log('====================================')
    console.log({ closeModalDrawer })
    console.log('====================================')
  }
  getPrice()

  const renderItem = (item: DataAddCart) => {
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
          <div className="text-green-500 font-bold">
            {`
                ${numberWithCommas(item.moreConfig?.price)}
                VNĐ
              `}
          </div>
          <SubAndPlus
            isSquare
            value={item?.amount || 1}
            // callBackPlus={() => onChangeAmountBuy()}
            // callBackSub={() => onChangeAmountBuy(false)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="list-none">
      {[...listCart, ...listCart]?.map((e) => {
        return renderItem(e)
      })}
    </div>
  )
}

export default CartNoLogin
