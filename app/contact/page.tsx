import React from 'react'
import { generateMetaBase } from '@/utils/serverNext'
import { NextPage, ResolvingMetadata } from 'next'
import ContactScreen from './view'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Liên Hệ TC Store - Kết Nối Nhanh, Hỗ Trợ Tận Tâm',
    override: true,
    des: 'Cần tư vấn hoặc giải đáp thắc mắc? Liên hệ TC Store ngay để được hỗ trợ nhanh chóng. Chúng tôi luôn sẵn sàng giúp bạn với các sản phẩm yến sào, laptop, cây cảnh, nước hoa, cà phê và hơn thế nữa!',
  })
  return metaData
}
const ContactLayout: NextPage = () => {
  return <ContactScreen />
}

export default ContactLayout
