import { generateMetaBase } from '@/utils/serverNext'
import { NextPage, ResolvingMetadata } from 'next'
import { PropsWithChildren } from 'react'
import Container from './Component/Container'
import Header from '@/components/Header'
import ContainerContent from '@/components/ContainerContent'

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
    <>
      <Header />
      <ContainerContent>
        <Container>{children}</Container>
      </ContainerContent>
    </>
  )
}

export default MyPageLayout
