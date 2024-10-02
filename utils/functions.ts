import lodash from 'lodash'
import BigNumber from 'bignumber.js'

export const cloneData = (data: any, defaultValue: any = '') => {
  try {
    if (!data) {
      return data
    }
    return lodash.cloneDeep(data)
  } catch (error) {
    return defaultValue
  }
}

export const isEmptyObject = (data: any) => {
  return lodash.isEmpty(data)
}

export const numberWithCommas = (x: any) => {
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
  } catch (error) {
    return 0
  }
}
export const formatPriceBase = (data: any, discount = 20) => {
  try {
    if (Number(data) === 0) {
      return 0
    }
    const rate = new BigNumber(100).plus(discount).dividedBy(100).toNumber()
    return numberWithCommas(new BigNumber(rate).multipliedBy(data).toNumber())
  } catch (error) {
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
  } catch (error) {
    console.log(error)
  }
}

export const getDataLocal = (key = '', defaultValue: any = '') => {
  try {
    const data: string = localStorage.getItem(key) || ''
    return JSON.parse(data)
  } catch (error) {
    return defaultValue
  }
}

export const removeDataLocal = (key: string) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.log(error)
  }
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
  } catch (error) {
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
  let totalPage = BigNumber(data.length).dividedBy(Number(limit)).toNumber()

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

export const detectImg = (src: any) => {
  try {
    if (!src) {
      return ''
    }
    if (src?.startsWith('data:image')) {
      return src
    }

    if (src?.startsWith('https')) {
      return src
    }
    return `https://res.cloudinary.com/tc-store/image/upload/v1722158972/${src}`
  } catch (error) {
    return ''
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
  } catch (error) {
    return '/images/Profile/Userdetail/iconUserDetail.png'
  }
}

export const ellipsisText = (
  text: string,
  prefixLength = 13,
  suffixLength = 4
) => {
  text = text || ''
  return `${text.substr(0, prefixLength)}...${text.substr(
    text.length - suffixLength,
    suffixLength
  )}`
}

export function isObject(value: any) {
  try {
    if (!value) {
      return false
    }
    return Object.prototype.toString.call(value) === '[object Object]'
  } catch (error) {
    return false
  }
}
