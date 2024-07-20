'use client'
import MyInput from '@/components/MyInput'
import { Button, DatePicker } from 'antd'
import React, { useState } from 'react'
import OptionSearchBase from '../Component/OptionSearchBase'
import useSearchBaseAdmin from '@/hook/useSearchBaseAdmin'

const BillAdmin = () => {
  const { renderContent, dateTime, idOther, sdt } = useSearchBaseAdmin()

  console.log('====================================')
  console.log({ dateTime, idOther, sdt })
  console.log('====================================')
  return <div className="flex w-full flex-col gap-2">{renderContent()}</div>
}

export default BillAdmin
