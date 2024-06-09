import crypto from 'crypto-js'

export const encryptData = (value: string, pinCode: string = process.env.NEXT_PUBLIC_KEY_SALT) => {
  try {
    return crypto.AES.encrypt(value.toString(), pinCode).toString()
  } catch (error) {
    return ''
  }
}

export const decryptData = (value: string, pinCode: string = process.env.NEXT_PUBLIC_KEY_SALT) => {
  try {
    return crypto.AES.decrypt(value.toString(), pinCode).toString(crypto.enc.Utf8)
  } catch (error) {
    return false
  }
}

export const getPinCodeSalting = (pinCode: string) => {
  return `${pinCode}${process.env.NEXT_PUBLIC_KEY_SALT}`
}

export const encodeSHA1 = (string: string, salt: string = process.env.NEXT_PUBLIC_KEY_SALT) => {
  return crypto.HmacSHA1(string, salt)
}
