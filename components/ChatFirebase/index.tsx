'use client'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useUserData from '@/hook/useUserData'
import FBRealtimeUtils from '@/utils/firebaseRealtime'
import { NextPage } from 'next'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import MyImage from '../MyImage'
import { images } from '@/configs/images'
import { CloseCircleOutlined, SendOutlined } from '@ant-design/icons'
import MyInput from '../MyInput'
import ChatMessage from '../ChatMessage'

const ChatFirebase: NextPage = () => {
  const { isMobile } = useMedia()
  const { translate } = useLanguage()

  const [listChats, setListChats] = useState<{ [key: string]: any }[]>([])
  const { userData } = useUserData()
  const [numberPhone, setNumberPhone] = useState('')
  const [content, setContent] = useState('')
  const [enableChat, setEnableChat] = useState(false)

  useEffect(() => {
    const arr: any[] = []
    for (let index = 0; index < 100; index++) {
      arr.push({
        content: 'content' + index,
        isUser: index % 2 == 0,
      })
    }
    setListChats(arr)
  }, [])

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
  }, [numberPhone])

  const handleSend = () => {
    setContent('')
  }

  const renderEnterNumberPhone = () => {
    return <div>renderEnterNumberPhone</div>
  }

  const renderDesktop = () => {
    return (
      <div className='fixed right-[20px] bottom-[20px]'>
        {enableChat ? (
          <div
            style={{
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 2px 1px',
            }}
            className='flex flex-col w-[300px] rounded-md relative overflow-hidden   bg-white'
          >
            <div className='flex justify-between px-3 py-1  items-center bg-green-300'>
              <div>Chat</div>

              <div className='text-black text-xl'>
                <CloseCircleOutlined
                  className='cursor-pointer'
                  onClick={() => setEnableChat(false)}
                />
              </div>
            </div>

            {
              <div className='flex flex-1 min-h-[400px] max-h-[400px] overflow-y-auto'>
                {listChats.length > 0 && (
                  <ChatMessage
                    dependence={enableChat}
                    isLoadMore={listChats.length === 0}
                    isReverse
                    loading={false}
                  >
                    {listChats.map((e) => {
                      return <div key={e.content}>{e.content}</div>
                    })}
                  </ChatMessage>
                )}
              </div>
            }

            <div className='flex w-full border-t-[1px] border-gray-300'>
              <div className='flex flex-1'>
                <MyInput
                  onPressEnter={handleSend}
                  value={content}
                  onChangeText={(text) => setContent(text.toString())}
                  className='w-full !pl-2'
                  typeBtn={1}
                />
                <div className='h-full justify-center items-center flex px-2 bg-gray-300'>
                  <SendOutlined onClick={handleSend} className='cursor-pointer' />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <MyImage
            onClick={() => setEnableChat(true)}
            alt='icon-message-chat'
            src={images.icon.messenger}
            className='!relative !w-[40px] !h-[40px] cursor-pointer'
          />
        )}
      </div>
    )
  }

  const renderMobile = () => {
    return <div></div>
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default ChatFirebase
