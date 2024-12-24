import MessageVN from '@/public/assets/language/vn.json'
import { LANGUAGE_SUPPORT } from './app'

const localeVN = {
  locale: LANGUAGE_SUPPORT.VN,
  messages: MessageVN,
}

export enum ZUSTAND {
  Setting = 'setting',
  ModalAdmin = 'modalAdmin',
  Language = 'language',
  UserData = 'userData',
  ConnectedChain = 'connectedChain',
  CategoryMenu = 'categoryMenu',
  Provinces = 'provinces',
}

export const INIT_ZUSTAND = {
  [ZUSTAND.Language]: localeVN,
  [ZUSTAND.Setting]: null,
  [ZUSTAND.UserData]: null,
  [ZUSTAND.ConnectedChain]: 56,
  [ZUSTAND.CategoryMenu]: [],
  [ZUSTAND.Provinces]: [],
  [ZUSTAND.ModalAdmin]: {
    open: false,
    body: null,
    className: '',
    width: '500px',
    height: 'auto',
    title: '',
    showBtnClose: false,
    classNameContent: '',
    overClickClose: true,
  },
}

export type TYPE_USER_DATA = {
  _id?: string
  address?: string
  addressShipper: Array<{
    address: string
    addressDetail: string
  }>
  sdt?: string
  name?: string
  pass?: string
  [key: string]: any
}

export type TYPE_ZUSTAND = {
  [ZUSTAND.Language]: {
    locale: string
    messages: any
  }
  [ZUSTAND.Setting]: Object | null
  [ZUSTAND.UserData]: TYPE_USER_DATA | null
  [ZUSTAND.ConnectedChain]: Number
  [ZUSTAND.CategoryMenu]: Array<{
    keyName: string
    icon?: string
    lang?: { [key: string]: string }
    [key: string]: any
  }>
  [ZUSTAND.Provinces]: any[]
  [ZUSTAND.ModalAdmin]: {
    open?: boolean
    body?: React.ReactNode
    className?: string
    classNameContent?: string
    width?: string
    height?: string
    callBackAfter?: (param?: any) => any
    title?: React.ReactNode | string
    showBtnClose?: boolean
    overClickClose?: boolean
  }
}

export type TYPE_LANGUAGE = typeof MessageVN
