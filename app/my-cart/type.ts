
export type DataItemType = {
  idUser: string
  amount: number
  idProduct: string
  keyNameProduct: string
  id: string
  selected?: boolean
  [key: string]: any
}

export type ItemCartType = {
  data: DataItemType
  noBorder: boolean
  callBack: (param?: any) => void
  callBackDelete: (param?: any) => void
}

export type ModalPaymentType = {
  dataCart: DataItemType[]
}