import { generateMetaBase } from '@/utils/serverNext'
import { ResolvingMetadata } from 'next'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Register',
  })
  return metaData
}

const ShopPage = ({ children }: { children: React.ReactNode }) => {
  return children
}

export default ShopPage
