import MyImage from '../MyImage'
import { RateCustom, TextPriceBase } from './styled'
import styles from './style.module.scss'
import Link from 'next/link'
import useLanguage from '@/hook/useLanguage'
import { images } from '@/configs/images'
import {
  formatPrice,
  formatPriceBase,
  numberWithCommas,
} from '@/utils/functions'
import MySliderSell from '../MySliderSell'
import useMedia from '@/hook/useMedia'
import styled from 'styled-components'
const LinkCustom = styled(Link)`
  user-select: none;
  .img {
    transition: all 0.3s ease-in-out;
  }
  @media screen and (min-width: 768px) {
    &:hover {
      .img {
        transform: scale(1.12);
      }
    }
  }
`
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
    <LinkCustom
      className={` relative item-list cursor-pointer px-3 pt-6 md:pb-4 pb-3 gap-3 flex items-center justify-between flex-col ${styles['item-coffee']} ${className}`}
      onClick={callback}
      href={href}
    >
      {showDiscount && item?.discount > 0 && (
        <div className="absolute right-0 top-4 bg-green-300 px-3 rounded-l-lg z-[1]">
          {item?.discount || 0}%
        </div>
      )}

      <div className=" m-auto max-w-[85%] relative w-full aspect-square  overflow-hidden">
        <MyImage
          src={item?.imageMain || images.userDetail.iconUserDetail}
          alt={`item-${item?.name || href}`}
          heightImage="auto  "
          className="img select-none"
        />
      </div>
      <div className="w-full gap-1 flex flex-col">
        <p className="w-full text-medium font-bold">{item?.name}</p>
        <TextPriceBase className=" w-full ">
          {`${formatPriceBase(item?.price || 150)} VNĐ`}
        </TextPriceBase>

        <div className="w-full  text-green-600 md:text-[24px] text-[18px] font-bold flex justify-between  ">
          {formatPrice(item?.price || 150)}
          <span className="text-[16px] ml-3[px] h-ful flex items-center relative top-[2px]">
            VNĐ
          </span>
        </div>
        {!isMobile && (
          <MySliderSell
            total={item.amount}
            sell={item.sold}
            className={'text-[12px]'}
          />
        )}

        {showSold && (
          <div className="md:mt-2 text-[11px] flex w-full justify-between items-center">
            <span>{`${translate('productDetail.sold')}  ${numberWithCommas(
              item.sold || '0'
            )}`}</span>

            {showFeedback && (
              <div className="flex gap-1 items-center">
                <RateCustom
                  disabled
                  defaultValue={4.5}
                  style={{ fontSize: 12 }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </LinkCustom>
  )
}

export default ItemProduct
