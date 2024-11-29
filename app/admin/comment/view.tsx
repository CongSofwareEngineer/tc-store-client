'use client'
import ImageAdmin from '@/components/ImageAdmin'
import TextCopy from '@/components/TextCopy'
import useCommentAdmin from '@/hook/tank-query/Admin/useCommentAdmin'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useSearchBaseAdmin from '@/hook/useSearchBaseAdmin'
import Link from 'next/link'
import React from 'react'

const CommentClient = () => {
  const { renderContent } = useSearchBaseAdmin()
  const { isMobile } = useMedia()
  const { translate } = useLanguage()
  const { data, isLoading } = useCommentAdmin()
  const renderItem = (item: any, index: number) => {
    return (
      <div key={`item_${index}`} className='flex flex-col we-full'>
        <div className='flex items-center w-full'>
          <div className='md:w-[150px] w-[80px] flex items-center justify-center'>
            <div className='md:w-[130px] w-[70px] aspect-square relative overflow-hidden'>
              <ImageAdmin src={item?.image} className='w-full' />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Link href={`/shop/${item.keyName}`}>
              <div className='text-black font-bold'>{item?.name}</div>
            </Link>
            <div className='flex items-center gap-2'>
              <div>SDT</div>
              <TextCopy value={item?.sdt} />
            </div>
            <div className='flex items-center gap-2'>
              <div>SDT</div>
              <TextCopy value={item?.sdt} />
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='flex flex-col gap-2'>
      {renderContent()}
      <div className='w-full flex items-center '>
        <div className='md:w-[150px] w-[80px] flex items-center justify-center'>{translate('textPopular.image')}</div>
        <div className='flex flex-1'>{translate('textPopular.infor')}</div>
        {!isMobile && <div className='flex flex-1'>.</div>}
      </div>
      <div className='flex flex-col w-full'>
        {!isLoading &&
          data.map((e, index) => {
            return renderItem(e, index)
          })}
      </div>
    </div>
  )
}

export default CommentClient
