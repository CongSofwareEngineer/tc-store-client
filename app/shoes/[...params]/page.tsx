import { generateMetaBase } from '@/utils/serverNext'
import { ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { IProduct } from './type'
import ShoesDetailScreen from './view'
import ContainerContent from '@/components/ContainerContent'
import Header from '@/components/Header'
import { PageProps } from '@/.next/types/app/page'
import ClientApi from '@/services/ClientApi/index'

const getCoffeeDetail = async (keyName: string): Promise<IProduct> => {
  const data: IProduct = await ClientApi.getProductByKeyName(keyName)

  return data
}

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata) {
  const { params: paramsProduct } = await params

  const [dataBase, data]: any[] = await Promise.allSettled([
    parent,
    getCoffeeDetail(paramsProduct[0]),
  ])

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

  const productDetail = await getCoffeeDetail(paramsProduct[0])
  if (!productDetail) {
    return notFound()
  }
  return (
    <>
      <Header />
      <ContainerContent>
        <ShoesDetailScreen productDetail={productDetail} />
      </ContainerContent>
    </>
  )
}

export default ShopPageDetail
