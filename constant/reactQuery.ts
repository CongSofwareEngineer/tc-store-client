export enum QueryKey {
  GetAllProduct = 'GetAllProduct',
  GetProductShop = 'GetProductShop',
  GetAllNests = 'GetAllNests',
  GetCommentProduction = 'GetCommentProduction',
  LengthCartUser = 'LengthCartUser',
  GetProductByID = 'GetProductByID',
  MyCartUser = "MyCartUser"
}

export type TypeHookReactQuery = {
  "data": any[]
  "page": number
}