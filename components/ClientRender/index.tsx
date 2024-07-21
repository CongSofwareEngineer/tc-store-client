'use client'
import React, { useEffect, useLayoutEffect } from 'react'
import Header from '../Header'
import 'react-toastify/dist/ReactToastify.css'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { setMenuCategory } from '@/redux/categoryMenuSlice'
import useCheckPatchName from '@/hook/tank-query/useCheckPatchName'
import Footer from '../Footer'
import dynamic from 'next/dynamic'
import useUserData from '@/hook/useUserData'
import { fetchProvinces } from '@/redux/provincesSlice'
import moment from 'moment'
import { LANGUAGE_SUPPORT } from '@/constant/app'
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
  const { Language } = useAppSelector((state) => state.app)

  useCheckPatchName()
  const dispatch = useAppDispatch()
  const { reLogin } = useUserData()

  useLayoutEffect(() => {
    dispatch(setMenuCategory(menuCategory))
    dispatch(fetchProvinces())
    reLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    switch (Language?.locale) {
      case LANGUAGE_SUPPORT.VN:
        // moment.locale('vi')
        break

      default:
        moment.locale('vi')
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Language])

  return (
    <>
      <div
        className="fb-like opacity-0 absolute select-none"
        data-href="https://tcstore.vercel.app/shop"
        data-width=""
        data-layout="standard"
        data-action="like"
        data-size="small"
        data-share="true"
      ></div>
      <Header />
      <main className="main-content w-full flex justify-center min-h-[calc(100vh-56px)]">
        <section
          id="id-section-content"
          className="section-content  w-full max-w-[1350px]  md:px-12 px-[20px]  md:pt-5 pt-2"
        >
          {children}
        </section>
      </main>
      <Footer />
      <LoadingFirstPage />
    </>
  )
}

export default ClientRender
