import Payment from '@/app/my-cart/Component/Payment'
import { DataItemType } from '@/app/my-cart/type'
import ModalDelete from '@/components/ModalDelete'
import MyCheckBox from '@/components/MyCheckBox'
import MyImage from '@/components/MyImage'
import SubAndPlus from '@/components/SubAndPlus'
import { COOKIE_KEY } from '@/constant/app'
import { QUERY_KEY } from '@/constant/reactQuery'
import useMyCart from '@/hook/tank-query/useMyCart'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import { setCookie } from '@/services/CookeisService'
import {
  cloneData,
  detectImg,
  formatPriceBase,
  numberWithCommas,
} from '@/utils/functions'
import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

const CartNoLogin = () => {
  const { openModalDrawer, closeModalDrawer } = useModalDrawer()
  const { translate, getLabelCategory } = useLanguage()
  const { data } = useMyCart()
  const { refreshQuery } = useRefreshQuery()

  const refreshData = (listData?: Array<DataItemType>) => {
    if (listData) {
      setCookie(COOKIE_KEY.MyCart, listData)
    }
    refreshQuery(QUERY_KEY.MyCartUser)
    refreshQuery(QUERY_KEY.LengthCartUser)
  }

  const getTotalsBill = () => {
    let total = 0
    data.forEach((item: DataItemType) => {
      if (item?.selected) {
        total += item.amount * item.moreConfig?.price
      }
    })
    return numberWithCommas(total)
  }

  const onChangeAmount = (index: number, isPlus = false) => {
    const arrTemp = [...data]
    if (isPlus) {
      arrTemp[index].amount++
    } else {
      if (arrTemp[index].amount > 1) {
        arrTemp[index].amount--
      }
    }
    refreshData(arrTemp)
  }

  const selectedItem = (index: number, value: boolean) => {
    const dataClone = cloneData(data)
    dataClone[index].selected = value
    refreshData(dataClone)
  }

  const handleDelete = (index: number) => {
    const callBack = () => {
      let dataClone = cloneData(data)
      dataClone = dataClone.filter(
        (_: any, indexFilter: number) => indexFilter !== index
      )
      refreshData(dataClone)
    }
    openModalDrawer({
      content: <ModalDelete callback={callBack} />,
    })
  }

  const handlePayment = () => {
    openModalDrawer({
      content: <Payment dataCart={data} clickBack={() => closeModalDrawer()} />,
    })
  }

  const renderItem = (item: DataItemType, index: number) => {
    return (
      <div
        key={`item-cart-${item.idProduct}`}
        className="w-full flex align-middle  gap-3 md:py-6 py-4 first:pt-0 border-b-2 border-gray-300"
      >
        <div className="flex flex-col gap-2 self-stretch justify-center align-middle">
          <MyCheckBox
            alt={item.moreConfig?.keyName}
            onClick={(e: boolean) => selectedItem(index, e)}
            value={!!item?.selected}
          />
          <DeleteOutlined
            style={{ color: 'red', fontSize: 25 }}
            onClick={() => handleDelete(index)}
          />
        </div>
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
    <div className="h-full max-h-full flex flex-col overflow-auto  ">
      <div className="flex flex-1 flex-col w-full overflow-auto  ">
        {data.map((e, index) => {
          return renderItem(e, index)
        })}
      </div>
      <div className="w-full flex justify-end text-title text-green-600 font-bold my-3">
        {`${getTotalsBill()} VNĐ`}
      </div>
      <div className="flex md:justify-end justify-center w-full ">
        <Button
          disabled={data.length === 0}
          onClick={handlePayment}
          className="w-full"
        >
          {translate('cart.payment')}
        </Button>
      </div>
    </div>
  )
}

export default CartNoLogin
