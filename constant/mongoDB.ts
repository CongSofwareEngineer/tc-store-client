import { FILTER_BILL } from './app'

export type DataAddCart = {
  amount: number
  date?: string
  idProduct?: string
  idUser?: string
  moreConfig?: { [key: string]: any }
}

export type DataAddComment = {
  idProduct?: string
  sdt?: string
  listImg?: { [key: string]: any }[]
  name?: string
  rate?: number
  note: string
}

export type BodyAddBill = {
  idUser?: string | undefined
  listBill: { _id: string; keyName?: string; amount: number; idCart?: string }[]
  addressShip: string
  discount: number
  sdt: string
  iDBanking?: number
  iDMomo?: number | string
  status: FILTER_BILL
  abort?: boolean
  totalBill: Number
  listNewSoldProduct?: { [key: string]: any }[]
}
