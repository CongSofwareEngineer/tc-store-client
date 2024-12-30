'use client'
import React, { useLayoutEffect } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import useAos from '@/hook/useAos'
import { useCategoryMenu } from '@/zustand/useCategoryMenu'
import { useUserData } from '@/zustand/useUserData'

const ClientRender = ({
  children,
  menuCategory = [],
}: {
  children: React.ReactNode
  menuCategory: any[]
}) => {
  useAos()
  const { setCategoryMenu } = useCategoryMenu()
  const { loadDataLocal } = useUserData()

  useLayoutEffect(() => {
    console.log({ env: process.env.NEXT_PUBLIC_DISABLE_DEV })

    setCategoryMenu(menuCategory)
    loadDataLocal()
  }, [])

  return (
    <>
      <Header />
      <main className='main-content w-full flex justify-center min-h-[calc(100dvh-56px)]'>
        <section
          id='id-section-content'
          className='section-content  w-full max-w-[1350px]  md:px-12 px-[20px]  md:pt-5 pt-2'
        >
          {children}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ClientRender
