import { IProduct } from '@/services/ClientApi/type'

export type IItemCart = {
  selected?: boolean
  moreData?: IProduct
} & IProduct

export type ItemCartBody = {
  idUser?: string
  amountBuy: number
  idProduct: string
  keyNameProduct: string
  id: string
  selected?: boolean
  moreData?: IProduct
  [key: string]: unknown
}
