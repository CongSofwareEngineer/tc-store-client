export enum QUERY_KEY {
  GetAllProduct = 'GetAllProduct',
  GetProductShop = 'GetProductShop',
  GetAllNests = 'GetAllNests',
  GetCommentProduction = 'GetCommentProduction',
  LengthCartUser = 'LengthCartUser',
  GetProductByID = 'GetProductByID',
  MyCartUser = "MyCartUser",
  MyBillUser = "MyBillUser",
  AllProvincesVn = "AllProvincesVn",
  BillAdmin = "BillAdmin",
}

export type TypeHookReactQuery = {
  "data": any[]
  "page": number
}