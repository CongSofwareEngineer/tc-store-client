export type IAttributes = {
  sex?: string[]
  sizes?: Array<{
    size: string
    colors?: Array<{
      color: string
      sold: number
      amount: number
    }>
  }>
  [key: string]: unknown
}

export type IProduct = {
  _id: string
  amount: number
  disCount: number
  dateEndSale: string
  dateSale: string
  imageMore: string[]
  imageMain: string
  des: string
  des2: string
  name: string
  keyName: string
  linkShoppe?: string
  linkFacebook?: string
  numberLike: number
  price: number
  sold: number
  category: string
  weight: string
  titleSeo: string
  desSeo?: string
  attributes?: IAttributes
  [key: string]: unknown
}

export type IMyCart = {
  _id: string
  amount: number
  date: string
  idProduct: string
  idUser: string
  configBill: {
    size: string
    color: string
  }
  more_data: IProduct
  [key: string]: unknown
}

export type ILengthCart = {
  lengthCart: number
}
export type IClientApi = {
  product: IProduct
  myCart: IMyCart
  lengthCart: ILengthCart
}
