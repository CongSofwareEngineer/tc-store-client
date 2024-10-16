import { ItemDetailType } from '@/components/InfoItemDetail/type'
import React from 'react'

const InfoDetail = ({ dataItem }: { dataItem: ItemDetailType }) => {
  return (
    <div
      className="flex flex-col gap-2 w-full"
      dangerouslySetInnerHTML={{
        __html: dataItem?.des2 || '',
      }}
    />
  )
}

export default InfoDetail
