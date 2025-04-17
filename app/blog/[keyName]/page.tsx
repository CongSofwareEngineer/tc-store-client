import { PageProps } from '@/.next/types/app/page'
import React from 'react'
import BlogScreen from './view'
import ClientApi from '@/services/clientApi'
import { notFound } from 'next/navigation'
import { IProduct } from '@/services/ClientApi/type'
import Header from '@/components/Header'

const getData = async (keyName: string): Promise<IProduct> => {
  const data = await ClientApi.getProductByKeyName(keyName)

  return data.data
}

const BlogPage = async ({ params }: PageProps) => {
  // const { keyName } = await params
  // console.log({ keyName })

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
