'use client'
import React, { useLayoutEffect } from 'react'
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

  return children
}

export default ClientRender
