'use client'

import useLanguage from '@/hook/useLanguage'
import { FilterAPI } from '@/constant/app'
import dynamic from 'next/dynamic'
import CategoryHome from './(ComponentHome)/Category'
import useMedia from '@/hook/useMedia'
import InfoHome from './(ComponentHome)/InfoHome'
import Banner from './(ComponentHome)/Banner'
import useAos from '@/hook/useAos'
import { NextPage } from 'next'
const ListProduct = dynamic(() => import('./(ComponentHome)/ListProduct'), {
  ssr: false,
})
const SocialMedia = dynamic(() => import('./(ComponentHome)/SocialMedia'), {
  ssr: false,
})

// const Banner = dynamic(() => import('./(ComponentHome)/Banner'), {
//   ssr: true,
// })

const Home: NextPage = () => {
  useAos(1000)
  const { translate } = useLanguage()
  const { isMobile } = useMedia()

  const renderDesktop = () => {
    return (
      <div>
        <div className="flex  gap-5">
          <div className="w-[250px]" data-aos="fade-right">
            <CategoryHome />
          </div>
          <Banner />
        </div>
        <div className="w-[90%] m-auto my-14">
          <InfoHome />
        </div>
        <div className="w-full flex flex-col gap-4 ">
          <ListProduct title={translate('textPopular.nest')} type={'nest'} />
          <ListProduct title={translate('home.water')} type={FilterAPI.Water} />
        </div>
        <SocialMedia />
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div>
        <Banner />
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

  return (
    <>
      <h1 className="absolute opacity-0">
        TC Store - Cửa hàng thương mãi uy tín nhất Gia Lai
      </h1>
      {isMobile ? renderMobile() : renderDesktop()}
    </>
  )
}

export default Home
