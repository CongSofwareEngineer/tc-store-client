import crypto from 'crypto-js'

export const encryptData = (value: string | object, pinCode: string = process.env.NEXT_PUBLIC_KEY_SALT) => {
  try {
    const iv = crypto.enc.Hex.parse(process.env.NEXT_PUBLIC_KEY_IV_ENCODE)

    return crypto.AES.encrypt(JSON.stringify(value), crypto.enc.Utf8.parse(pinCode), {
      iv: iv,
    }).toString()
  } catch (error) {
    return ''
  }
}

export const encodeDataMaxLength = (
  value: string | object,
  maxLength = 42,
  pinCode: string = process.env.NEXT_PUBLIC_KEY_SALT,
) => {
  try {
    const iv = crypto.enc.Hex.parse(process.env.NEXT_PUBLIC_KEY_IV_ENCODE)

    const stringEncode = crypto.AES.encrypt(JSON.stringify(value), crypto.enc.Utf8.parse(pinCode), {
      iv: iv,
    }).toString()
    return stringEncode.substr(0, maxLength)
  } catch (error) {
    return ''
  }
}

export const decryptData = (value: any, pinCode: string = process.env.NEXT_PUBLIC_KEY_SALT) => {
  try {
    const iv = crypto.enc.Hex.parse(process.env.NEXT_PUBLIC_KEY_IV_ENCODE)

    const bytes = crypto.AES.decrypt(value.toString(), crypto.enc.Utf8.parse(pinCode), {
      iv: iv,
    })

    const decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8))
    return decryptedData
  } catch (error) {
    return ''
  }
}
