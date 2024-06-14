import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import { Input } from 'antd'
import React from 'react'
import PrimaryButton from '../PrimaryButton'

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
        <Input className="flex-1" />
        <PrimaryButton disabled={!isLogin}>
          {translate('common.Send')}
        </PrimaryButton>
      </div>
    </div>
  )
}

export default Comment
