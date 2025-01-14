import { zustandLanguage } from '@/zustand/useLanguage'
import moment from 'moment'
import { isObject } from './functions'
import dayjs from 'dayjs'

const localMoment = () => {
  const { locale } = zustandLanguage.getState().language
  moment.locale(locale)
  return moment
}

export const convertDateToNumber = (data?: any) => {
  try {
    let timeTemp = data
    if (!timeTemp) {
      timeTemp = Date.now()
    }
    if (typeof data === 'string' && isNumericString(data)) {
      timeTemp = parseInt(data)
    }
    if (isObject(data)) {
      timeTemp = timeTemp.toString()
    }

    return localMoment()(timeTemp || moment()).valueOf()
  } catch {
    return localMoment()().valueOf()
  }
}

export const plusDay = (value?: any, amount = 7, type: moment.DurationInputArg2 = 'days') => {
  try {
    return localMoment()(value || moment()).add(amount, type)
  } catch {
    return moment()
  }
}

export function isNumericString(input: string) {
  try {
    // Matches only strings containing one or more digits
    return /^\d+$/.test(input)
  } catch {
    return false
  }
}

export const formatDateTime = (data: any, format = 'DD / MM /YYYY') => {
  try {
    let timeTemp = data
    if (typeof data === 'string' && isNumericString(data)) {
      timeTemp = parseInt(data)
    }
    if (isObject(data)) {
      timeTemp = timeTemp.toString()
    }

    return localMoment()(timeTemp).format(format)
  } catch {
    return localMoment()().format(format)
  }
}

export const expiredTimeToNumber = (data: any) => {
  try {
    let timeTemp = data

    if (typeof data === 'string') {
      if (isNumericString(data)) {
        timeTemp = parseInt(data)
      }
    }

    if (isObject(data)) {
      timeTemp = timeTemp.toString()
    }

    const daysDifference = localMoment()(timeTemp).diff(moment(), 'days')
    return daysDifference
  } catch {
    return data
  }
}

export const diffTime = (data: any, type: moment.DurationInputArg2 = 'days') => {
  try {
    let timeTemp = data

    if (typeof data === 'string') {
      if (isNumericString(data)) {
        timeTemp = parseInt(data)
      }
    }

    if (isObject(data)) {
      timeTemp = timeTemp.toString()
    }

    const daysDifference = localMoment()(timeTemp).diff(moment(), type)
    return daysDifference
  } catch {
    return 0
  }
}

export const formatDatePicker = (data: any) => {
  try {
    let timeTemp = data
    if (typeof data === typeof dayjs) {
      return timeTemp
    }
    timeTemp = formatDateTime(data, 'DD/MM/YYYY')

    return dayjs(timeTemp, 'DD/MM/YYYY')
  } catch {
    return dayjs(Date.now(), 'DD/MM/YYYY')
  }
}
