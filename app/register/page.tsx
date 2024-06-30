import { generateMetaBase } from '@/utils/serverNext'
import { ResolvingMetadata } from 'next'
import RegisterScreen from './view'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Đâng ký',
  })
  return metaData
}

const RegisterPage = () => {
  return <RegisterScreen />
}

export default RegisterPage
