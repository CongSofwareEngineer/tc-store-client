export enum RequestType {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

export const ColorConfig = {
  'gray-1': '#333333',
  'gray-3': '#828282',
  'gray-4': '#BDBDBD',
  'gray-5': '#E0E0E0',
  background: '#F4F4FB',
  blue: '#00A3FF',
  green: '#00C398',
  red: '#E93324',
  hover: '#bdbdbd12',
  yellow: '#F2C94C',
  'yellow-30': '#f2c94c30',
  mask: '#00000078',
  '#bbf7d0': '#bbf7d0',
  green1: '#66FF33',
} as const

export enum CookieKey {
  'User' = 'User',
  'MyCart' = 'MyCart'
}

export enum LocalKey {
  'User' = 'User',
  'MyCart' = 'MyCart'
}

export enum FilterAPI {
  TypeProduct = 'typeProduct',
  LargerPrice = 'largerPrice',
  SmallerPrice = 'smallerPrice',
  Food = 'food',
  Water = 'water',
  Fashion = 'fashion',
  Electronic = 'electronic',
  Category = 'category'
}

export const PageSizeLimit = 15

export const OptionPayment = {
  momo: 'momo',
  banking: 'banking',
  delivery: 'delivery'
}