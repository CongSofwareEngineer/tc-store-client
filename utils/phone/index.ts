import { parsePhoneNumberWithError } from 'libphonenumber-js/min'

export const getPhoneFormat = (phone: string) => {
  const phoneNumber = parsePhoneNumberWithError(phone, 'VN')

  return phoneNumber.number
}
