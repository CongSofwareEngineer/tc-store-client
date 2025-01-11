'use client'
import useUserData from '@/hook/useUserData'
import FBRealtimeUtils from '@/utils/firebaseRealtime'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'

const ChatFirebase: NextPage = () => {
  const [listChats, setListChats] = useState<{ [key: string]: any }[]>([])
  const { userData } = useUserData()
  const [numberPhone, setNumberPhone] = useState('')

  useEffect(() => {
    if (userData) {
      setNumberPhone(userData.sdt!)
    } else {
      setNumberPhone('')
    }
  }, [userData])

  useEffect(() => {
    let db: FBRealtimeUtils
    if (numberPhone) {
      db = new FBRealtimeUtils(`Chat/${numberPhone}`)
      db.listenerOnValue((message) => {
        setListChats(message.reverse())
      })
    }

    return () => {
      if (numberPhone && db) {
        db.remove()
      }
    }
  }, [listChats, numberPhone])

  return <></>
}

export default ChatFirebase
