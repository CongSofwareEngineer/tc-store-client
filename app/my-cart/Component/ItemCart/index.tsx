import MyImage from '@/components/MyImage'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import { cloneData, numberWithCommas } from '@/utils/functions'
import { Checkbox } from 'antd'
import BigNumber from 'bignumber.js'
import { useRouter } from 'next/navigation'
import React from 'react'
import styled from 'styled-components'
const TD = styled.td<{ $noBorder: boolean }>`
  border-bottom: ${(props) => (props.$noBorder ? 0 : 2)}px solid
    rgba(229, 231, 235, 1);
  padding: 8px;
`
type ItemCartType = {
  data: {
    idUser: string
    amount: number
    idProduct: string
    keyNameProduct: string
    id: string
    selected?: boolean
    [key: string]: any
  }
  noBorder: boolean
  callBack: (param?: any) => void
}
const ItemCart = ({ data, callBack, noBorder = false }: ItemCartType) => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()
  const router = useRouter()

  const selectedItem = () => {
    const dataClone = cloneData(data)
    if (dataClone?.selected) {
      dataClone.selected = false
    } else {
      dataClone.selected = true
    }
    callBack(dataClone)
  }

  const onChangeAmountBuy = (isPlus = true) => {
    const dataClone = cloneData(data)
    if (isPlus) {
      dataClone.amount = BigNumber(dataClone.amount).plus(1).toNumber()
    } else {
      if (dataClone?.amount > 1) {
        dataClone.amount = BigNumber(dataClone.amount).minus(1).toNumber()
      }
    }
    callBack(dataClone)
  }

  const handleClickName = () => {
    router.push(`/shop/${data.idProduct}/${data.keyName}`)
  }

  const renderDesktop = () => {
    return (
      <tr className=" ">
        <td className="w-[50px] p-2 relative">
          <div className="flex flex-col h-full items-end ">
            <Checkbox
              checked={!!data?.selected}
              onClick={selectedItem}
              className="w-5"
            />
          </div>
          {!noBorder && (
            <div className="border-[1px] border-gray-200 absolute w-[50%] bottom-[-1px] right-0" />
          )}
        </td>
        <TD $noBorder={noBorder} className="w-[100px] ">
          <div className="flex justify-center">
            <MyImage
              widthImage={'auto'}
              heightImage={'80px'}
              src={data?.imageMain}
              alt={`item-${data.id}`}
            />
          </div>
        </TD>
        <TD $noBorder={noBorder}>
          <div className="flex flex-col gap-1">
            <div
              className="font-semibold   cursor-pointer md:hover:underline"
              onClick={handleClickName}
            >
              {data.name}
            </div>
            <div className="opacity-80 text-xs ">
              {`${translate('category')} : ${data?.name || 'typeProduct'}`}
            </div>
          </div>
        </TD>
        <TD $noBorder={noBorder}>
          <div className="  text-green-800 flex flex-col  justify-items-start items-center gap-2">
            <span className="line-through text-xs">
              {numberWithCommas(data.price * 1.2)}
            </span>
            <div className=" text-green-800">
              {numberWithCommas(data.price)}
            </div>
          </div>
        </TD>
        <TD $noBorder={noBorder}>
          <div className="flex h-fit items-center justify-center">
            <div
              className="relative right-[-1px] cursor-pointer text-center border-solid border-2 border-gray-400  min-w-5"
              onClick={() => onChangeAmountBuy(false)}
            >
              -
            </div>
            <div className="cursor-pointer text-center border-solid border-2 border-gray-400 min-w-12 ">
              {data?.amount || 1}
            </div>
            <div
              className="relative left-[-2px] cursor-pointer text-center border-solid border-2 border-gray-400   min-w-5"
              onClick={() => onChangeAmountBuy()}
            >
              +
            </div>
          </div>
        </TD>
        <TD className="relative p-2" $noBorder={noBorder}>
          <div className="text-center font-bold  text-green-800">
            {numberWithCommas(data.amount * data.price)} VNĐ
          </div>
        </TD>
        <td className="w-[50px] p-2 relative">
          <div className="flex flex-col h-full">
            <Checkbox
              checked={!!data?.selected}
              onClick={selectedItem}
              className="w-5"
            />
          </div>
          {!noBorder && (
            <div className="border-[1px] border-gray-200 absolute w-[50%] bottom-[-1px] left-0" />
          )}
        </td>
      </tr>
    )
  }

  const renderMobile = () => {
    return <div></div>
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default ItemCart
