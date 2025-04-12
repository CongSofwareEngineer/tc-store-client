import React, { useState } from 'react'
import MyImage from '../MyImage'
import { useModalAdmin } from '@/zustand/useModalAdmin'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import { detectImg } from '@/utils/functions'

const MyImageZoom = ({ url }: { url: string }) => {
  const [isHover, setIsHover] = useState(false)
  const { openModal } = useModalAdmin()
  const { translate } = useLanguage()
  const { isClient } = useMedia()

  const onClick = () => {
    openModal({
      body: (
        <div className='w-[90%] flex justify-center items-center h-[90%]'>
          <MyImage
            alt={url}
            className='!w-auto !h-full !max-w-full !max-h-full'
            src={detectImg(url)}
          />
        </div>
      ),

      className: '!md:min-h-[600px] !min-h-[300px]',
    })
  }
  return (
    <div
      onMouseLeave={() => setIsHover(false)}
      onMouseEnter={() => setIsHover(true)}
      className='w-full h-full relative '
      onClick={onClick}
    >
      <MyImage alt='img' src={detectImg(url)} className='!w-full !h-full' />
      {isHover && isClient && (
        <div className='absolute cursor-pointer top-0 left-0 w-full flex justify-center items-center h-full bg-black/50'>
          <div className='text-white flex justify-center items-center'>
            {translate('common.view')}
          </div>
        </div>
      )}
    </div>
  )
}

export default MyImageZoom
