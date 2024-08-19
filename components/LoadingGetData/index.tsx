import { TYPE_LOADING_GET_DATA } from '@/constant/app'
import useMedia from '@/hook/useMedia'
import React from 'react'
import MySkeleton from '../MySkeleton'
type Props = {
  loading?: boolean
  type: TYPE_LOADING_GET_DATA
}
const LoadingGetData = ({
  type = TYPE_LOADING_GET_DATA.MyBill,
  loading = false,
}: Props) => {
  const { isMobile } = useMedia()

  if (!loading) {
    return <></>
  }

  switch (type) {
    case TYPE_LOADING_GET_DATA.MyBill:
      return isMobile ? (
        <div className="flex flex-col gap-3 w-full mt-3 ">
          <MySkeleton className="w-full h-20  rounded-md" />
          <MySkeleton className="w-full h-20  rounded-md" />
          <MySkeleton className="w-full h-20  rounded-md" />
        </div>
      ) : (
        <div className="flex flex-col gap-3 w-full mt-3 ">
          <MySkeleton className="w-full h-20 rounded-md" />
          <MySkeleton className="w-full h-20 rounded-md" />
          <MySkeleton className="w-full h-20 rounded-md" />
        </div>
      )

    case TYPE_LOADING_GET_DATA.Shop:
      return (
        <div className="flex flex-col gap-4 w-full mt-4">
          <MySkeleton className="w-full items-center flex gap-2 flex-col p-5 rounded-lg aspect-square">
            <MySkeleton className="w-[100%] aspect-square " />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
          </MySkeleton>
          <MySkeleton className="w-full items-center flex gap-2 flex-col p-5 rounded-lg aspect-square">
            <MySkeleton className="w-[100%] aspect-square " />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
          </MySkeleton>
          <MySkeleton className="w-full items-center flex gap-2 flex-col p-5 rounded-lg aspect-square">
            <MySkeleton className="w-[100%] aspect-square " />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
          </MySkeleton>
          <MySkeleton className="w-full items-center flex gap-2 flex-col p-5 rounded-lg aspect-square">
            <MySkeleton className="w-[100%] aspect-square " />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
            <MySkeleton className="w-full h-6" />
          </MySkeleton>
          {!isMobile && (
            <>
              <MySkeleton className="w-full items-center flex gap-2 flex-col p-5 rounded-lg aspect-square">
                <MySkeleton className="w-[100%] aspect-square " />
                <MySkeleton className="w-full h-6" />
                <MySkeleton className="w-full h-6" />
                <MySkeleton className="w-full h-6" />
              </MySkeleton>
              <MySkeleton className="w-full items-center flex gap-2 flex-col p-5 rounded-lg aspect-square">
                <MySkeleton className="w-[100%] aspect-square " />
                <MySkeleton className="w-full h-6" />
                <MySkeleton className="w-full h-6" />
                <MySkeleton className="w-full h-6" />
              </MySkeleton>
            </>
          )}
        </div>
      )

    case TYPE_LOADING_GET_DATA.ListProductInHome:
      return (
        <div className="w-full flex gap-3">
          <MySkeleton className="sm:w-[30%] w-[48%] md:pb-[300px] pb-[150px] rounded-lg" />
          <MySkeleton className="sm:w-[30%] w-[48%] md:pb-[300px] pb-[150px] rounded-lg" />
          {!isMobile && (
            <MySkeleton className="w-[30%] md:pb-[300px] pb-[150px] rounded-lg" />
          )}
        </div>
      )

    case TYPE_LOADING_GET_DATA.MyCart:
      return (
        <div className="w-full flex gap-4 h-ful">
          <div className="flex flex-1 flex-col gap-3">
            <MySkeleton className=" w-full rounded-lg h-12" />
            <MySkeleton className=" w-full rounded-lg h-[30vh]" />
            <MySkeleton className=" w-full rounded-lg h-[30vh]" />
          </div>
          <MySkeleton className="lg:w-[300px]   rounded-lg lg:h-[50vh]" />
        </div>
      )

    default:
      return <></>
  }
}

export default LoadingGetData
