import { generateMetaBase } from '@/utils/serverNext'
import { ResolvingMetadata } from 'next'

import { notFound } from 'next/navigation'
import ClientApi from '@/services/clientApi'
import { IProduct } from '@/app/shoes/[...params]/type'
import ShopDetailScreen from './view'
import ContainerContent from '@/components/ContainerContent'
import Header from '@/components/Header'
import { PageProps } from '@/.next/types/app/page'

const getData = async (keyName: string): Promise<IProduct> => {
  const data = await ClientApi.getProductByKeyName(keyName)

  return data.data
}

export async function generateMetadata({ params }: any, parent: ResolvingMetadata) {
  const { params: paramsProduct } = await params

  const [dataBase, data]: any[] = await Promise.allSettled([parent, getData(paramsProduct[0])])
  const metaData = generateMetaBase({
    dataBase: dataBase?.value,
    image: data?.value?.imageMain,
    title: data?.value?.titleSeo || data?.value?.name,
    des: data?.value?.desSeo || data?.value?.des,
    override: true,
  })
  return metaData
}
const ShopPageDetail = async ({ params }: PageProps) => {
  const { params: paramsProduct } = await params

  const productDetail = await getData(paramsProduct[0])
  if (!productDetail) {
    return notFound()
  }
  return (
    <>
      <Header />
      <ContainerContent>
        <ShopDetailScreen productDetail={productDetail} />
      </ContainerContent>
    </>
  )
}

export default ShopPageDetail
