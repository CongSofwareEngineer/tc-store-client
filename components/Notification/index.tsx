import { LOCAL_STORAGE_KEY } from '@/constant/app'
import useUserData from '@/hook/useUserData'
import { FirebaseServices } from '@/services/firebaseService'
import { getDataLocal, saveDataLocal } from '@/utils/functions'
import { NextPage } from 'next'
import React, { useEffect } from 'react'

const NotificationClient: NextPage = () => {
  const { userData, isLogin } = useUserData()

  useEffect(() => {
    const getData = async () => {
      const isSupport = await FirebaseServices.isSupportedNotification()
      if (isSupport) {
        if (
          getDataLocal(LOCAL_STORAGE_KEY.IsFirstPermissionNoti) === 'undefined'
        ) {
          Notification.requestPermission()
            .then(async (permission: any) => {
              // If the user accepts, let's create a notification
              if (permission === 'granted') {
                saveDataLocal(LOCAL_STORAGE_KEY.IsFirstPermissionNoti, true)
              }
              if (permission === 'denied') {
                saveDataLocal(LOCAL_STORAGE_KEY.IsFirstPermissionNoti, false)
              }
            })
            .catch((error: any) => {
              saveDataLocal(LOCAL_STORAGE_KEY.IsFirstPermissionNoti, false)

              console.log('error handlePermissionNoti', error)
            })
        }
      }
    }

    if (isLogin && !!userData?.isAdmin) {
      getData()
    }
  }, [userData, isLogin])

  return <></>
}

export default NotificationClient
