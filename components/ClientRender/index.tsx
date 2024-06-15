'use client'
import React, { useLayoutEffect, useState } from 'react'
import Header from '../Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useUserData from '@/hook/useUserData'
import { useAppDispatch } from '@/redux/store'
import { setMenuCategory } from '@/redux/categoryMenuSlice'

const ClientRender = ({
  children,
  menuCategory,
}: {
  children: React.ReactNode
  menuCategory: any[]
}) => {
  const [isClient, setIsClient] = useState(false)
  const { refreshLogin } = useUserData()
  const dispatch = useAppDispatch()
  useLayoutEffect(() => {}, [isClient])

  useLayoutEffect(() => {
    setIsClient(true)
    refreshLogin()
    dispatch(setMenuCategory(menuCategory))
  }, [dispatch, menuCategory, refreshLogin])

  // return isClient ? (
  //   <>
  //     <Header />
  //     <main className="w-full flex justify-center min-h-[calc(100vh-56px)]">
  //       <section className="w-full max-w-[1350px]  md:px-12 px-[15px]  pt-2">
  //         {children}
  //       </section>
  //     </main>
  //     <ToastContainer className={'mt-3'} />
  //   </>
  // ) : (
  //   <></>
  // )
  return (
    <>
      <Header />
      <main className="w-full flex justify-center min-h-[calc(100vh-56px)]">
        <section className="w-full max-w-[1350px]  md:px-12 px-[15px]  pt-2">
          {children}
        </section>
      </main>
      <ToastContainer className={'mb-3'} />
    </>
  )
}

export default ClientRender
