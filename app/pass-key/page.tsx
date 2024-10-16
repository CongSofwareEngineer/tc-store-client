'use client'
import MyLoading from '@/components/MyLoading'
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'

const TYPE_METHOD = {
  sign: 'sign',
  connect: 'connect',
  sendTx: 'sendTx',
  idle: 'idle',
  logout: 'logout',
} as const
type Mess = {
  jsonrpc?: String
  id: String
  data?: String
}
const Passkey = () => {
  const [dataParent, setDataParent] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const sendMessageToParent = (
    message: Mess = {
      jsonrpc: '2.0',
      id: TYPE_METHOD.idle,
      data: '',
    }
  ) => {
    const { jsonrpc = '2.0', id = TYPE_METHOD.idle, data = null } = message
    if (id !== TYPE_METHOD.idle && id !== TYPE_METHOD.logout) {
      setLoading(true)
    }

    setTimeout(() => {
      window.parent.postMessage(
        {
          jsonrpc,
          id,
          data,
        },
        'http://localhost:30002'
      )
    }, 2000)
  }

  const receiveDAPPMessage = async (event: any) => {
    try {
      const data = event.data
      if (data?.id) {
        console.log({ data })
      }

      setLoading(false)
      switch (data.id) {
        case TYPE_METHOD.logout:
          setDataParent({})
          break

        case TYPE_METHOD.sign:
          console.log({ event })
          console.log({ data })
          setDataParent(data.result)
          break

        default:
          break
      }
    } catch (error) {
      console.log('====================================')
      console.log({ error })
      console.log('====================================')
    }
  }

  useEffect(() => {
    window.addEventListener('message', receiveDAPPMessage, false)

    return () => {
      window.removeEventListener('message', receiveDAPPMessage, false)
    }
  }, [])

  return (
    <div>
      {loading && (
        <div className="fixed flex items-center justify-center h-screen w-screen bg-black/30">
          <MyLoading />
        </div>
      )}
      <Button
        onClick={() =>
          sendMessageToParent({
            id: TYPE_METHOD.sign,
            data: 'signin',
          })
        }
      >
        Login
      </Button>

      <Button
        onClick={() => {
          setDataParent({})
          sendMessageToParent({
            id: TYPE_METHOD.logout,
          })
        }}
      >
        Logout
      </Button>
      <div>{JSON.stringify(dataParent)}</div>
    </div>
  )
}

export default Passkey
