import { IProduct } from '../shoes/[...params]/type'

export type ItemCart = {
  selected?: boolean
} & IProduct

export type ItemCartBody = {
  idUser?: string
  amount: number
  idProduct: string
  keyNameProduct: string
  id: string
  selected?: boolean
  more_data?: IProduct
  [key: string]: unknown
}
