import { generateMetaBase } from '@/utils/serverNext'
import { ResolvingMetadata } from 'next'
import ShopScreen from './view'
import { Suspense } from 'react'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Register',
  })
  return metaData
}

const ShopPage = () => {
  return (
    <Suspense>
      <ShopScreen />
    </Suspense>
  )
}

export default ShopPage
