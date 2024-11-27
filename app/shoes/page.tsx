import React, { Suspense } from 'react'
import { generateMetaBase } from '@/utils/serverNext'
import { NextPage, ResolvingMetadata } from 'next'
import ShoesScreen from './view'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Mua Giày Dép Thời Trang - Đa Dạng Mẫu Mã, Giá Tốt Nhất | TC Store',
    override: true,
    des: 'Khám phá bộ sưu tập giày dép thời trang tại TC Store. Từ giày thể thao, giày cao gót, đến dép sandal thoải mái, tất cả đều được chọn lọc kỹ càng với giá cực ưu đãi. Đặt mua ngay để nhận ưu đãi hấp dẫn!',
  })
  return metaData
}
const PageShoes: NextPage = () => {
  return (
    <Suspense>
      <ShoesScreen />
    </Suspense>
  )
}

export default PageShoes
