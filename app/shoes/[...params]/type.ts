import { IClientApi } from '@/services/ClientApi/type'

export type IProduct = {
  typeProduct?: string
  disCount?: number
  configBill?: {
    [key: string]: unknown
  }
} & IClientApi['product']

export type IModalBuyLogin = {
  data?: IProduct
  amount: number
}

export type IPaymentShop = {
  data?: IProduct
  callBack: () => void
  amount: number
}

export type IInfoBill = {
  data?: IProduct
  amountBuy: number
}
