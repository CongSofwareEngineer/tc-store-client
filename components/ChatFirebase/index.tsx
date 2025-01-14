'use client'
import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useUserData from '@/hook/useUserData'
import FBRealtimeUtils from '@/utils/firebaseRealtime'
import { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import MyImage from '../MyImage'
import { images } from '@/configs/images'
import { CloseCircleOutlined, SendOutlined } from '@ant-design/icons'
import MyInput from '../MyInput'
import ChatMessage from '../ChatMessage'
import { parsePhoneNumber } from 'libphonenumber-js'
import { uppercase } from '@/utils/functions'

export type DataMessage = {
  date: number
  content: string
  isAdmin?: boolean
  attributes?: { [key: string]: any }
}

const ChatFirebase: NextPage = () => {
  const { isMobile } = useMedia()
  const { translate } = useLanguage()
  const isNewChatRef = useRef(true)
  const isDragging = useRef(false)
  const isMoving = useRef(false)

  const [listChats, setListChats] = useState<DataMessage[]>([])
  const { userData } = useUserData()
  const [numberPhone, setNumberPhone] = useState('')
  const [content, setContent] = useState('')
  const [enableChat, setEnableChat] = useState(false)
  const [isValidChat, setIsValidChat] = useState(false)
  const [errorNumberPhone, setErrorNumberPhone] = useState(false)
  const [db, setDB] = useState<FBRealtimeUtils | null>(null)
  const [position, setPosition] = useState({ right: 20, bottom: 20 }) // Vị trí ban đầu

  useEffect(() => {
    if (userData) {
      let numberPhoneString = userData.sdt!

      if (numberPhoneString.startsWith('+84')) {
        numberPhoneString = numberPhoneString.replace('+84', '')
      }
      if (!numberPhoneString.startsWith('0')) {
        numberPhoneString = `0${numberPhoneString}`
      }
      numberPhoneString = uppercase(numberPhoneString)
      setNumberPhone(numberPhoneString)
      setIsValidChat(true)
    } else {
      setIsValidChat(false)
      setListChats([])
      setNumberPhone('')
    }
  }, [userData])

  useEffect(() => {
    if (numberPhone && isValidChat) {
      setDB(new FBRealtimeUtils(`Chat/${numberPhone}`))
    } else {
      db?.remove().finally(() => {
        isNewChatRef.current = true
      })
      setDB(null)
    }
  }, [numberPhone, isValidChat])

  useEffect(() => {
    const handleBeforeUnload = () => {
      db?.remove().finally(() => {
        isNewChatRef.current = false
      })
    }

    if (db) {
      db.listenerOnValue(async (message: any[]) => {
        if (message.length === 0) {
          if (isNewChatRef.current) {
            isNewChatRef.current = false
            const toDateNumber = Date.now()
            const body: DataMessage = {
              content: 'Xin chào bạn. </br> Bạn cần tư vấn gì ạ?',
              date: toDateNumber,
              isAdmin: true,
            }
            await db.create({
              [toDateNumber]: body,
            })
          }
        } else {
          setListChats(message)
        }
      })

      // Gắn sự kiện trước khi rời trang
      window.addEventListener('beforeunload', handleBeforeUnload)
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [db])

  const handleSend = () => {
    const text = content
    if (content?.trim()) {
      setContent('')

      const toDateNumber = Date.now()
      const body: DataMessage = {
        content: text,
        date: toDateNumber,
        isAdmin: false,
      }
      db?.create({
        [toDateNumber]: body,
      })
    }
  }

  const handleCheckSDT = () => {
    try {
      let numberPhoneString = numberPhone
      if (numberPhoneString) {
        const phoneNumber = parsePhoneNumber(numberPhone, 'VN')
        if (phoneNumber && phoneNumber.isValid()) {
          if (numberPhoneString.startsWith('+84')) {
            numberPhoneString = numberPhoneString.replace('+84', '')
          }
          if (!numberPhoneString.startsWith('0')) {
            numberPhoneString = `0${numberPhoneString}`
          }
          numberPhoneString = uppercase(numberPhoneString)
          setNumberPhone(numberPhoneString)
          setTimeout(() => {
            setIsValidChat(true)
            setErrorNumberPhone(false)
          }, 200)
        } else {
          setErrorNumberPhone(true)
        }
      } else {
        setErrorNumberPhone(true)
      }
    } catch (error) {
      setErrorNumberPhone(true)
    }
  }

  const onChangeSDT = (sdt: string) => {
    if (errorNumberPhone) {
      setErrorNumberPhone(false)
    }
    setNumberPhone(sdt)
  }

  const handleMouseDown = () => {
    isDragging.current = true
  }

  const handleMouseUp = () => {
    isDragging.current = false
    setTimeout(() => {
      isMoving.current = false
    }, 100)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return
    isMoving.current = true
    const right = window.innerWidth - e.clientX - 25
    const bottom = window.innerHeight - e.clientY - 25

    const checkValidPosition = (value: number, max: number) => {
      if (value > 0) {
        if (value > max - 40) {
          return max - 40
        }
        return value
      } else {
        return 0
      }
    }
    setPosition({
      right: checkValidPosition(right, window.innerWidth), // 25 là nửa width icon
      bottom: checkValidPosition(bottom, window.innerHeight), // 25 là nửa width icon
    })
  }

  const handleClick = () => {
    if (!isDragging.current && !isMoving.current) {
      setEnableChat(true)
      setPosition({
        right: 20, // 25 là nửa width icon
        bottom: 20, // 25 là nửa width icon
      })
    }
  }

  const handleTouchStart = () => {
    isDragging.current = true
  }

  const handleTouchEnd = () => {
    isDragging.current = false
    setTimeout(() => {
      isMoving.current = false
    }, 100)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return
    isMoving.current = true
    const touch = e.touches[0]
    const right = window.innerWidth - touch.clientX - 25
    const bottom = window.innerHeight - touch.clientY - 25

    const checkValidPosition = (value: number, max: number) => {
      if (value > 0) {
        if (value > max - 40) {
          return max - 40
        }
        return value
      } else {
        return 0
      }
    }
    setPosition({
      right: checkValidPosition(right, window.innerWidth), // 25 là nửa width icon
      bottom: checkValidPosition(bottom, window.innerHeight), // 25 là nửa width icon
    })
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  const renderDesktop = () => {
    return (
      <div
        style={{
          right: position.right,
          bottom: position.bottom,
        }}
        className='fixed z-[11]'
      >
        {enableChat ? (
          <div
            style={{
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 2px 1px',
            }}
            className='flex animate-zoom flex-col w-[300px] rounded-md relative overflow-hidden   bg-white'
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

            <div className=' relative flex flex-col flex-1 min-h-[400px] max-h-[400px] overflow-y-auto'>
              {isValidChat ? (
                listChats.length > 0 && (
                  <ChatMessage
                    isLoadMore={listChats.length === 0}
                    isReverse
                    loading={false}
                    data={listChats}
                  >
                    {listChats.map((e: DataMessage) => {
                      return (
                        <div
                          key={e.date}
                          className='flex w-full'
                          style={{
                            justifyContent: e.isAdmin ? 'start' : 'end',
                          }}
                        >
                          <div
                            style={{
                              borderRadius: 8,
                              borderBottomLeftRadius: e.isAdmin ? 0 : 8,
                              borderBottomRightRadius: !e.isAdmin ? 0 : 8,
                            }}
                            className='px-3  w-max max-w-[70%] mx-3 text-xs my-2 py-2  bg-blue-200'
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: e.content,
                              }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </ChatMessage>
                )
              ) : (
                <div className='flex  px-3 flex-1 justify-between items-center'>
                  <span className='text-center opacity-70'>
                    Nhập số điện thoại của bạn để chúng tôi dễ dàng cung cáp dịch vụ tốt nhất cho
                    bạn
                  </span>
                </div>
              )}
              {errorNumberPhone && (
                <span className='text-red-500 absolute bottom-2 px-3'>
                  {translate('warning.errorSDT')}
                </span>
              )}
            </div>

            <div className='flex w-full border-t-[1px] border-gray-300'>
              {isValidChat ? (
                <div className='flex flex-1'>
                  <MyInput
                    onPressEnter={handleSend}
                    value={content}
                    placeholder={translate('placeholder.enterContent')}
                    onChangeText={(text) => setContent(text.toString())}
                    className='w-full !pl-2'
                    typeBtn={1}
                  />
                  <div className='h-full justify-center items-center flex px-2 bg-gray-300'>
                    <SendOutlined onClick={handleSend} className='cursor-pointer' />
                  </div>
                </div>
              ) : (
                <div className='flex flex-1'>
                  <MyInput
                    onPressEnter={handleCheckSDT}
                    value={numberPhone}
                    placeholder={translate('productDetail.modalBuy.enterNumberPhone')}
                    onChangeText={(text) => onChangeSDT(text.toString())}
                    className='w-full !pl-2'
                    typeBtn={1}
                  />
                  <div className='h-full justify-center items-center flex px-2 bg-gray-300'>
                    <SendOutlined onClick={handleCheckSDT} className='cursor-pointer' />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='relative'>
            <MyImage
              alt='icon-message-chat'
              src={images.icon.iconMessageChat}
              className='!relative select-none !w-[40px] !h-[40px] drop-shadow-img'
            />
            <div
              onMouseDown={handleMouseDown}
              onClick={handleClick}
              // onTouchStart={handleTouchStart}
              // onMouseMove={handleMouseMove}
              // onTouchMove={handleTouchMove}
              // onMouseUp={handleMouseUp}
              // onTouchEnd={handleTouchEnd}
              // onMouseLeave={handleMouseUp}
              className='absolute inset-0 w-full h-full cursor-pointer '
            />
          </div>
        )}
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div
        style={{
          right: position.right,
          bottom: position.bottom,
        }}
        className='fixed z-[11]'
      >
        {enableChat ? (
          <div
            style={{
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 2px 1px',
            }}
            className='flex animate-zoom flex-col w-[300px] rounded-md relative overflow-hidden   bg-white'
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

            <div className=' relative flex flex-col flex-1 min-h-[400px] max-h-[400px] overflow-y-auto'>
              {isValidChat ? (
                listChats.length > 0 && (
                  <ChatMessage
                    isLoadMore={listChats.length === 0}
                    isReverse
                    loading={false}
                    data={listChats}
                  >
                    {listChats.map((e: DataMessage) => {
                      return (
                        <div
                          key={e.date}
                          className='flex w-full'
                          style={{
                            justifyContent: e.isAdmin ? 'start' : 'end',
                          }}
                        >
                          <div
                            style={{
                              borderRadius: 8,
                              borderBottomLeftRadius: e.isAdmin ? 0 : 8,
                              borderBottomRightRadius: !e.isAdmin ? 0 : 8,
                            }}
                            className='px-3  w-max max-w-[70%] mx-3 text-xs my-2 py-2  bg-blue-200'
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: e.content,
                              }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </ChatMessage>
                )
              ) : (
                <div className='flex  px-3 flex-1 justify-between items-center'>
                  <span className='text-center opacity-70'>
                    Nhập số điện thoại của bạn để chúng tôi dễ dàng cung cáp dịch vụ tốt nhất cho
                    bạn
                  </span>
                </div>
              )}
              {errorNumberPhone && (
                <span className='text-red-500 absolute bottom-2 px-3'>
                  {translate('warning.errorSDT')}
                </span>
              )}
            </div>

            <div className='flex w-full border-t-[1px] border-gray-300'>
              {isValidChat ? (
                <div className='flex flex-1'>
                  <MyInput
                    onPressEnter={handleSend}
                    value={content}
                    placeholder={translate('placeholder.enterContent')}
                    onChangeText={(text) => setContent(text.toString())}
                    className='w-full !pl-2'
                    typeBtn={1}
                  />
                  <div className='h-full justify-center items-center flex px-2 bg-gray-300'>
                    <SendOutlined onClick={handleSend} className='cursor-pointer' />
                  </div>
                </div>
              ) : (
                <div className='flex flex-1'>
                  <MyInput
                    onPressEnter={handleCheckSDT}
                    value={numberPhone}
                    placeholder={translate('productDetail.modalBuy.enterNumberPhone')}
                    onChangeText={(text) => onChangeSDT(text.toString())}
                    className='w-full !pl-2'
                    typeBtn={1}
                  />
                  <div className='h-full justify-center items-center flex px-2 bg-gray-300'>
                    <SendOutlined onClick={handleCheckSDT} className='cursor-pointer' />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <MyImage
            onClick={() => setEnableChat(true)}
            alt='icon-message-chat'
            src={images.icon.iconMessageChat}
            className='!relative !w-[40px] !h-[40px] cursor-pointer drop-shadow-img '
          />
        )}
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default ChatFirebase
