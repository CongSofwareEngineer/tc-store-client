import React, { useEffect, useState } from 'react'
import MySkeleton from '../MySkeleton'
import useMedia from '@/hook/useMedia'

const Loading = () => {
  const { isMobile: isSurface } = useMedia(1024)
  const { isMobile: isTablet } = useMedia(768)

  const { isMobile } = useMedia(568)
  const [arrClo, setArrClo] = useState<string[]>([])

  useEffect(() => {
    let amountCol = 5
    if (isSurface) {
      amountCol = 4
    }
    if (isTablet) {
      amountCol = 3
    }
    if (isMobile) {
      amountCol = 2
    }
    let arrInit: string[] = []

    for (let index = 0; index < amountCol; index++) {
      arrInit.push(`col-${index}`)
    }
    setArrClo(arrInit)
  }, [isSurface, isTablet, isMobile])

  return (
    <div className='grid md:gap-3 gap-2' style={{ gridTemplateColumns: `repeat(${arrClo.length}, minmax(0, 1fr))` }}>
      {arrClo.map((e) => {
        return (
          <MySkeleton key={e} className='w-full items-center flex gap-2 flex-col md:p-5 p-3 rounded-lg aspect-square'>
            <MySkeleton className='w-[100%] aspect-square ' />
            <MySkeleton className='w-full h-6' />
            <MySkeleton className='w-full h-6' />
            <MySkeleton className='w-full h-6' />
          </MySkeleton>
        )
      })}
    </div>
  )
}

export default Loading
