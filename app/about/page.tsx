import React, { Suspense } from 'react'
import { generateMetaBase } from '@/utils/serverNext'
import { ResolvingMetadata } from 'next'
import AboutScreen from './view'
import ClientApi from '@/services/clientApi'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent

  const metaData = generateMetaBase({
    dataBase,
    title: 'Thông tin',
  })
  return metaData
}
const AboutLayout = async () => {
  const res = await ClientApi.getAbout()

  return (
    <Suspense>
      <AboutScreen data={res} />
    </Suspense>
  )
}

export default AboutLayout
