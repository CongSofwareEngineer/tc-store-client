
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
  dataCart: DataItemType[]
  callBack: () => void
}


export type PaymentPageType = {
  dataCart: DataItemType[]
  clickBack: () => void
  refreshData: () => void
}

export type TitleItemType = {
  dataCart: DataItemType[]
  noEdit?: boolean
  allSelected: boolean
  callBack?: (param?: boolean) => void
}

export type ContentFormType = {
  listAddressShip: any[]
  setListAddressShip?: (param: string[]) => void
}

export type ListItemCartType = {
  noEdit?: boolean
  noTitle?: boolean
  loading?: boolean
  allSelected?: boolean
  dataCart: DataItemType[]
  callBackClick?: (param?: any, index?: number) => void
  callBackSelectAll?: () => void
  callBackDelete?: (index: number) => Promise<void> | void
}