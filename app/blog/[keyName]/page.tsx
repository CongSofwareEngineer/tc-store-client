import BlogScreen from './view'

import Header from '@/components/Header'
import ClientApi from '@/services/clientApi'
import { IProduct } from '@/services/ClientApi/type'

const getData = async (keyName: string): Promise<IProduct> => {
  const data = await ClientApi.getProductByKeyName(keyName)

  return data.data
}

const BlogPage = async ({ params }: any) => {
  // const { keyName } = await params
  //  // console.log({ keyName })

  // const productDetail = await getData(keyName)
  // if (!productDetail) {
  //   return notFound()
  // }

  return (
    <>
      <Header />
      <BlogScreen data={null as any} />
    </>
  )
}

export default BlogPage
