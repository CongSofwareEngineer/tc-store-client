'use client'
import React from 'react'
import useSearchBaseAdmin from '@/hook/useSearchBaseAdmin'

const BillAdmin = () => {
  const { renderContent, dateTime, idOther, sdt } = useSearchBaseAdmin()

  console.log('====================================')
  console.log({ dateTime, idOther, sdt })
  console.log('====================================')
  return <div className="flex w-full flex-col gap-2">{renderContent()}</div>
}

export default BillAdmin
