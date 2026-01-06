import AES from 'crypto-js/aes'
import EncUtf8 from 'crypto-js/enc-utf8'

const getIV = () => {
  return {
    words: [10430314, -140825763, -493589880, -1325521129, 831492685, 2080374784],
    sigBytes: 21,
  } as any
}

const encUtf8 = (pinCode: string) => {
  const key = new TextEncoder().encode(pinCode)

  return key as any
}

export const encryptData = (value: string | object, pinCode: string = process.env.NEXT_PUBLIC_KEY_SALT) => {
  try {
    return AES.encrypt(JSON.stringify(value), encUtf8(pinCode), {
      iv: getIV(),
    }).toString()
  } catch {
    return ''
  }
}

export const decryptData = (value: any, pinCode: string = process.env.NEXT_PUBLIC_KEY_SALT) => {
  try {
    const bytes = AES.decrypt(value.toString(), encUtf8(pinCode), {
      iv: getIV(),
    })

    const decryptedData = JSON.parse(bytes.toString(EncUtf8))

    return decryptedData
  } catch {
    return ''
  }
}

export const encodeDataMaxLength = (value: string | object, maxLength = 42, pinCode: string = process.env.NEXT_PUBLIC_KEY_SALT) => {
  try {
    const stringEncode = encryptData(value, pinCode)

    if (stringEncode.length < 43) {
      return stringEncode
    }

    return stringEncode.substr(0, maxLength)
  } catch {
    return ''
  }
}
