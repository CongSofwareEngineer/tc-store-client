import React from 'react'
import { generateMetaBase } from '@/utils/serverNext'

export async function generateMetadata(_: any, parent: any) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Yến',
  })
  return metaData
}
const LayoutNests = ({ children }: { children: React.ReactNode }) => {
  return children
}

export default LayoutNests
