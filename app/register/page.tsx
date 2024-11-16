import { generateMetaBase } from '@/utils/serverNext'
import { NextPage, ResolvingMetadata } from 'next'
import RegisterScreen from './view'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Đăng ký | TC Store',
  })
  return metaData
}

const RegisterPage: NextPage = () => {
  return <RegisterScreen />
}

export default RegisterPage
