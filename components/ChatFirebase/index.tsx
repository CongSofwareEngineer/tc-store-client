'use client'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'

const ChatFirebase: NextPage = () => {
  const [listChats] = useState<{ [key: string]: any }[]>([])

  useEffect(() => {
    console.log({ listChats })
  }, [listChats])

  return <></>
}

export default ChatFirebase
