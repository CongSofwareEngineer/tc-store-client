import { FirebaseProduct } from '@/services/firebaseService'
import { generateMetaBase } from '@/utils/serverNext'
import { ResolvingMetadata } from 'next'
import ShopDetail from './pageClient'
import { ItemDetailType } from './type'

const getCoffeeDetail = async (id: string): Promise<ItemDetailType> => {
  const data = await FirebaseProduct.getDataByID(id)
  return data
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
const LayoutShopDetail = async ({ params }: any) => {
  const productDetail = await getCoffeeDetail(params.params[0])
  return <ShopDetail productDetail={productDetail} />
}

export default LayoutShopDetail
