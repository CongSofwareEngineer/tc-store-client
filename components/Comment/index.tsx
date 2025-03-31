import React from 'react'
import WriteComment from './WriteComment'
import ListComment from './ListComment'
import { IProduct } from '@/services/ClientApi/type'

const Comment = ({ dataItem }: { dataItem: IProduct }) => {
  return (
    <div className='w-full md:mt-4 mt-3 flex flex-col gap-3'>
      <WriteComment dataItem={dataItem} />
      <ListComment dataItem={dataItem} />
    </div>
  )
}

export default Comment
