import React from 'react'
import { images } from '@/configs/images'
import Image from 'next/image'
import { AiOutlineRight } from 'react-icons/ai'

type PropsType = {
  clickBack: () => void
  titlePageMain?: string
  titlePage?: string
}

const BtnBackUI = ({ clickBack, titlePageMain, titlePage }: PropsType) => {
  return (
    <div className='flex w-full align-middle justify-start gap-1 mb-3 md:mb-6 items-center '>
      <Image
        fill
        alt={'TC Store Icon Back page '}
        className='cursor-pointer !relative !w-[25px] !h-[25px]'
        src={images.icon.iconBack}
        onClick={clickBack}
      />
      {titlePageMain && (
        <button
          className='cursor-pointer whitespace-nowrap hover:underline text-[16px] text-blue-700 flex gap-1 bg-transparent border-none p-0'
          type='button'
          onClick={clickBack}
        >
          <h2>{titlePageMain}</h2>
          <AiOutlineRight className='black' />
        </button>
      )}
      {titlePage && <h1 className='whitespace-nowrap text-ellipsis overflow-hidden '>{titlePage}</h1>}
    </div>
  )
}

export default BtnBackUI
