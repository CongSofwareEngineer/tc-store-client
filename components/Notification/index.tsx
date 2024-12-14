import { LOCAL_STORAGE_KEY } from '@/constant/app'
import { TYPE_NOTIFICATION } from '@/constant/firebase'
import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import ClientApi from '@/services/clientApi'
import { FirebaseServices } from '@/services/firebaseService'
import { saveDataLocal } from '@/utils/functions'
import { Button, notification } from 'antd'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const NotificationClient: NextPage = () => {
  const { isLogin, reLogin, userData } = useUserData()
  const { translate } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    const handleOpenNoti = (dataMess: any) => {
      const key = `open${Date.now()}`
      const handleConfirm = (type: string) => {
        switch (type) {
          case TYPE_NOTIFICATION.myBill:
            router.push('/my-page/bill')
            break

          case TYPE_NOTIFICATION.myCart:
            router.push('/my-cart')
            break

          default:
            router.push('/shoes')
            break
        }
        notification.destroy(key)
      }
      const btn = (
        <div className='flex w-full justify-end gap-2'>
          <Button type='default' onClick={() => handleConfirm(dataMess.data.type)} className='min-w-[50px]'>
            {translate('common.view')}
          </Button>
          <Button onClick={() => notification.destroy(key)} size='middle' type='primary'>
            {translate('common.close')}
          </Button>
        </div>
      )

      notification.open({
        message: <div className='text-black font-bold '>{dataMess?.data?.title || dataMess?.notification?.title}</div>,
        description: (
          <div className='max-h-[100px] overflow-scroll'>{dataMess?.data?.body || dataMess?.notification?.body}</div>
        ),
        btn,
        key,
        duration: 10000,
      })
    }
    const addListener = () => {
      FirebaseServices.addListenMessage((dataMess) => {
        handleOpenNoti(dataMess)
      })
    }
    const updateToken = async (token: string) => {
      if (userData?.tokenNoti !== token) {
        const res = await ClientApi.updateUser(userData?._id, {
          tokenNoti: token,
        })
        if (res?.data) {
          reLogin()
        }
      }
    }
    const getData = async () => {
      FirebaseServices.initFirebase()
      const isSupport = await FirebaseServices.isSupportedNotification()
      if (isSupport) {
        Notification.requestPermission()
          .then(async (permission: any) => {
            // If the user accepts, let's create a notification
            if (permission === 'granted') {
              FirebaseServices.createToken(async (token) => {
                updateToken(token)
                saveDataLocal(LOCAL_STORAGE_KEY.TokenFirebase, token)
                addListener()
              })
            }
          })
          .catch((error: any) => {})
      }
    }
    if (isLogin) {
      getData()
      addListener()
    }
  }, [isLogin])

  return <></>
}

export default NotificationClient
