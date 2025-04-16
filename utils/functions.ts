// import lodash from 'lodash'

import { images } from '@/configs/images'
import { COLOR, DEFAULT_FEE_SHIP, FILTER_BILL } from '@/constants/app'
import { IItemListBill } from '@/services/ClientApi/type'

export const cloneData = (data: any, defaultValue: any = '') => {
  try {
    if (!data) {
      return data
    }
    return JSON.parse(JSON.stringify(data))
  } catch {
    return defaultValue
  }
}

export const isEmptyObject = (data: any) => {
  try {
    return Object.keys(data).length > 0
  } catch {
    return false
  }
}

export const numberWithCommas = (x?: any) => {
  if (!x) {
    return 0
  }
  const parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

export const formatPrice = (data: any) => {
  try {
    return numberWithCommas(data || '0')
  } catch {
    return 0
  }
}
export const formatPriceBase = (data: any, discount = 20) => {
  try {
    if (Number(data) === 0) {
      return 0
    }
    const rate = (Number(discount) + 100) / 100

    // const rate = (100 + discount) / 100
    return data * rate
    // return numberWithCommas(rate * rate)
  } catch {
    return 0
  }
}

export function delayTime(ms = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const saveDataLocal = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {}
}

export const getDataLocal = (key = '', defaultValue: any = '') => {
  try {
    const data: string = localStorage.getItem(key) || ''
    return JSON.parse(data)
  } catch {
    return defaultValue
  }
}

export const removeDataLocal = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch {}
}

export const getBase642 = (file: any, callback: any): void => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(file)
}

export const getBase64 = (file: File, callback: (parma?: any) => void) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      callback &&
        callback({
          name: file.name,
          type: file.type,
          base64: reader.result,
        })
      resolve(reader.result)
    }
    reader.onerror = (error) => reject(error)
  })
}

export const isURL = (link: string) => {
  try {
    const url = new URL(link)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export const scrollTop = () => {
  if (window) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

export const processQuery = (data: any[], query: any) => {
  const page = Number(query?.page ?? 1)
  const limit = Number(query?.limit ?? 20)

  const amountQuery = page * limit
  const arr: any[] = []
  let totalPage = data.length / limit

  if (totalPage <= 1) {
    totalPage = 1
  }
  data.forEach((item, index) => {
    if (page === 1) {
      if (index < limit) {
        arr.push(item)
      }
    } else {
      if (index >= limit * (page - 1) && index <= amountQuery) {
        arr.push(item)
      }
    }
  })

  return {
    data: arr,
    totalPage,
    page,
  }
}

export const viewExternal = (url: string) => {
  window.open(url, '_blank')
}

export const detectImg = (src?: any, maxWidthScale = 0) => {
  try {
    if (!src) {
      return images.icon.unknowTokenIcon
    }

    if (src?.startsWith('data:image') || src?.startsWith('/images')) {
      return src
    }

    if (src?.startsWith('https')) {
      return src
    }
    if (maxWidthScale > 0) {
      return `https://res.cloudinary.com/tc-store/image/upload/c_scale,w_${maxWidthScale}/v1722158972/${src}`
    }
    return `https://res.cloudinary.com/tc-store/image/upload/v1722158972/${src}`
  } catch {
    return images.icon.unknowTokenIcon
  }
}

export const detectAvatar = (src: any) => {
  try {
    if (!src) {
      return '/images/Profile/Userdetail/iconUserDetail.png'
    }

    if (src?.startsWith('https')) {
      return src
    }
    return `https://res.cloudinary.com/tc-store/image/upload/v1722158972/${src}`
  } catch {
    return '/images/Profile/Userdetail/iconUserDetail.png'
  }
}

export const ellipsisText = (text: string, prefixLength = 13, suffixLength = 4): string => {
  text = text || ''
  return `${text.substr(0, prefixLength)}...${text.substr(text.length - suffixLength, suffixLength)}`
}

export function isObject(value: any): boolean {
  try {
    if (!value) {
      return false
    }
    return Object.prototype.toString.call(value) === '[object Object]'
  } catch {
    return false
  }
}

export function lowercase(value: any) {
  return typeof value === 'string' ? value.toLowerCase() : value
}

export function uppercase(value: any) {
  return typeof value === 'string' ? value.toUpperCase() : value
}

export const getColorStatus = (key: FILTER_BILL) => {
  switch (key) {
    case FILTER_BILL.Processing:
      return COLOR.red

    case FILTER_BILL.Delivering:
      return COLOR.blue1

    default:
      return COLOR.green1
  }
}

export function convertBoolean(value: any): boolean {
  const str = String(value).toLowerCase()
  return str === 'true' || str === '1'
}

export const stringToArrayBuffer = (str: string) => {
  const buffer = new ArrayBuffer(str.length)

  // Create a Uint8Array view over the ArrayBuffer
  const uint8Array = new Uint8Array(buffer)

  // Fill the Uint8Array with the string's char codes
  for (let i = 0; i < str.length; i++) {
    uint8Array[i] = str.charCodeAt(i)
  }

  return buffer
}

export const getUrlProduct = (product: any) => {
  return `/shop/${product?.moreData?.keyName || product?.keyName}`
}

export const totalBill = (listBill: IItemListBill[] = [], discount = 0) => {
  try {
    let totalBill = 0
    listBill.forEach((bill) => {
      totalBill += bill.amountBuy * bill.price
    })
    totalBill += DEFAULT_FEE_SHIP
    totalBill -= discount
    return totalBill
  } catch {
    return 0
  }
}
