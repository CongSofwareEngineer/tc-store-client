import { LOCAL_STORAGE_KEY } from '@/constant/app'
import useUserData from '@/hook/useUserData'
import { FirebaseServices } from '@/services/firebaseService'
import { getDataLocal, saveDataLocal } from '@/utils/functions'
import { NextPage } from 'next'
import React, { useEffect } from 'react'

const NotificationClient: NextPage = () => {
  const { userData, isLogin } = useUserData()

  useEffect(() => {
    const addListener = () => {
      if (getDataLocal(LOCAL_STORAGE_KEY.IsFirstPermissionNoti, null)) {
        FirebaseServices.addListenMessage((e) => {
          console.log('====================================')
          console.log({ e })
          console.log('====================================')
        })
      }
    }

    const getData = async () => {
      FirebaseServices.initFirebase()
      const isSupport = await FirebaseServices.isSupportedNotification()

      if (isSupport) {
        if (
          getDataLocal(LOCAL_STORAGE_KEY.IsFirstPermissionNoti, null) === null
        ) {
          Notification.requestPermission()
            .then(async (permission: any) => {
              // If the user accepts, let's create a notification
              if (permission === 'granted') {
                saveDataLocal(LOCAL_STORAGE_KEY.IsFirstPermissionNoti, true)
                FirebaseServices.createToken(async (token) => {
                  console.log({ token })
                  addListener()
                })
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
      // getData()
      // addListener()

      FirebaseServices.createToken(async (token) => {
        console.log({ token })
        addListener()
      })
    } else {
      console.log('getData4 ')
    }
    console.log('getData3 ')
  }, [userData, isLogin])

  return <></>
}

export default NotificationClient
