import MessageVN from '@/public/assets/language/vn.json'

const localeVN = {
  locale: 'vi',
  messages: MessageVN
}

export enum SLICE {
  Setting = 'Setting',
  Language = 'Language',
  UserData = 'UserData',
  ConnectedChain = 'ConnectedChain',
  CategoryMenu = 'CategoryMenu'
}

export const WHITE_LIST_PERSIT_REDUX = [SLICE.Language]

export const INIT_STATE = {
  [SLICE.Language]: localeVN,
  [SLICE.Setting]: null,
  [SLICE.UserData]: null,
  [SLICE.ConnectedChain]: 56,
  [SLICE.CategoryMenu]: []
}

export type TYPE_SLICE = {
  [SLICE.Language]: {
    locale: string,
    messages: any
  }
  [SLICE.Setting]: Object | null
  [SLICE.UserData]: Object | null
  [SLICE.ConnectedChain]: Number,
  [SLICE.CategoryMenu]: Array<{ key: string, name: string }>
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


