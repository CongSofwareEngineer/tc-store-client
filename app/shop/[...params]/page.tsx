import { generateMetaBase } from '@/utils/serverNext'
import { ResolvingMetadata } from 'next'
import ShopDetail from './view'
import { ItemDetailType } from './type'
import { notFound } from 'next/navigation'
import fetchConfig from '@/configs/fetchConfig'

const getCoffeeDetail = async (id: string): Promise<ItemDetailType> => {
  const data = await fetchConfig({
    url: `product/detail/${id}`,
  })

  return data.data
}

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
) {
  const [dataBase, data]: any[] = await Promise.allSettled([
    parent,
    getCoffeeDetail(params.params[0]),
  ])

  const metaData = generateMetaBase({
    dataBase: dataBase?.value,
    image: data?.value?.imageMain,
    title: data?.value?.name,
    des: data?.value?.des,
  })
  return metaData
}
const ShopPageDetail = async ({ params }: any) => {
  const productDetail = await getCoffeeDetail(params.params[0])
  if (!productDetail) {
    return notFound()
  }
  return <ShopDetail productDetail={productDetail} />
}

export default ShopPageDetail
