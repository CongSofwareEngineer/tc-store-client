import { generateMetaBase } from '@/utils/serverNext'
import { ResolvingMetadata } from 'next'
import RegisterPageScreen from './view'

export async function generateMetadata(_: any, parent: ResolvingMetadata) {
  const dataBase = await parent
  const metaData = generateMetaBase({
    dataBase,
    title: 'Register',
  })
  return metaData
}

const RegisterPage = () => {
  return <RegisterPageScreen />
}

export default RegisterPage
