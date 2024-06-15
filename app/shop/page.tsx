import { formatSearchParams, generateMetaBase } from '@/utils/serverNext'
import { ResolvingMetadata } from 'next'
import ShopScreen from './view'
import { Suspense } from 'react'
import fetchConfig from '@/configs/fetchConfig'
import { RequestType } from '@/constant/app'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Register',
  })
  return metaData
}

const ShopPage = async ({ searchParams }: any) => {
  const dataQuery = formatSearchParams(searchParams)

  const res = await fetchConfig({
    url: `all-product${dataQuery?.trim() || ''}`,
    method: RequestType.GET,
  })

  return (
    <Suspense>
      <ShopScreen dataShop={res ?? {}} />
    </Suspense>
  )
}

export default ShopPage
