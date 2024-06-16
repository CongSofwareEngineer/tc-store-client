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

export type QueryData = { key: string, match: WhereFilterOp, value: string }