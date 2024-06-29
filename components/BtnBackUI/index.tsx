import React from 'react'
import MyImage from '../MyImage'
import { images } from '@/configs/images'
import { RightOutlined } from '@ant-design/icons'

type PropsType = {
  clickBack: () => void
  titlePageMain?: string
  titlePage?: string
}

const BtnBackUI = ({ clickBack, titlePageMain, titlePage }: PropsType) => {
  return (
    <div className="flex w-full align-middle justify-start gap-1 mb-3 md:mb-6 items-center ">
      <MyImage
        onClick={clickBack}
        src={images.icon.iconBack}
        widthImage={'25px'}
        heightImage={'25px'}
        alt={'TC Store Icon Back page '}
        className="cursor-pointer"
      />
      <a
        onClick={clickBack}
        className="cursor-pointer hover:underline text-[16px] text-blue-700 flex gap-1"
      >
        <h2>{titlePageMain}</h2>
        <RightOutlined className="black" />
      </a>
      <h1 className=" ">{titlePage}</h1>
    </div>
  )
}

export default BtnBackUI
