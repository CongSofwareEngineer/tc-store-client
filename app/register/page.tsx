import { generateMetaBase } from '@/utils/serverNext'
import { NextPage, ResolvingMetadata } from 'next'
import RegisterScreen from './view'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Đăng Ký Tài Khoản tại TC Store - Mua Sắm Đa Sản Phẩm Dễ Dàng',
    override: true,
    des: 'Tạo tài khoản tại TC Store để trải nghiệm mua sắm tiện lợi: yến sào cao cấp, laptop hiện đại, cây cảnh đẹp, nước hoa chính hãng và cà phê nguyên chất. Đăng ký ngay để nhận ưu đãi hấp dẫn!'
  })
  return metaData
}

const RegisterPage: NextPage = () => {
  return <RegisterScreen />
}

export default RegisterPage
