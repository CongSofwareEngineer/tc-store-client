'use client'
import BtnBack from '@/components/BtnBack'
import MyLoading from '@/components/MyLoading'
import useMyCart from '@/hook/tank-query/useMyCart'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'

const MyCartScreen = () => {
  const { listData, loadMore, isLoading } = useMyCart(1)
  const { translate } = useLanguage()
  const { isMobile } = useMedia()

  const getMoreData = async () => {
    loadMore()
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
        {isLoading && <MyLoading />}
        <div>MyCartScreen {listData.length}</div>
        <div onClick={getMoreData} className="cursor-pointer">
          getMoreData
        </div>
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default MyCartScreen
