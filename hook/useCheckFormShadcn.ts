import { parsePhoneNumber } from 'libphonenumber-js'
import useLanguage from './useLanguage'
import { z } from 'zod'

const useCheckFormShadcn = () => {
  const { translate } = useLanguage()


  const checkNumberPhone = (z: any) => {
    return z.string().transform((arg: any, ctx: any) => {
      try {
        if (!arg) {
          ctx.addIssue({
            message: translate('errors.empty'),
            code: z.ZodIssueCode.custom,
          })
        } else {
          const phoneNumber = parsePhoneNumber(arg, 'VN')
          if (phoneNumber && phoneNumber.isValid()) {
            return arg
          }
          ctx.addIssue({
            message: translate('warning.errorSDT'),
            code: z.ZodIssueCode.custom,
          })
        }
        return z.NEVER
      } catch (_: any) {
        ctx.addIssue({
          message: translate('warning.errorSDT'),
          code: z.ZodIssueCode.custom,
        })
        return z.NEVER
      }
    })
  }

  const checkIsNumber = (value: any) => {
    return z.string().transform((arg, ctx) => {

      if (!arg) {
        ctx.addIssue({
          message: translate('errors.empty'),
          code: z.ZodIssueCode.custom,
        })
      } else {
        const hasNumbers = /[0-9]/.test(value);
        if (hasNumbers) {
          return value
        }
        ctx.addIssue({
          message: translate('errors.inValueNumber'),
          code: z.ZodIssueCode.custom,
        })
      }
      return z.NEVER
    })
  }

  const checkEmail = (email: string) => {
    if (!email) {
      return false
    }

    const validEmail = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (validEmail) {
      return null
    }
    return true
  }

  const checkPassword = (z: any) => {

    return z.string().transform((arg:any, ctx:any) => {
      if (!arg) {
        ctx.addIssue({
          message: translate('errors.empty'),
          code: z.ZodIssueCode.custom,
        })
      } else {
        const noSQLInjectionPattern = /(\$|\{|\}|\[|\])/g;

        // Check if the input contains any NoSQL injection patterns
        if (!noSQLInjectionPattern.test(arg)) {
          return arg 
        }
        ctx.addIssue({
          message: translate('errors.invalidPass'),
          code: z.ZodIssueCode.custom,
        })
        return z.NEVER
      }
    })


  }

  return {
    checkNumberPhone,
    checkEmail,
    checkPassword,
    checkIsNumber
  }
}

export default useCheckFormShadcn