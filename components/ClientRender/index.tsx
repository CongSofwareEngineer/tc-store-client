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

const ClientRender = ({
  children,
  menuCategory,
}: {
  children: React.ReactNode
  menuCategory: any[]
}) => {
  const { refreshLogin } = useUserData()
  const dispatch = useAppDispatch()
  const { isMobile } = useMedia()
  useCheckPatchName()

  useLayoutEffect(() => {
    refreshLogin()
    dispatch(setMenuCategory(menuCategory))
  }, [dispatch, menuCategory, refreshLogin])

  return (
    <>
      <Header />
      <main className="w-full flex justify-center min-h-[calc(100vh-56px)]">
        <section className="w-full max-w-[1350px]  md:px-12 px-[15px]  md:pt-5 pt-2">
          {children}
        </section>
      </main>
      <ToastContainer
        className={'mb-3'}
        style={{ marginTop: isMobile ? 65 : 0 }}
      />
    </>
  )
}

export default ClientRender
