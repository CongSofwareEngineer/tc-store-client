import {
  collection, getFirestore
} from 'firebase/firestore/lite'
import { initializeApp, getApps } from 'firebase/app';
import FirebaseFun from '@/utils/firebase';
import { DataBase } from '@/constant/firebase';

export const FirebaseConfig = {
  config: () => {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID_FB,
      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDER_ID,
      appId: process.env.NEXT_PUBLIC_APPID,
      measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
    }
    return firebaseConfig
  },
  initFirebase: () => {
    const firebaseConfig = FirebaseConfig.config()
    return getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  },

  createFBFun: (nameData: string) => {
    const dataCreate = FirebaseConfig.initFirebase()
    const collectionData = collection(getFirestore(dataCreate), nameData)
    return new FirebaseFun(collectionData)
  },
}

export const FirebaseProduct = FirebaseConfig.createFBFun(DataBase.productShop)
export const FirebaseCart = FirebaseConfig.createFBFun(DataBase.cartUser)
export const FirebaseUser = FirebaseConfig.createFBFun(DataBase.user)
export const FirebaseImageDelete = FirebaseConfig.createFBFun(DataBase.imageDelete)
export const FirebaseBill = FirebaseConfig.createFBFun(DataBase.bill)
export const FirebaseComment = FirebaseConfig.createFBFun(DataBase.comment)
export const FirebaseContact = FirebaseConfig.createFBFun(DataBase.contact)