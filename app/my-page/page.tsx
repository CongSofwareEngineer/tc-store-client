import React, { Suspense } from 'react'
import { NextPage } from 'next'
import ProfileScreen from './view'
import MyLoading from '@/components/MyLoading'

const MyPageScreen: NextPage = () => {
  return (
    <Suspense
      fallback={
        <div className=' flex justify-center items-center w-screen h-screen'>
          <MyLoading />
        </div>
      }
    >
      <ProfileScreen />
    </Suspense>
  )
}

export default MyPageScreen
