import { DocumentData, Query, WhereFilterOp } from "firebase/firestore/lite"

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
  queryData: 'queryData',
  queryListData: 'queryListData',
  getDataByID: 'getDataByID',
  addData: 'addData',
  updateData: 'updateData',
  deleteData: 'deleteData',
  upLoadImg: 'upLoadImg'
} as const

export type DatabaseType = Query<unknown, DocumentData>
export type QueryData = { key: string, match: WhereFilterOp, value: string }