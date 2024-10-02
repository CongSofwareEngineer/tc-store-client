import moment from 'moment'

export const formatDateTime = (data: any) => {
  return moment(data).format('DD / MM /YYYY')
}
