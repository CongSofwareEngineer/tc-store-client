'use client'
import { TYPE_EVENT } from '@/constant/chatSocket'
import { useChatSocket } from '@/zustand/useChatSocket'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'

export type DataMessage = {
  sdt: string
  date: number
  content: string
  received?: string
  room?: any
}

const ChatSocket: NextPage = () => {
  const { chatSocket, create } = useChatSocket()

  const [listMessage, setListMessage] = useState<DataMessage[]>([])

  useEffect(() => {
    create('0392225405')
  }, [create])

  useEffect(() => {
    if (chatSocket) {
      chatSocket.on(TYPE_EVENT.newMessage, (data: any) => {
        console.log({ newMessages: data })
        setListMessage((pre) => [...pre, data])
      })

      chatSocket.on(TYPE_EVENT.receivedMessage, (data: any) => {
        console.log({ receivedMessage: data })
      })

      chatSocket.on(TYPE_EVENT.joinRoom, (data: any) => {
        console.log({ joinRoom: data })
      })
    }

    return () => {
      chatSocket?.removeListener(TYPE_EVENT.newMessage)
      chatSocket?.removeListener(TYPE_EVENT.receivedMessage)
      chatSocket?.removeListener(TYPE_EVENT.joinRoom)
    }
  }, [chatSocket])

  useEffect(() => {
    if (chatSocket?.connected) {
      chatSocket.emit(TYPE_EVENT.joinRoom, {
        content: 'client join room',
        sdt: '0392225405',
        date: Date.now(),
      })

      setTimeout(() => {
        chatSocket.emit(TYPE_EVENT.clientSendMessage, {
          content: 'client send message',
          sdt: '0392225405',
          date: Date.now(),
        })
      }, 3000)
    }

    return () => {
      chatSocket?.disconnect()
    }
  }, [chatSocket])

  useEffect(() => {
    console.log({ listMessage })
  }, [listMessage])

  return <></>
}

export default ChatSocket
