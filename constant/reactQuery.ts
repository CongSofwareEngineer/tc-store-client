export enum QueryKey {
  GetAllProduct = 'GetAllProduct',
  GetAllNests = 'GetAllNests',
  GetCommentProduction = 'GetCommentProduction',
  CartUser = 'CartUser',
  GetProductByID = 'GetProductByID'
}

export type TypeHookReactQuery = {
  "data": any[]
  "totalPage": number
  "page": number
  "status": number | undefined
  "messages": string | undefined
  [key: string]: any
}