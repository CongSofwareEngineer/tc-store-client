import { collection, getFirestore } from 'firebase/firestore/lite'
import { initializeApp, getApps } from 'firebase/app'
import {
  deleteToken,
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from 'firebase/messaging'
import FirebaseFun from '@/utils/firebase'
import { DatabaseCollectionType } from '@/constant/firebase'

export const FirebaseServices = {
  config: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_FB,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
  initFirebase: () => {
    return getApps().length === 0
      ? initializeApp(FirebaseServices.config)
      : getApps()[0]
  },

  createMessage: () => {
    const fb = FirebaseServices.initFirebase()
    return getMessaging(fb)
  },
  isSupportedNotification: async () => {
    const isSupportFirebaseMess = await isSupported()
    return (
      isSupportFirebaseMess &&
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      'PushManager' in window &&
      'Notification' in window
    )
  },
  createToken: async (callback: (e?: any) => Promise<void>) => {
    const firebaseUrl = encodeURIComponent(
      JSON.stringify(FirebaseServices.config)
    )
    const registration = await navigator.serviceWorker.getRegistration(
      `/firebase-messaging-sw.js?FirebaseServices=${firebaseUrl}`
    )
    return await FirebaseServices.recursiveCreateToken(
      callback,
      registration,
      0
    )
  },
  recursiveCreateToken: async (
    callBack: (e?: any) => Promise<void>,
    registration: any,
    numberReq = 0
  ): Promise<any> => {
    if (numberReq >= 5) {
      callBack && callBack(null)
      return null
    } else {
      try {
        const permission = await navigator.permissions.query({
          name: 'notifications',
        })
        if (permission.state === 'granted') {
          const token = await getToken(FirebaseServices.createMessage(), {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VERIFIED_API_KEY,
            serviceWorkerRegistration: registration,
          })
          callBack && callBack(token)
          console.log({ token })
          return token
        }
      } catch (error) {
        numberReq++
        return await FirebaseServices.recursiveCreateToken(
          callBack,
          registration,
          numberReq
        )
      }
    }
  },

  deleteToken: async () => {
    const cloudMess = FirebaseServices.createMessage()
    const isDelete = await deleteToken(cloudMess)
    return isDelete
  },

  createFBFun: (nameData: string) => {
    const dataCreate = FirebaseServices.initFirebase()
    const collectionData: DatabaseCollectionType = collection(
      getFirestore(dataCreate),
      nameData
    )
    return new FirebaseFun(collectionData)
  },
  addListenMessage: async (callback: (e?: any) => any) => {
    const isSupportFirebaseMess =
      await FirebaseServices.isSupportedNotification()
    if (isSupportFirebaseMess) {
      onMessage(FirebaseServices.createMessage(), (payload) => {
        callback(payload)
      })
    }
  },

  requestPermission: async (
    callback: (e?: any) => any,
    callbackReject?: () => any
  ) => {
    const isSupportFirebaseMess =
      await FirebaseServices.isSupportedNotification()
    if (isSupportFirebaseMess) {
      navigator.permissions
        .query({ name: 'notifications' })
        .then(async (result) => {
          if (result.state === 'prompt') {
            callback && callback()
          }
        })
    } else {
      callbackReject && callbackReject()
    }
  },
}

// export const FirebaseProduct = FirebaseServices.createFBFun(DataBase.productShop)
// export const FirebaseCart = FirebaseServices.createFBFun(DataBase.cartUser)
// export const FirebaseUser = FirebaseServices.createFBFun(DataBase.user)
// export const FirebaseImageDelete = FirebaseServices.createFBFun(
//   DataBase.imageDelete
// )
// export const FirebaseBill = FirebaseServices.createFBFun(DataBase.bill)
// export const FirebaseComment = FirebaseServices.createFBFun(DataBase.comment)
// export const FirebaseContact = FirebaseServices.createFBFun(DataBase.contact)
