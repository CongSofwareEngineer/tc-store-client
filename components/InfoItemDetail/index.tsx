import React from 'react'
import Media from 'react-media'
import { ItemDetailType } from './type'
import { Rate } from 'antd'
import useLanguage from '@/hook/useLanguage'
import { numberWithCommas } from '@/utils/functions'

const InfoItemDetail = ({ data }: { data: ItemDetailType }) => {
  const { translate } = useLanguage()

  const renderItemDes = (title: string, des?: any) => {
    return des ? (
      <div className="flex md:gap-3 gap-[10px]">
        <span className="font-bold whitespace-nowrap">{`${title} :`}</span>
        <span>{typeof des === 'number' ? numberWithCommas(des) : des}</span>
      </div>
    ) : (
      <></>
    )
  }

  const renderDesktop = () => {
    return (
      <div className="w-full flex flex-col gap-2  ">
        <div className="flex gap-1 items-center">
          <Rate disabled defaultValue={4.5} style={{ fontSize: 18 }} />
        </div>
        {renderItemDes(translate('textPopular.description'), data.des)}
        {renderItemDes(translate('productDetail.sold'), Number(data.sold))}
        {renderItemDes(translate('productDetail.weight'), data.weight)}
        {renderItemDes(
          translate('productDetail.totalNumber'),
          Number(data.amount)
        )}
        {renderItemDes(
          translate('textPopular.freeShip'),
          'Free ship trong 20 KM'
        )}
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div className="w-full flex flex-col gap-2 ">
        <div className="flex gap-1 items-center">
          <Rate disabled defaultValue={4.5} style={{ fontSize: 18 }} />
        </div>
        {renderItemDes(translate('textPopular.description'), data.des)}
        {renderItemDes(translate('productDetail.sold'), Number(data.sold))}
        {renderItemDes(translate('productDetail.weight'), data.weight)}
        {renderItemDes(
          translate('productDetail.totalNumber'),
          Number(data.amount)
        )}
        {renderItemDes(
          translate('textPopular.freeShip'),
          'Free ship trong 20 KM'
        )}
      </div>
    )
  }

  return (
    <Media query="(min-width: 768px)">
      {(match) => {
        if (match) {
          return renderDesktop()
        }
        return renderMobile()
      }}
    </Media>
  )
}

export default InfoItemDetail
