import React from 'react'
import { ListItemCartType } from '../../type'
import useMedia from '@/hook/useMedia'
import TitleItem from '../ItemCart/titleItem'
import ItemCart from '../ItemCart'
import MyLoading from '@/components/MyLoading'
import useLanguage from '@/hook/useLanguage'
import { Checkbox } from 'antd'
import MyCheckBox from '@/components/MyCheckBox'

const ListItemCart = ({
  dataCart,
  callBackClick = () => {},
  callBackDelete = () => {},
  callBackSelectAll = () => {},
  loading = true,
  noEdit = false,
  noTitle = false,
  allSelected = false,
}: ListItemCartType) => {
  const { isMobile } = useMedia()
  const { translate } = useLanguage()

  const renderMobile = () => {
    return (
      <>
        {!noTitle && (
          <table className="w-full md:min-w-[700px] ">
            <TitleItem
              allSelected={allSelected}
              noEdit={noEdit}
              dataCart={dataCart}
              callBack={callBackSelectAll}
            />
          </table>
        )}
        {loading && <MyLoading className="my-5" />}
        {dataCart.map((e, index) => {
          return (
            <ItemCart
              noEdit={noEdit}
              callBack={(e) => callBackClick(e, index)}
              callBackDelete={() => callBackDelete(index)}
              key={index}
              data={e}
              noBorder={index === dataCart.length - 1}
            />
          )
        })}
      </>
    )
  }

  const renderDesktop = () => {
    return (
      <>
        <div className="w-full flex gap-3 items-center p-3 pb-4  border-b-[3px] border-gray-200 font-bold">
          <div className="w-8 flex items-center justify-center">
            <MyCheckBox
              alt="check-all"
              value={allSelected}
              onClick={() => callBackSelectAll(!allSelected)}
            />
          </div>
          <div className="w-[120px] text-center">
            {translate('textPopular.image')}
          </div>
          <div className="flex flex-1 justify-center-center items-center">
            <div>{translate('textPopular.product')}</div>
          </div>
        </div>
        {dataCart.map((e, index) => {
          return (
            <ItemCart
              noEdit={noEdit}
              callBack={(e) => callBackClick(e, index)}
              callBackDelete={async () => callBackDelete(index)}
              key={index}
              data={e}
              noBorder={index === dataCart.length - 1}
            />
          )
        })}
        {loading && (
          <div className="flex justify-center w-full">
            <MyLoading className="my-5" />
          </div>
        )}
      </>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default ListItemCart
