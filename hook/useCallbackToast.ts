import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import useLanguage from './useLanguage'

const useCallbackToast = () => {
  const { translate } = useLanguage()
  const callback = (data: any = null, text?: string) => {
    if (!!data) {
      showNotificationSuccess(text || translate('success.update'))
    } else {
      showNotificationSuccess(text || translate('success.create'))
    }
  }

  const callbackReject = (data: any = null, text?: string) => {
    if (!!data) {
      showNotificationError(text || translate('error.update'))
    } else {
      showNotificationSuccess(text || translate('error.create'))
    }
  }

  return {
    callback,
    callbackReject,
  }
}

export default useCallbackToast
