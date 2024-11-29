import { generateMetaBase } from '@/utils/serverNext'
import { NextPage, ResolvingMetadata } from 'next'
import ShopScreen from './view'
import { Suspense } from 'react'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'TC Store - Yến Sào, Laptop, Cây Cảnh, Nước Hoa, Cà Phê Chất Lượng & Hơn Thế Nữa',
    override: true,
    des: 'TC Store - Cửa hàng đa dạng: yến sào cao cấp, laptop hiện đại, cây cảnh đẹp, nước hoa chính hãng, cà phê nguyên chất và nhiều sản phẩm tốt khác. Mua sắm ngay để nhận ưu đãi đặc biệt!',
  })
  return metaData
}

const ShopPage: NextPage = () => {
  return (
    <Suspense>
      <ShopScreen />
    </Suspense>
  )
}

export default ShopPage
