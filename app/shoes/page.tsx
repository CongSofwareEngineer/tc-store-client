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
    <>
      <h1 className='sr-only'>TC Store - Cửa Hàng Giày Dép Thời Trang & Chất Lượng Cao</h1>
      <h2 className='sr-only'>Giày Nam - Phong Cách & Bền Bỉ</h2>
      <h2 className='sr-only'>Giày Nữ - Sang Trọng & Thanh Lịch</h2>
      <h2 className='sr-only'>Giày Thể Thao - Năng Động & Êm Ái</h2>
      <h2 className='sr-only'>Giày Trẻ Em - Đáng Yêu & Thoải Mái</h2>
      <h2 className='sr-only'>Ưu Đãi Đặc Biệt Cho Các Mẫu Giày Hot</h2>
      <h2 className='sr-only'>Hướng Dẫn Chọn Size Giày Chính Xác</h2>
      <h2 className='sr-only'>Đánh Giá & Phản Hồi Từ Khách Hàng</h2>
      <Suspense>
        <ShoesScreen />
      </Suspense>
    </>
  )
}

export default PageShoes
