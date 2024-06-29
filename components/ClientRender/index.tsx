'use client'
import React, { useLayoutEffect } from 'react'
import Header from '../Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useUserData from '@/hook/useUserData'
import { useAppDispatch } from '@/redux/store'
import { setMenuCategory } from '@/redux/categoryMenuSlice'
import useCheckPatchName from '@/hook/tank-query/useCheckPatchName'
import useMedia from '@/hook/useMedia'
import Footer from '../Footer'

const ClientRender = ({
  children,
  menuCategory,
}: {
  children: React.ReactNode
  menuCategory: any[]
}) => {
  useCheckPatchName()
  const { refreshLogin } = useUserData()
  const dispatch = useAppDispatch()
  const { isMobile } = useMedia()

  useLayoutEffect(() => {
    refreshLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useLayoutEffect(() => {
    dispatch(setMenuCategory(menuCategory))
  }, [dispatch, menuCategory])

  return (
    <>
      <Header />
      <main className="w-full flex justify-center min-h-[calc(100vh-56px)]">
        <section className="w-full max-w-[1350px]  md:px-12 px-[15px]  md:pt-5 pt-2">
          {children}
        </section>
      </main>
      <Footer />
      <ToastContainer
        className={'mb-3'}
        style={{ marginTop: isMobile ? 65 : 0 }}
      />
    </>
  )
}

export default ClientRender
