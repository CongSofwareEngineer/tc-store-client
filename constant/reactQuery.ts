export enum QueryKey {
  GetAllProduct = 'GetAllProduct',
  GetAllNests = 'GetAllNests',
}

export type TypeHookReactQuery = {
  "data": any[],
  "totalPage": number,
  "page": number,
  "status": number | undefined,
  "messages": string | undefined
} & Record<string, any>