import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import React from 'react'
import MyButton from '../MyButton'
import MyInput from '../MyInput'
import { FileImageOutlined } from '@ant-design/icons'

const Comment = ({ idProduct }: { idProduct: string }) => {
  const { isLogin } = useUserData()
  const { translate } = useLanguage()

  return (
    <div className="w-full md:mt-4 mt-3">
      <div className="text-medium font-bold capitalize">
        {translate('textPopular.comment')} :
      </div>
      <div>{idProduct}</div>
      <div className="flex items-center">
        <MyInput type="area" className="flex-1" />
        <FileImageOutlined />
        <MyButton disabled={!isLogin}>{translate('common.Send')}</MyButton>
      </div>
    </div>
  )
}

export default Comment
