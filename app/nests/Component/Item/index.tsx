import Link from 'next/link'
import React from 'react'
type ItemNestType = {
  data?: any
}
const ItemNest = ({ data }: ItemNestType) => {
  return (
    <Link className="w-full" href={`/nests/${data?.id}`}>
      <div className="w-full flex flex-col items-center">
        <div className="relative w-full aspect-square bg-green-200">
          <div>5634</div>
        </div>
      </div>
    </Link>
  )
}

export default ItemNest
