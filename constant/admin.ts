export const TYPE_ATTRIBUTE = {
  objAndArr: 'ObjAndArr',
  objAndObject: 'ObjAndObject',
}

export const TYPE_HANDLE = {
  add: 'add',
  update: 'update',
  delete: 'delete',
} as const

export type ITYPE_PRODUCT = 'shoes' | 'laptop' | 'nest' | 'technology' | 'normal'
export enum TYPE_PRODUCT {
  shoes = 'shoes',
  nest = 'nest',
  technology = 'technology',
  normal = 'normal',
  laptop = 'laptop',
}

export const VALUE_KEY_DEFAULT = {
  sizes: [
    'red',
    'white',
    'black',
    'yellow',
    'pink',
    'brown',
    'orange',
    'purple',
    'gray',
    'green',
    'whiteBlack',
    'orangeWhite',
    'blueWhite',
  ],
} as const

export const SEX = {
  male: 'male',
  female: 'female',
} as const
