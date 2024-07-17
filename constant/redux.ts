import MessageVN from '@/public/assets/language/vn.json'

const localeVN = {
  locale: 'vn',
  messages: MessageVN
}

export enum SLICE {
  Setting = 'Setting',
  Language = 'Language',
  UserData = 'UserData',
  ConnectedChain = 'ConnectedChain',
  CategoryMenu = 'CategoryMenu',
  Provinces = 'Provinces'

}

export const WHITE_LIST_PERSIT_REDUX = [SLICE.Language]

export const INIT_STATE = {
  [SLICE.Language]: localeVN,
  [SLICE.Setting]: null,
  [SLICE.UserData]: null,
  [SLICE.ConnectedChain]: 56,
  [SLICE.CategoryMenu]: [],
  [SLICE.Provinces]: [],
}


export type TypeUserData = {
  _id?: string
  address?: string
  addressShipper: string[]
  sdt?: string
  name?: string
  pass?: string
  [key: string]: any
}

export type TYPE_SLICE = {
  [SLICE.Language]: {
    locale: string,
    messages: any
  }
  [SLICE.Setting]: Object | null
  [SLICE.UserData]: TypeUserData | null
  [SLICE.ConnectedChain]: Number,
  [SLICE.CategoryMenu]: Array<{ keyName: string, icon?: string, lang?: { [key: string]: string } }>,
  [SLICE.Provinces]: any[]
}

export type TYPE_PERSIST_REDUCER = TYPE_SLICE & unknown

export type Language = typeof MessageVN

export type Path<T, Prefix extends string = ''> = T extends object
  ? {
    [K in keyof T]: Path<
      T[K],
      `${Prefix}${Prefix extends '' ? '' : '.'}${K & string}`
    >
  }[keyof T]
  : Prefix


