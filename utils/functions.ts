// import lodash from 'lodash'
import BigNumber from 'bignumber.js';


export const cloneData = (data: any) => {
  if (!data) {
    return data
  }
  return JSON.parse(JSON.stringify(data))
}

export const isEmptyObject = (data: any) => {
  const isObj = data && typeof data === 'object'
  return isObj && Object.keys(data).length < 1
}


export const numberWithCommas = (x: any) => {
  if (!x) {
    return 0
  }
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const formatPrice = (data: any) => {
  return numberWithCommas(data)
}
export const formatPriceBase = (data: any, discount = 20) => {
  const rate = new BigNumber(100).plus(discount).dividedBy(100).toNumber()
  return numberWithCommas(new BigNumber(rate).multipliedBy(data).toNumber())
}