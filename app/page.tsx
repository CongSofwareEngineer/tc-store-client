'use client'

import useLanguage from '@/hook/useLanguage'
import { FilterAPI } from '@/constant/app'
import dynamic from 'next/dynamic'
import CategoryHome from './(ComponentHome)/Category'
import useMedia from '@/hook/useMedia'
import InfoHome from './(ComponentHome)/InfoHome'
const ListProduct = dynamic(() => import('./(ComponentHome)/ListProduct'), {
  ssr: false,
})

const Home = () => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()

  const renderDesktop = () => {
    return (
      <div>
        <div className="flex  gap-5">
          <div className="w-[250px]">
            <CategoryHome />
          </div>
        </div>
        <div className="w-[90%] m-auto my-14">
          <InfoHome />
        </div>
        <div className="w-full flex flex-col gap-4 ">
          <ListProduct
            title={translate('home.titleFood')}
            type={FilterAPI.Food}
          />
          <ListProduct title={translate('home.water')} type={FilterAPI.Water} />
        </div>
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div>
        <div className="w-[90%] m-auto my-8">
          <InfoHome />
        </div>
        <div className="mb-3" />
        <ListProduct
          title={translate('home.titleFood')}
          type={FilterAPI.Food}
        />
        <div className="mb-3" />
        <ListProduct title={translate('home.water')} type={FilterAPI.Water} />
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default Home
