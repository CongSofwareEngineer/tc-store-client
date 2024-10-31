import React from 'react'
import { generateMetaBase } from '@/utils/serverNext'
import { NextPage, ResolvingMetadata } from 'next'
import ContactScreen from './view'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Liên hệ',
  })
  return metaData
}
const ContactLayout: NextPage = () => {
  return <ContactScreen />
}

export default ContactLayout
