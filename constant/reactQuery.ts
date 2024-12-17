export enum QUERY_KEY {
  GetAllProduct = 'GetAllProduct',
  GetListProductAdmin = 'GetListProductAdmin',
  GetCategoryAdmin = 'GetCategoryAdmin',
  GetSubCategoryAdmin = 'GetSubCategoryAdmin',
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
  RevenueAdmin = 'RevenueAdmin',
  GetNests = 'GetNests',
  GetShoesShop = 'GetShoesShop',
  GetMoreCollections = 'GetMoreCollections',
  GetFanPage = 'GetFanPage',
  GetUserAdmin = 'GetUserAdmin',
}

export type TypeHookReactQuery = {
  data: any[]
  page: number
}
