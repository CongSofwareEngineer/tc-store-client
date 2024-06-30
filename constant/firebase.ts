import { CollectionReference, DocumentData, DocumentReference, Query, WhereFilterOp } from "firebase/firestore/lite"

export const DataBase = {
  bill: 'Bill',
  cartUser: 'CartUser',
  productShop: 'ProductShop',
  imageProduct: 'ImageProduct',
  comment: 'CommentUser',
  contact: 'contact',
  coffee: 'Coffee',
  build: 'Build',
  otherHome: 'OtherHome',
  typeProduct: 'TypeProduct',
  user: 'User',
  landingPageCoffee: 'landingPageCoffee',
  imageDelete: 'ImageDelete',
  landingPage: 'LandingPage'
} as const


export const FB_FC = {
  getAllData: 'getAllData',
  getDataByLimit: 'getDataByLimit',
  getProductShop: 'getProductShop',
  getMyCart: 'getMyCart',
  getAllDataOption2: 'getAllDataOption2',
  queryData: 'queryData',
  queryDataOption2: 'queryDataOption2',
  queryListData: 'queryListData',
  getDataByID: 'getDataByID',
  addData: 'addData',
  updateData: 'updateData',
  deleteData: 'deleteData',
  upLoadImg: 'upLoadImg'
} as const

export type DatabaseQueryType = Query<unknown, DocumentData>
export type DatabaseCollectionType = CollectionReference<DocumentData, DocumentData>
export type DatabaseDocsType = DocumentReference<DocumentData, DocumentData>
export type DatabaseType = any

export type QueryData = { key: string, match: WhereFilterOp, value: any }


// type data body to work fire store
export type BodyAddCart = {
  amount: number
  date: number
  idProduct: string | undefined
  idUser: string | undefined
  keyNameProduct: string
  moreConfig?: { [key: string]: any }
}

export type BodyAddBill = {
  date: number
  idUser?: string | undefined
  listProduction: { idProduct: string, keyNameProduct: string, amount: number }[],
  total: number,
  abort: boolean,
  addressShip: string,
  discount: number,
  sdt: string,
  iDBanking?: number,
  iDMomo?: number | string
}



export type BodyUserData = {
  date: number
  idUser?: string | undefined
  listProduction: { idProduct: string, keyNameProduct: string, amount: number }[],
  sdt: string,
  isAdmin: boolean
  exp: 0,
  address?: string
  name?: string
  avatar?: string | null
  pass?: string
  addressShipper: string[],
  sex: boolean,
}
