export enum QUERY_KEY {
  GetAllProduct = 'GetAllProduct',
  GetListProductAdmin = 'GetListProductAdmin',
  GetCategoryAdmin = 'GetCategoryAdmin',
  GetProductShop = 'GetProductShop',
  GetAllNests = 'GetAllNests',
  GetCommentProduction = 'GetCommentProduction',
  GetCommentDetail = 'GetCommentDetail',
  LengthCartUser = 'LengthCartUser',
  GetProductByID = 'GetProductByID',
  MyCartUser = 'MyCartUser',
  MyBillUser = 'MyBillUser',
  AllProvincesVn = 'AllProvincesVn',
  BillAdmin = 'BillAdmin',
}

export type TypeHookReactQuery = {
  data: any[]
  page: number
}
