import React, { Suspense } from 'react'
import { generateMetaBase } from '@/utils/serverNext'
import { NextPage, ResolvingMetadata } from 'next'
import PageNestsScreen from './view'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'TS Store - Yến Sào Chất Lượng & Hơn Thế Nữa',
    override: true,
    des: 'TS Store -  Yến sào cao cấp, nguyên chất và chất lượng 100% từ thiên nhiên Gia Lai. Mua sắm ngay để nhận ưu đãi đặc biệt!',
  })
  return metaData
}
const PageNests: NextPage = () => {
  return (
    <Suspense>
      <PageNestsScreen />
    </Suspense>
  )
}

export default PageNests
