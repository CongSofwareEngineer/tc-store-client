import React from 'react'
import { generateMetaBase } from '@/utils/serverNext'
import { ResolvingMetadata } from 'next'
import AboutScreen from './view'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Thông tin',
  })
  return metaData
}
const AboutLayout = () => {
  return <AboutScreen />
}

export default AboutLayout
