import React from 'react'
import { ListItemCartType } from '../../type'
import useMedia from '@/hook/useMedia'
import TitleItem from '../ItemCart/titleItem'
import ItemCart from '../ItemCart'
import MyLoading from '@/components/MyLoading'

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
  console.log({ loading })

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
      <table className="w-full md:min-w-[700px] ">
        {!noTitle && (
          <TitleItem
            allSelected={allSelected}
            noEdit={noEdit}
            dataCart={dataCart}
            callBack={callBackSelectAll}
          />
        )}

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
        {loading && (
          <td colSpan={7}>
            <MyLoading className="my-5" />
          </td>
        )}
      </table>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default ListItemCart
