'use client'

import React from 'react'
import { ConfigProvider } from 'antd'
import { useRouter } from 'next/navigation'
import PrimaryButton from '@/components/PrimaryButton'

const HomePage = () => {
  const router = useRouter()
  return (
    <ConfigProvider>
      <div>home page</div>
      <PrimaryButton
        onClick={() => router.push('/shop?typeProduct=water,food,technology')}
      >
        shopping
      </PrimaryButton>
    </ConfigProvider>
  )
}

export default HomePage
