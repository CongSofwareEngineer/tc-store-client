import { SLICE } from '@/constant/redux'
import storeRedux from '@/redux/store'
import moment from 'moment'

const localMoment = () => {
  const { locale } = storeRedux.getState().app[SLICE.Language]
  moment.locale(locale)
  return moment
}

export function isNumericString(input: string) {
  try {
    // Matches only strings containing one or more digits
    return /^\d+$/.test(input)
  } catch (error) {
    return false
  }
}

export const formatDateTime = (data: any, format = 'DD / MM /YYYY') => {
  try {
    let timeTemp = data
    if (typeof data === 'string' && isNumericString(data)) {
      timeTemp = parseInt(data)
    }

    return localMoment()(timeTemp).format(format)
  } catch (error) {
    return data
  }
}
