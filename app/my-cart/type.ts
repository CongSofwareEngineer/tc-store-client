
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
  noBorder?: boolean
  noEdit?: boolean
  callBack: (param?: any) => void
  callBackDelete: (param?: any) => void
}

export type ModalPaymentType = {
  dataCart: DataItemType[],
  callBack: () => void
}

export type TitleItemType = {
  dataCart: DataItemType[]
  noEdit?: boolean
  callBack?: (param?: boolean) => void
}

export type ListItemCartType = {
  noEdit?: boolean
  noTitle?: boolean
  loading?: boolean
  dataCart: DataItemType[]
  callBackClick?: (param?: any, index?: number) => void
  callBackSelectAll?: () => void
  callBackDelete?: (index: number) => void
}