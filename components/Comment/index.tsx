import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import React from 'react'
import MyButton from '../MyButton'
import MyInput from '../MyInput'
import { FileImageOutlined } from '@ant-design/icons'
import useMedia from '@/hook/useMedia'
import WriteComment from './WriteComment'
import { ItemDetailType } from '../InfoItemDetail/type'

const Comment = ({ dataItem }: { dataItem: ItemDetailType }) => {
  const { isLogin } = useUserData()
  const { translate } = useLanguage()
  const { isMobile } = useMedia()

  return (
    <div className="w-full md:mt-4 mt-3">
      <WriteComment dataItem={dataItem} />
      {/* <div className="md:mt-5" />
      <div className="text-medium font-bold capitalize">
        {translate('textPopular.comment')} :
      </div>
      <div>{dataItem._id}</div>
      <div className="flex items-center gap-2">
        <MyInput type="area" className="flex-1" />
        <FileImageOutlined className="text-[30px] cursor-pointer" />
        <MyButton disabled={!isLogin}>{translate('common.Send')}</MyButton>
      </div> */}
    </div>
  )
}

export default Comment
