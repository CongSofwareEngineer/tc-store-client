export type ItemDetailType = {
  imageMain?: string,
  typeProduct?: string,
  des?: string,
  name: string,
  id?: string
  amount?: 100,
  des2?: string
  dateSale?: string
  dateEndSale?: string
  numberLike?: number,
  weight?: string,
  linkShoppe?: string
  linkFacebook?: string
  sold?: string | number
} & Record<string, any>