import { generateMetaBase } from '@/utils/serverNext'
import { ResolvingMetadata } from 'next'
import ShopScreen from './view'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Shop',
    override: true,
  })
  return metaData
}

const ShopPage = async () => {
  return <ShopScreen />
}

export default ShopPage
