import { IProduct } from '@/services/ClientApi/type'

export type IItemInfoBill = {
  amountBuy?: number
  moreData?: IProduct
} & IProduct

export type IInfoBill = {
  data?: IItemInfoBill[]
}

export type IPayment = {
  data: IItemInfoBill[]
  clickBack: () => void
  showBack?: boolean
  noLogin?: boolean
}

export type IFormPayment = {
  sdt?: string
  name?: string
  linkContact?: string
  gmail?: string
  noteBil?: string
  addressShip?: {
    addressDetail?: string
    address?: string
  }
}
