'use client'
import { Button, ButtonProps } from '@/components/ui/button'
import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'

type BtnType = {
  children: React.ReactNode
  loading?: boolean
} & ButtonProps

const MyButton = ({ children, loading = false, ...props }: BtnType) => {
  return (
    <Button {...props} disabled={loading || props?.disabled}>
      {loading && <Loader2 className='animate-spin' />}

      {children}
    </Button>
  )
}
const UIScreen = () => {
  return (
    <>
      <header>
        <h1>h1</h1>
      </header>
      <header>
        <h2>h2</h2>
      </header>

      <div className='flex flex-col gap-2 w-full'>
        <MyButton
          className='bg-[#fcd34d] disabled:opacity-50 disabled:cursor-no-drop'
          loading
          disabled
        >
          Button
        </MyButton>
      </div>
    </>
  )
}

export default UIScreen
