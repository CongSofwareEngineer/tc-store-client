'use client'
import BtnBack from '@/components/BtnBack'
import MyLoading from '@/components/MyLoading'
import useMyCart from '@/hook/tank-query/useMyCart'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import ItemCart from './Component/ItemCart'
import { useEffect, useState } from 'react'
import { PageSizeLimit } from '@/constant/app'
import { cloneData } from '@/utils/functions'
import dynamic from 'next/dynamic'
const TitleItem = dynamic(() => import('./Component/ItemCart/titleItem'), {
  ssr: false,
})

const MyCartScreen = () => {
  const { data, loadMore, isLoading } = useMyCart(PageSizeLimit)
  const { translate } = useLanguage()
  const { isMobile } = useMedia()

  const [listCartFormat, setListCartFormat] = useState<any[]>([])
  useEffect(() => {
    if (data) {
      console.log({ dataFull: data })

      const arr = data.map((e: any) => ({ ...e, selected: false }))
      setListCartFormat(arr)
    }
  }, [data])

  const getMoreData = async () => {
    loadMore()
  }

  const handleSelect = (item: any, index: number) => {
    const dataClone = cloneData(listCartFormat)
    dataClone[index] = item
    setListCartFormat(dataClone)
  }

  const renderList = () => {
    return (
      <>
        <table className="w-full min-w-[700px] bg-white">
          <TitleItem />
          <tbody>
            {listCartFormat.map((e, index) => {
              return (
                <ItemCart
                  callBack={(e) => handleSelect(e, index)}
                  key={index}
                  data={e}
                  noBorder={index === listCartFormat.length - 1}
                />
              )
            })}
          </tbody>
        </table>
        {isLoading && <MyLoading className="mt-5" />}
      </>
    )
  }

  const renderMobile = () => {
    return <div></div>
  }

  const renderDesktop = () => {
    return (
      <div className="w-full">
        <BtnBack
          title={[translate('header.shop'), translate('header.cart')]}
          url={['/shop']}
        />
        <div className="w-full flex gap-5">
          <div className="flex-1  border-2 border-gray-300  overflow-auto">
            {renderList()}
          </div>
          <div className="w-[30%] max-w-[270px] min-w-[200px] border-2 border-gray-300 bg-white">
            <div className="w-full flex flex-col gap-2 items-center">
              <div>{translate('cart.title')}</div>
            </div>
          </div>
        </div>

        <div onClick={getMoreData} className="cursor-pointer">
          getMoreData
        </div>
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default MyCartScreen
