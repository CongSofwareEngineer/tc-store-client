import { generateMetaBase } from '@/utils/serverNext'
import { NextPage, ResolvingMetadata } from 'next'
import Container from './Component/Container'
import { PropsWithChildren } from 'react'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Shop',
  })
  return metaData
}

const MyPageLayout: NextPage = ({ children }: PropsWithChildren) => {
  return <Container>{children}</Container>
}

export default MyPageLayout
