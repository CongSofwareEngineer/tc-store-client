import useLanguage from '@/hooks/useLanguage'
import { IItemCart, IProductCart } from '../type'
import useMedia from '@/hooks/useMedia'
import useModalDrawer from '@/hooks/useModalDrawer'
import useRoutePage from '@/hooks/useRoutePage'
import { cloneData, formatPriceBase, getUrlProduct, numberWithCommas } from '@/utils/functions'
import ModalDelete from '@/components/ModalDelete'
import { Checkbox } from '@mantine/core'
import { AiOutlineDelete } from 'react-icons/ai'
import ConfigBill from '@/components/ConfigBill'
import SubAndPlus from '@/components/SubAndPlus'
import ImageMain from '@/components/ImageMain'

const ItemCart = ({ data, callBack, noBorder = false, callBackDelete, noEdit = false }: IItemCart) => {
  const { translate, getLabelCategory } = useLanguage()
  const { isMobile } = useMedia()
  const { openModalDrawer } = useModalDrawer()
  const router = useRoutePage()

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
    const dataClone: IProductCart = cloneData(data)

    if (isPlus) {
      dataClone.amountBuy = Number(dataClone.amountBuy) + 1
    } else {
      if (dataClone?.amountBuy! > 1) {
        dataClone.amountBuy = Number(dataClone.amountBuy) - 1
      }
    }
    callBack(dataClone)
  }

  const handleDelete = () => {
    openModalDrawer({
      content: <ModalDelete callback={callBackDelete} />,
      configModal: {
        width: '500px',
      },
    })
  }

  const renderDesktop = () => {
    return (
      <div className={`w-full flex gap-3 items-center p-3 pb-4 ${!noBorder && 'border-b-[3px] border-gray-200'}`}>
        <div className='w-8 flex flex-col gap-3 items-center'>
          <Checkbox checked={!!data?.selected} onChange={selectedItem} />

          <AiOutlineDelete className='cursor-pointer' style={{ color: 'red', fontSize: 25 }} onClick={handleDelete} />
        </div>
        <div className='relative aspect-square w-[120px] overflow-hidden'>
          <ImageMain listImage={data.moreData?.images} model={data.configCart?.model} />
        </div>
        <div className='flex flex-col flex-1 gap-1'>
          <div className='text-medium font-medium mb-1 hover:underline cursor-pointer ' onClick={() => router.push(getUrlProduct(data))}>
            {data?.moreData?.name}
          </div>
          <div className='opacity-80 text-xs flex gap-1 items-center '>
            <span>{translate('category')}</span>
            <span>:</span>
            <span>{getLabelCategory(data?.moreData?.category!)}</span>
          </div>
          <ConfigBill item={data} />

          <div className='flex w-full gap-2 items-center'>
            <div className=' text-green-800 font-medium'>{numberWithCommas(data?.moreData?.price)} đ</div>
            <div className='line-through font-medium'>{numberWithCommas((data?.moreData?.price || 0) * 1.2)}</div>
          </div>

          <div className='w-full flex items-center justify-between'>
            <div className='font-bold text-green-500'>{numberWithCommas((data?.amountBuy || 0) * (data?.moreData?.price || 0))} VNĐ</div>
            <SubAndPlus isSquare callBackPlus={() => onChangeAmountBuy()} callBackSub={() => onChangeAmountBuy(false)} value={data?.amountBuy || 1} />
          </div>
        </div>
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div className='flex gap-2 w-full pb-4 pt-2 pl-3 relative'>
        {!noEdit && (
          <div className='h-auto flex justify-center flex-col gap-3  items-end'>
            <Checkbox checked={!!data?.selected} onChange={selectedItem} />
            <AiOutlineDelete style={{ color: 'red', fontSize: 18 }} onClick={handleDelete} />
          </div>
        )}

        <div className='w-[100px] relative justify-center flex m-auto'>
          <ImageMain listImage={data.moreData?.images} model={data.configCart?.model} />
        </div>
        <div className='flex flex-1 gap-1 flex-col max-w-[calc(100%-130px)] pr-2'>
          <div className=' font-bold   hover:underline cursor-pointer ' onClick={() => router.push(getUrlProduct(data))}>
            {data?.moreData?.name}
          </div>

          <ConfigBill item={data} />

          <div className='w-full'>
            <p className='text-medium font-semibold whitespace-nowrap overflow-hidden text-ellipsis '>{data.name}</p>
            <span className='text-[12px] opacity-70 line-through'>{formatPriceBase(data.moreData?.price, data.moreData?.disCount)} VNĐ</span>
          </div>

          <div className='w-full flex justify-between items-baseline'>
            {noEdit ? (
              <div>{`x${data.amountBuy}`}</div>
            ) : (
              <SubAndPlus
                isSquare
                callBackPlus={() => onChangeAmountBuy()}
                callBackSub={() => onChangeAmountBuy(false)}
                value={data?.amountBuy || 1}
              />
            )}
          </div>
          <div className='font-bold  text-green-500'>{numberWithCommas(data.amountBuy! * data.moreData?.price!)} VNĐ</div>
        </div>

        {!noBorder && <div className='w-[90%] border-[1px] border-gray-200 absolute bottom-2 left-[5%] ' />}
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default ItemCart
