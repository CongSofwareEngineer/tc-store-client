'use client'
import React, { useLayoutEffect, useState } from 'react'
import Header from '../Header'

const ClientRender = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false)
  useLayoutEffect(() => {
    setIsClient(true)
  }, [])
  return isClient ? (
    <>
      <header>
        <Header />
      </header>
      <main className="w-full flex justify-center min-h-[calc(100vh-56px)]">
        <section className="w-full max-w-[1350px]  md:px-12 px-5">
          {children}
        </section>
      </main>
    </>
  ) : (
    <></>
  )
}

export default ClientRender
