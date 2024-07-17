export enum QueryKey {
  GetAllProduct = 'GetAllProduct',
  GetProductShop = 'GetProductShop',
  GetAllNests = 'GetAllNests',
  GetCommentProduction = 'GetCommentProduction',
  LengthCartUser = 'LengthCartUser',
  GetProductByID = 'GetProductByID',
  MyCartUser = "MyCartUser",
  AllProvincesVn = "AllProvincesVn",
}

export type TypeHookReactQuery = {
  "data": any[]
  "page": number
}