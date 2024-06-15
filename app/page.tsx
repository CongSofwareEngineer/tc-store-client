'use client'

import useLanguage from '@/hook/useLanguage'
import { FilterAPI } from '@/constant/app'
import dynamic from 'next/dynamic'
import CategoryHome from './(ComponentHome)/Category'
import Media from 'react-media'
import { Suspense } from 'react'
const ListProduct = dynamic(() => import('./(ComponentHome)/ListProduct'), {
  ssr: false,
})

const InfoHome = dynamic(() => import('./(ComponentHome)/InfoHome'))

const Home = () => {
  const { translate } = useLanguage()

  const renderDesktop = () => {
    return (
      <div>
        <div className="flex  gap-5">
          <div className="w-[250px]">
            <Suspense>
              <CategoryHome />
            </Suspense>
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

export default Home
