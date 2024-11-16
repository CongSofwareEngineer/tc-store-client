import dayjs from 'dayjs'
export enum REQUEST_TYPE {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export enum TYPE_LOADING_GET_DATA {
  MyBill = 'MyBill',
  Shop = 'Shop',
  CommentUser = 'CommentUser',
  MyCart = 'MyCart',
  ShopDetail = 'ShopDetail',
  MyProfile = 'MyProfile',
  ListProductInHome = 'ListProductInHome',
}

export const COLOR_CONFIG = {
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

export enum COOKIE_KEY {
  'User' = 'User',
  'MyCart' = 'MyCart',
  'Auth' = 'Auth',
  'AuthRefresh' = 'AuthRefresh',
}

export enum COOKIE_EXPIRED {
  'ExpiredAuth' = Number(
    new Date().setHours(new Date().getHours() + 2).toFixed()
  ) - 20000,
  'ExpiredAuthRefresh' = Number(
    new Date().setDate(new Date().getDate() + 15).toFixed()
  ) - 20000,
}

export enum LOCAL_STORAGE_KEY {
  'User' = 'User',
  'MyCart' = 'MyCart',
  'IsFirstPermissionNoti' = 'IsFirstPermissionNoti',
  'ListSDTBuy' = 'ListSDTBuy',
}

export enum FilterAPI {
  TypeProduct = 'typeProduct',
  LargerPrice = 'largerPrice',
  SmallerPrice = 'smallerPrice',
  Food = 'food',
  Water = 'water',
  Fashion = 'fashion',
  Electronic = 'electronic',
  Category = 'category',
}

export const PAGE_SIZE_LIMIT = 12

export const OPTIONS_PAYMENT = {
  momo: 'momo',
  banking: 'banking',
  delivery: 'delivery',
}

export enum OBSERVER_KEY {
  'LogOut' = 'LogOut',
  'UpdateCookieAuth' = 'UpdateCookieAuth',
}

export enum LANGUAGE_SUPPORT {
  'VN' = 'vn',
  'EN' = 'en',
}

export enum FILTER_BILL {
  'All' = 'all',
  'Processing' = 'processing',
  'Delivering' = 'delivering',
  'DeliverySuccess' = 'deliverySuccess',
  'Canceled' = 'canceled',
}

export const DATE_START_FILTER = dayjs(
  new Date(Date.now()).setDate(new Date().getDate() - 1)
)

export const MAX_PIXEL_REDUCE = 300 as Number

export const LIST_PAGE_REQUIRE_LOGIN = ['/my-cart', '/my-page']
export const LIST_PAGE_NO_FOOTER = ['/my-cart', '/contact', '/register']
