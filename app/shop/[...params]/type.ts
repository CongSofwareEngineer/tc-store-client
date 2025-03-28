import { IProduct as IProductBase } from '@/services/ClientApi/type'

export type IProduct = {
  configBill: {
    model: string
    size: number
  }
} & IProductBase

export type ModalBuyLoginType = {
  data?: IProduct
  amount: number
}

export type IPaymentShop = {
  data: IProduct
  callBack: () => void
  amount: number
}

export type InfoBillType = {
  data?: IProduct
  amountBuy: number
}
