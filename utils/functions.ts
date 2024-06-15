// import lodash from 'lodash'
import { notification } from 'antd';
import BigNumber from 'bignumber.js';
import { toast } from 'react-toastify';


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
  try {
    return numberWithCommas(data || '0')
  } catch (error) {
    return 0
  }
}
export const formatPriceBase = (data: any, discount = 20) => {
  try {
    if (Number(data) === 0) {
      return 0
    }
    const rate = new BigNumber(100).plus(discount).dividedBy(100).toNumber()
    return numberWithCommas(new BigNumber(rate).multipliedBy(data).toNumber())
  } catch (error) {
    return 0

  }
}

export const showNotification = (
  title = null,
  description = ''
) => {
  const params: any = {
    placement: 'bottomRight',
    className: 'notification-class',
    bottom: 54,
    duration: 5
  };
  if (title) {
    params.message = title;
  }
  if (description) {
    params.description = description;
  }
  notification.open(params);
}


export const showNotificationError = (errorMessage = '', autoClose = 5000) => {
  toast.error(errorMessage, {
    position: 'top-right',
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });
};

export const showNotificationSuccess = (message = '', autoClose = 5000) => {
  toast.success(message, {
    position: 'top-right',
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });
};

export function delayTime(ms = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}