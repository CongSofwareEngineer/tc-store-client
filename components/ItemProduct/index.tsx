import { RateCustom, TextPriceBase } from './styled'
import styles from './style.module.scss'
import Link from 'next/link'
import useLanguage from '@/hook/useLanguage'
import { images } from '@/configs/images'
import { detectImg, formatPrice, formatPriceBase, numberWithCommas } from '@/utils/functions'
import MySliderSell from '../MySliderSell'
import useMedia from '@/hook/useMedia'
import Image from 'next/image'

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
  showSold = false,
  showFeedback = false,
  showDiscount = true,
  href = '',
}: ItemType) => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()

  return (
    <Link className='group' onClick={callback} href={href}>
      <div
        className={`group relative item-list cursor-pointer px-3 pt-6 md:pb-4 pb-3 gap-3 flex items-center justify-between flex-col ${styles['item-coffee']} ${className}`}
      >
        {showDiscount && item?.discount > 0 && (
          <div className='absolute right-0 top-4 bg-green-300 px-3 rounded-l-lg z-[1]'>{item?.discount || 0}%</div>
        )}

        <div className='m-auto max-w-[85%] relative w-full aspect-square  overflow-hidden'>
          <Image
            fill
            src={detectImg(item?.imageMain || images.userDetail.iconUserDetail)}
            alt={`item-${item?.name || href}`}
            className='!relative !h-auto group-hover:scale-110 transform transition duration-300 ease-in-out select-none'
          />
        </div>
        <div className='w-full gap-1 flex flex-col'>
          <p className='w-full md:text-medium font-bold whitespace-nowrap overflow-hidden text-ellipsis'>
            {item?.name}
          </p>
          <TextPriceBase className=' w-full   '>{`${formatPriceBase(item?.price || 150)} VNĐ`}</TextPriceBase>

          <div className='w-full  text-green-600 xl:text-[24px] md:text-[18px] text-[13px] font-bold flex justify-between  '>
            {formatPrice(item?.price || 150)}
            VNĐ
          </div>
          {!isMobile && <MySliderSell total={item.amount} sell={item.sold} className={'text-[12px]'} />}

          {showSold && (
            <div className='md:mt-2 text-[11px] flex w-full justify-between items-center'>
              <span>{`${translate('productDetail.sold')}  ${numberWithCommas(item.sold || '0')}`}</span>

              {showFeedback && (
                <div className='flex gap-1 items-center'>
                  <RateCustom disabled defaultValue={4.5} style={{ fontSize: 12 }} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ItemProduct
