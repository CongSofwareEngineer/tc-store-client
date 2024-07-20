import ModalDelete from '@/components/ModalDelete'
import MyImage from '@/components/MyImage'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import { cloneData, formatPriceBase, numberWithCommas } from '@/utils/functions'
import { DeleteOutlined } from '@ant-design/icons'
import { Checkbox } from 'antd'
import BigNumber from 'bignumber.js'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ItemCartType } from '../../type'
import SubAndPlus from '@/components/SubAndPlus'
import useModalDrawer from '@/hook/useModalDrawer'
import MyCheckBox from '@/components/MyCheckBox'

const ItemCart = ({
  data,
  callBack,
  noBorder = false,
  callBackDelete,
  noEdit = false,
}: ItemCartType) => {
  const { translate, getLabelCategory } = useLanguage()
  const { isMobile } = useMedia()
  const { openModalDrawer, closeModalDrawer } = useModalDrawer()
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

  const handleDelete = () => {
    openModalDrawer({
      content: <ModalDelete callback={callBackDelete} />,
      configModal: {
        width: '500px',
        showHeader: true,
      },
    })
  }

  const handleClickName = () => {
    router.push(`/shop/${data.idProduct}/${data.keyName}`)
    closeModalDrawer()
  }

  const renderDesktop = () => {
    return (
      <div
        className={`w-full flex gap-3 items-center p-3 pb-4 ${
          !noBorder && 'border-b-[3px] border-gray-200'
        }`}
      >
        <div className="w-8 flex flex-col gap-3 items-center">
          <MyCheckBox
            alt={data?.more_data?.keyName}
            onClick={selectedItem}
            value={!!data?.selected}
          />
          <DeleteOutlined
            style={{ color: 'red', fontSize: 25 }}
            onClick={handleDelete}
          />
        </div>
        <div className="aspect-square w-[120px]">
          <MyImage
            widthImage={'100%'}
            heightImage={'auto'}
            src={data?.imageMain?.toString() || ''}
            alt={`item-${data?.more_data?.keyName}`}
          />
        </div>
        <div className="flex flex-col flex-1 gap-1">
          <div
            onClick={() =>
              router.push(
                `/shop/${data?.more_data._id}/${data?.more_data.keyName}`
              )
            }
            className="text-medium font-medium mb-1 hover:underline cursor-pointer "
          >
            {data?.more_data?.name}
          </div>
          <div className="opacity-80 text-xs ">
            {`${translate('category')} : ${
              getLabelCategory(data?.more_data?.category) || 'typeProduct'
            }`}
          </div>
          <div className="flex w-full gap-2 items-center">
            <div className=" text-green-800 font-medium">
              {numberWithCommas(data?.more_data.price)} đ
            </div>
            <div className="line-through font-medium">
              {numberWithCommas(data?.more_data.price * 1.2)}
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="font-bold text-green-500">
              {numberWithCommas(data.amount * data?.more_data.price)} VNĐ
            </div>
            <SubAndPlus
              isSquare
              value={data?.amount || 1}
              callBackPlus={() => onChangeAmountBuy()}
              callBackSub={() => onChangeAmountBuy(false)}
            />
          </div>
        </div>
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div className="flex gap-2 w-full pb-4 pt-2 pl-3 relative">
        {!noEdit && (
          <div className="h-auto flex flex-col justify-around  items-end">
            <Checkbox checked={!!data?.selected} onClick={selectedItem} />
            <DeleteOutlined
              style={{ color: 'red', fontSize: 18 }}
              onClick={handleDelete}
            />
          </div>
        )}

        <div className="w-[100px] flex ">
          <MyImage
            widthImage={'auto'}
            heightImage={'80px'}
            src={data?.imageMain}
            alt={`item-${data.id}`}
          />
        </div>
        <div className="flex flex-1 gap-1 flex-col max-w-[calc(100%-130px)] pr-2">
          <div className="w-full">
            <p className="text-medium font-semibold whitespace-nowrap overflow-hidden text-ellipsis ">
              {data.name}
            </p>
            <span className="text-[12px] opacity-70 line-through">
              {formatPriceBase(data.price, data.discount)} VNĐ
            </span>
          </div>
          <div className="w-full flex justify-between items-baseline">
            {noEdit ? (
              <div>{`x${data.amount}`}</div>
            ) : (
              <SubAndPlus
                isSquare
                value={data?.amount || 1}
                callBackPlus={() => onChangeAmountBuy()}
                callBackSub={() => onChangeAmountBuy(false)}
              />
            )}

            <div className="font-bold  text-green-800">
              {`${numberWithCommas(data.amount * data.price)} VNĐ`}
            </div>
          </div>
        </div>

        {!noBorder && (
          <div className="w-[90%] border-[1px] border-gray-200 absolute bottom-2 left-[5%] " />
        )}
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default ItemCart
