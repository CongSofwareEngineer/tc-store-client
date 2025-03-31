export type ISizesModel = {
  size: number
  sold: number
  amount: number
}

export type IModels = {
  model: string
  name: string
  sizes: Array<ISizesModel>
}

export type IImageProduct = {
  url:
    | string
    | {
        base64: string
        [key: string]: any
      }
  model: string
}

export type IConfigCart = {
  model: string
  size: number
}
export type IProduct = {
  _id?: string
  cost?: number
  amount?: number
  amountBuy?: number
  disCount?: number
  dateEndSale?: string
  dateSale?: string
  images?: Array<IImageProduct>
  des?: string
  des2?: string
  name?: string
  keyName?: string
  linkShoppe?: string
  linkFacebook?: string
  numberLike?: number
  price?: number
  category?: string
  titleSeo?: string
  desSeo?: string
  attributes?: { [key: string]: any }
  models: Array<IModels>
  configBill?: {
    price?: number
  } & IConfigCart
  configCart?: IConfigCart
  [key: string]: unknown
}

export type IMyCart = {
  _id: string
  amount: number
  date: string
  idProduct: string
  idUser: string
  configBill: {
    models: string
    size: string
  }
  moreData: IProduct
  [key: string]: unknown
}

export type ILengthCart = {
  lengthCart: number
}

export type IComment = {
  _id: string
  date: string
  sdt: string
  name: string
  note: string
  idProduct: string
  listReply: Array<{
    like: number
    date: string
    note: string
  }>
  userLikes: string[]
  rate: number
  listImg: string[]
  user: Array<{
    avatar: string
    [key: string]: unknown
  }>
}
export type IClientApi = {
  product: IProduct
  myCart: IMyCart
  lengthCart: ILengthCart
  comment: IComment
}
