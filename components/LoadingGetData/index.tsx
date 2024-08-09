import { TYPE_LOADING_GET_DATA } from '@/constant/app'
import useMedia from '@/hook/useMedia'
import React, { useMemo } from 'react'
type Props = {
  loading?: boolean
  type: TYPE_LOADING_GET_DATA
}
const LoadingGetData = ({
  type = TYPE_LOADING_GET_DATA.MyBill,
  loading = false,
}: Props) => {
  const { isMobile } = useMedia()

  const component = useMemo(() => {
    if (!loading) {
      return <></>
    }

    switch (type) {
      case TYPE_LOADING_GET_DATA.MyBill:
        return isMobile ? (
          <div className="flex flex-col gap-3 w-full mt-3 ">
            <div className="w-full h-20 skeleton-loading rounded-md" />
            <div className="w-full h-20 skeleton-loading rounded-md" />
            <div className="w-full h-20 skeleton-loading rounded-md" />
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full mt-3 ">
            <div className="w-full h-20 skeleton-loading rounded-md" />
            <div className="w-full h-20 skeleton-loading rounded-md" />
            <div className="w-full h-20 skeleton-loading rounded-md" />
          </div>
        )

      case TYPE_LOADING_GET_DATA.Shop:
        return (
          <div className="flex flex-col gap-4 w-full mt-4">
            <div className="skeleton-loading gap-3 grid grid-cols-3">
              <div className="w-full skeleton-loading rounded-lg aspect-square" />
              <div className="w-full skeleton-loading rounded-lg aspect-square" />
              <div className="w-full skeleton-loading rounded-lg aspect-square" />
            </div>
          </div>
        )

      case TYPE_LOADING_GET_DATA.ListProductInHome:
        return (
          <div className="w-full flex gap-3">
            <div className="skeleton-loading sm:w-[30%] w-[48%] md:pb-[300px] pb-[150px] rounded-lg" />
            <div className="skeleton-loading sm:w-[30%] w-[48%] md:pb-[300px] pb-[150px] rounded-lg" />
            {!isMobile && (
              <div className="skeleton-loading w-[30%] md:pb-[300px] pb-[150px] rounded-lg" />
            )}
          </div>
        )

      default:
        return <></>
    }
  }, [isMobile, type, loading])

  return component
}

export default LoadingGetData
