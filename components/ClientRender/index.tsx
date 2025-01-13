'use client'
import React, { useLayoutEffect } from 'react'
import useAos from '@/hook/useAos'
import { useCategoryMenu } from '@/zustand/useCategoryMenu'

const ClientRender = ({
  children,
  menuCategory = [],
}: {
  children: React.ReactNode
  menuCategory: any[]
}) => {
  useAos()
  const { setCategoryMenu } = useCategoryMenu()

  useLayoutEffect(() => {
    console.log({ env: process.env.NEXT_PUBLIC_DISABLE_DEV })

    setCategoryMenu(menuCategory)
  }, [])

  return children
}

export default ClientRender
