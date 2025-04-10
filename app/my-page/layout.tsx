import { generateMetaBase } from '@/utils/serverNext'
import { NextPage, ResolvingMetadata } from 'next'
import { PropsWithChildren, Suspense } from 'react'
import Container from './Component/Container'
import Header from '@/components/Header'
import ContainerContent from '@/components/ContainerContent'
import MyLoading from '@/components/MyLoading'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'My Page | TC Store',
    override: true,
  })
  return metaData
}

const MyPageLayout: NextPage = ({ children }: PropsWithChildren) => {
  return (
    <Suspense fallback={<MyLoading />}>
      <Header />
      <ContainerContent>
        <Container>{children}</Container>
      </ContainerContent>
    </Suspense>
  )
}

export default MyPageLayout
