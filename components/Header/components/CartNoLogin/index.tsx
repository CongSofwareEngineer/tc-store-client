import ModalDelete from '@/components/ModalDelete'

import SubAndPlus from '@/components/SubAndPlus'
import { COOKIE_KEY, DEFAULT_FEE_SHIP } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'
import { cloneData, formatPriceBase, numberWithCommas, saveDataLocal } from '@/utils/functions'
import Link from 'next/link'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Checkbox } from '@mantine/core'
import { AiOutlineDelete } from 'react-icons/ai'
import useMyCart from '@/hooks/tank-query/useMyCart'
import ConfigBill from '@/components/ConfigBill'
import Payment from '@/components/Payment'
import { IItemCart } from '@/app/my-cart/type'
import ImageMain from '@/components/ImageMain'
import { useModalAdmin } from '@/zustand/useModalAdmin'
import useMedia from '@/hooks/useMedia'

const CartNoLogin = () => {
  const { openModalDrawer, closeModalDrawer } = useModalDrawer()
  const { closeModal, openModal } = useModalAdmin()
  const { translate } = useLanguage()
  const { data, isLoading } = useMyCart()
  const { isMobile } = useMedia()

  const [listArr, setListArr] = useState<Array<IItemCart>>([])

  useEffect(() => {
    if (!isLoading) {
      setListArr(data)
    }
  }, [data, isLoading])

  const refreshData = (listData: Array<IItemCart>) => {
    saveDataLocal(COOKIE_KEY.MyCart, listData)
    setListArr(listData)
  }

  const getTotalsBill = () => {
    let total = 0
    listArr.forEach((item: IItemCart) => {
      if (item?.selected) {
        total += item.amountBuy! * item?.moreData?.price!
      }
    })
    total
    return numberWithCommas(total)
  }

  const onChangeAmount = (index: number, isPlus = false) => {
    const arrTemp = cloneData(listArr)
    if (isPlus) {
      arrTemp[index].amountBuy!++
    } else {
      if (arrTemp[index].amountBuy! > 1) {
        arrTemp[index].amountBuy!--
      }
    }
    refreshData(arrTemp)
  }

  const selectedItem = (index: number, value: boolean) => {
    const dataClone = cloneData(listArr)
    dataClone[index].selected = value
    refreshData(dataClone)
  }

  const handleDelete = (index: number) => {
    const callBack = () => {
      let dataClone = cloneData(listArr)
      dataClone = dataClone.filter((_: any, indexFilter: number) => indexFilter !== index)
      refreshData(dataClone)
      closeModal
    }
    openModal({
      body: <ModalDelete isModalAdmin callback={callBack} />,
    })
  }

  const handlePayment = () => {
    const arrFilter = listArr.filter((item: IItemCart) => item?.selected)
    if (isMobile) {
      openModalDrawer({
        content: <Payment showBack={false} data={arrFilter} clickBack={() => closeModalDrawer()} />,
        title: translate('bill.title'),
        useDrawer: true,
        configModal: {
          width: 'auto',
        },
      })
    } else {
      openModalDrawer({
        content: <Payment showBack={false} data={arrFilter} clickBack={() => closeModalDrawer()} />,
        title: translate('bill.title'),
        onlyDrawer: true,
        configDrawer: {
          position: 'right',
          width: '1100px',
        },
      })
    }
  }

  const getAmountBill = () => {
    let total = 0
    listArr.forEach((item: IItemCart) => {
      if (item?.selected) {
        total += item.amountBuy!
      }
    })
    return total
  }

  const renderItem = (item: IItemCart, index: number) => {
    return (
      <div
        key={`item-cart-${index}`}
        className='w-full flex align-middle  gap-3 md:py-6 py-4 first:pt-0 border-b-2 border-gray-300'
      >
        <div className='flex flex-col gap-2 self-stretch justify-center align-middle'>
          <Checkbox
            onChange={(event) => selectedItem(index, event.currentTarget.checked)}
            checked={!!item?.selected}
          />
          <AiOutlineDelete
            style={{ color: 'red', fontSize: 25 }}
            className='cursor-pointer'
            onClick={() => handleDelete(index)}
          />
        </div>
        <div className='md:w-[120px] w-[100px] aspect-square relative overflow-hidden'>
          <ImageMain listImage={item.moreData?.images} model={item?.configCart?.model} />
        </div>
        <div className='flex flex-1 flex-col self-stretch gap-1'>
          <Link href={`/shop/${item.moreData?.keyName}`}>
            <p className='font-bold text-black hover:underline'>{item.moreData?.name}</p>
          </Link>
          <ConfigBill item={item} />
          <div className='line-through font-medium'>
            {formatPriceBase(item.moreData?.price, item.moreData?.disCount)}
          </div>
          <div className='text-green-500 font-bold mb-2'>
            {`${numberWithCommas(item.moreData?.price)}  VNĐ `}
          </div>
          <SubAndPlus
            isSquare
            value={item?.amountBuy || 1}
            callBackPlus={() => onChangeAmount(index, true)}
            callBackSub={() => onChangeAmount(index, false)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className='h-full max-h-full flex flex-col  '>
      <div className='flex flex-1 flex-col w-full overflow-auto  '>
        {listArr.map((e, index) => {
          return renderItem(e, index)
        })}
      </div>
      <div className='w-full flex- flex justify-between  text-green-600 font-bold my-3'>
        <div className='md:text-xl text-medium'>{translate('textPopular.totalMoney')}</div>
        <div className='md:text-xl text-medium'>{`${getTotalsBill()} VNĐ `}</div>
      </div>
      <div className='flex   md:justify-end justify-center w-full '>
        <Button
          disabled={listArr.length === 0 || getAmountBill() === 0}
          onClick={handlePayment}
          className='w-full'
        >
          {`${translate('cart.payment')} (${getAmountBill()})`}
        </Button>
      </div>
    </div>
  )
}

export default CartNoLogin
