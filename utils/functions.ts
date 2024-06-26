import lodash from 'lodash'
import { notification } from 'antd';
import BigNumber from 'bignumber.js';
import { toast } from 'react-toastify';


export const cloneData = (data: any, defaultValue: any = '') => {
  try {
    if (!data) {
      return data
    }
    return lodash.cloneDeep(data)
  } catch (error) {
    return defaultValue
  }
}

export const isEmptyObject = (data: any) => {
  return lodash.isEmpty(data)
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

export const saveDataLocal = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.log(error)
  }
}

export const getDataLocal = (key = '', defaultValue: any = '') => {
  try {
    const data: string = localStorage.getItem(key) || ''
    return JSON.parse(data)
  } catch (error) {
    return defaultValue
  }
}

export const removeDataLocal = (key: string) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.log(error)
  }
}

export const getBase64 = (file: File, callback: (parma?: any) => void) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      callback &&
        callback({
          name: file.name,
          type: file.type,
          base64: reader.result,
        })
      resolve(reader.result)
    }
    reader.onerror = (error) => reject(error)
  })
}

export const isURL = (link: string) => {
  try {
    let url
    url = new URL(link)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch (error) {
    return false
  }
}