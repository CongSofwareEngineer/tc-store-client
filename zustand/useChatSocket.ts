import { devtools } from 'zustand/middleware'

import { create } from 'zustand'

import { ZUSTAND } from '@/constant/zustand'
import { io, Socket } from 'socket.io-client'

type ChatSocketStoreState = { [ZUSTAND.ChatSocket]: Socket | null }

type ChatSocketStoreActions = {
  create: (sdt: string) => void
}

type ChatSocketStore = ChatSocketStoreState & ChatSocketStoreActions

export const zustandLanguage = create<ChatSocketStore>()(
  devtools(
    (set) => ({
      [ZUSTAND.ChatSocket]: null,
      create: (sdt: string) => {
        const socket = io('http://localhost:3005/', {
          reconnection: true,
          reconnectionDelayMax: 10000,
          auth: {
            token: sdt,
          },
          autoConnect: true,
          secure: true,
        })
        socket.connect()

        setTimeout(() => {
          set({
            [ZUSTAND.ChatSocket]: socket,
          })
        }, 1000)
      },
    }),
    {
      name: `zustand-${ZUSTAND.ChatSocket}`,
      enabled: process.env.NEXT_PUBLIC_DISABLE_DEV === undefined,
    }
  )
)

export const useChatSocket = () => {
  const chatSocket = zustandLanguage((state) => state[ZUSTAND.ChatSocket])
  const create = zustandLanguage((state) => state.create)

  return {
    chatSocket,
    create,
  }
}
