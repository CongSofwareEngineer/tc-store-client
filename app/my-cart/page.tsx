import React, { Suspense } from 'react'
import { generateMetaBase } from '@/utils/serverNext'
import { ResolvingMetadata } from 'next'
import MyCartScreen from './view'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Giỏ hàng',
  })
  return metaData
}
const MyCartPage = () => {
  return (
    <Suspense>
      <MyCartScreen />
    </Suspense>
  )
}

export default MyCartPage
