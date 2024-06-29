import { useCallback } from 'react'
import useLanguage from './useLanguage'
import { parsePhoneNumber } from 'libphonenumber-js'

const useCheckForm = () => {
  const { translate } = useLanguage()

  const checkNumberPhone = useCallback((sdt: string) => {
    try {
      if (!sdt) {
        return translate('warning.errorSDT')
      }
      const phoneNumber = parsePhoneNumber(sdt, 'VN')
      if (phoneNumber && phoneNumber.isValid()) {
        return null
      }
      return translate('warning.errorSDT')
    } catch (error) {
      return translate('warning.errorSDT')
    }
  }, [translate])

  const checkEmail = useCallback((email: string) => {
    if (!email) {
      return translate('errors.empty')
    }

    const validEmail = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (validEmail) {
      return null
    }
    return translate('errors.gmail')
  }, [translate])

  return {
    checkNumberPhone,
    checkEmail
  }
}

export default useCheckForm