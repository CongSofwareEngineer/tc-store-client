export type IProduct = {
  imageMain?: string
  typeProduct?: string
  des?: string
  name: string
  _id?: string
  keyName?: string
  price?: number
  amount?: number
  more_data?: IProduct
  discount?: number
  category?: string
  sold?: number
  disCount?: number
  configBill?: {
    [key: string]: unknown
  }
  [key: string]: unknown
}

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
