import { generateMetaBase } from '@/utils/serverNext'
import { NextPage, ResolvingMetadata } from 'next'
import ShopScreen from './view'
import { Suspense } from 'react'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Shop',
    override: true,
  })
  return metaData
}

const ShopPage: NextPage = () => {
  return (
    <Suspense>
      <ShopScreen />
    </Suspense>
  )
}

export default ShopPage
