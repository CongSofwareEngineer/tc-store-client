import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
const ContainerItemNests = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  :hover {
    .img-item {
      transform: scale(1.05);
      transition: all 0.3s ease-in-out;
    }
  }
`
const ItemNest = ({ data }: { data: Record<string, any> | null }) => {
  return (
    <Link
      className="w-full cursor-pointer relative"
      href={`/nests/${data?.id}`}
    >
      <div className="absolute right-0 top-4 bg-green-300 px-3 rounded-l-lg z-20">
        {data?.discount || 0}%
      </div>
      <ContainerItemNests className="w-full flex flex-col items-center justify-center">
        <div className="relative w-full aspect-square  overflow-hidden">
          <MyImage
            src={data?.imageMain || images.footer.iconFace}
            alt={data?.name}
            className="w-full h-auto img-item"
          />
        </div>
        <div></div>
      </ContainerItemNests>
    </Link>
  )
}

export default ItemNest
