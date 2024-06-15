import React, { Suspense } from 'react'
import { generateMetaBase } from '@/utils/serverNext'
import { ResolvingMetadata } from 'next'
import PageNestsScreen from './view'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Yến',
  })
  return metaData
}
const PageNests = () => {
  return (
    <Suspense>
      <PageNestsScreen />
    </Suspense>
  )
}

export default PageNests
