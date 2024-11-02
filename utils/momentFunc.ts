import { SLICE } from '@/constant/redux'
import storeRedux from '@/redux/store'
import moment from 'moment'

const localMoment = () => {
  const { locale } = storeRedux.getState().app[SLICE.Language]
  moment.locale(locale)
  return moment
}

export const formatDateTime = (data: any, format = 'DD / MM /YYYY') => {
  return localMoment()(data).format(format)
}
