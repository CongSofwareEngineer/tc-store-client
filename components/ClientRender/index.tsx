'use client'
import React, { useLayoutEffect, useState } from 'react'
import Header from '../Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useUserData from '@/hook/useUserData'

const ClientRender = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false)
  const { refreshLogin } = useUserData()

  useLayoutEffect(() => {
    setIsClient(true)
    console.log({ isClient })
    refreshLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isClient ? (
    <>
      <Header />
      <main className="w-full flex justify-center min-h-[calc(100vh-56px)]">
        <section className="w-full max-w-[1350px]  md:px-12 px-[15px]  pt-2">
          {children}
        </section>
      </main>
      <ToastContainer className={'mb-3'} />
    </>
  ) : (
    <></>
  )
}

export default ClientRender
