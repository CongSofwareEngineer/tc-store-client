'use client'
import React, { useLayoutEffect } from 'react'
import Header from '../Header'
import 'react-toastify/dist/ReactToastify.css'
import { useAppDispatch } from '@/redux/store'
import { setMenuCategory } from '@/redux/categoryMenuSlice'
import useCheckPatchName from '@/hook/tank-query/useCheckPatchName'
import useMedia from '@/hook/useMedia'
import Footer from '../Footer'
import dynamic from 'next/dynamic'
import useUserData from '@/hook/useUserData'
import { fetchProvinces } from '@/redux/provincesSlice'
const LoadingFirstPage = dynamic(() => import('../LoadingFirstPage'), {
  ssr: true,
})
const ClientRender = ({
  children,
  menuCategory,
}: {
  children: React.ReactNode
  menuCategory: any[]
}) => {
  useCheckPatchName()
  const dispatch = useAppDispatch()
  const { reLogin } = useUserData()

  useLayoutEffect(() => {
    dispatch(setMenuCategory(menuCategory))
    dispatch(fetchProvinces())
    reLogin()
  }, [])

  return (
    <>
      <Header />
      <main className="main-content w-full flex justify-center min-h-[calc(100vh-56px)]">
        <section className="w-full max-w-[1350px]  md:px-12 px-[20px]  md:pt-5 pt-2">
          {children}
        </section>
      </main>
      <Footer />
      <LoadingFirstPage />
    </>
  )
}

export default ClientRender
