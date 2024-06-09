import MyImage from '../MyImage'
import { TextPrice, TextPriceBase } from './styled'
import styles from './style.module.scss'
import { Rate } from 'antd'
import Link from 'next/link'
import useLanguage from '@/hook/useLanguage'
import { images } from '@/configs/images'
import { formatPrice, formatPriceBase } from '@/utils/functions'
import MySliderSell from '../MySliderSell'

type ItemType = {
  item: any
  callback?: () => void
  className?: string | ''
  classImage?: string | ''
  showSold?: boolean
  showFeedback?: boolean
  showDiscount?: boolean
  href?: string
}
const ItemProduct = ({
  item,
  callback = () => {},
  className,
  classImage,
  showSold = false,
  showFeedback = false,
  showDiscount = true,
  href = '',
}: ItemType) => {
  const { translate } = useLanguage()

  return (
    <Link
      className={`relative item-list cursor-pointer px-3 py-6 gap-3 flex items-center justify-between flex-col ${styles['item-coffee']} ${className}`}
      onClick={callback}
      href={href}
    >
      {showDiscount && (
        <div className="absolute right-0 top-4 bg-green-300 px-3 rounded-l-lg z-20">
          {item?.discount || 0}%
        </div>
      )}

      <div className="m-auto max-w-[80%]">
        <MyImage
          src={item?.imageMain || images.footer.iconAddress}
          className={`w-[100%] max-h-[130px] md:max-h-[160px] ${classImage}`}
          alt={`item-${item?.name || href}`}
        />
      </div>
      <div className="w-full gap-1 flex flex-col">
        <div className="w-full text-medium font-bold">{item?.name}</div>
        <TextPriceBase className=" w-full ">
          {`${formatPriceBase(item?.price || 150)} VNĐ`}
        </TextPriceBase>

        <TextPrice className=" w-full ">
          {formatPrice(item?.price || 150)}
          <span className="text-[16px] ml-3[px] h-ful flex items-center relative top-[2px]">
            VNĐ
          </span>
        </TextPrice>
        <MySliderSell
          total={item.amount}
          sell={item.sold}
          className={'text-[14px]'}
        />
        {showSold && (
          <div className="mt-2 text-[11px] flex w-full justify-between items-center">
            <span>{`${translate('productDetail.sold')}  ${item.sold}`}</span>

            {showFeedback && (
              <div className="flex gap-1 items-center">
                <Rate disabled defaultValue={4.5} className="text-[11px]" />
                {/* <span >
                      {item.numberLike || 10}
                    </span> */}
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}

export default ItemProduct
