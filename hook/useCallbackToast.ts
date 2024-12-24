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

  const callbackUpdateSuccess = (text?: string) => {
    showNotificationSuccess(text || translate('success.update'))
  }

  const callbackDeleteSuccess = (text?: string) => {
    showNotificationSuccess(text || translate('success.delete'))
  }

  const callbackCreateSuccess = (text?: string) => {
    showNotificationSuccess(text || translate('success.create'))
  }

  const callbackUpdateError = (text?: string) => {
    showNotificationError(text || translate('error.update'))
  }

  const callbackDeleteError = (text?: string) => {
    showNotificationError(text || translate('error.delete'))
  }

  const callbackCreateError = (text?: string) => {
    showNotificationError(text || translate('error.create'))
  }

  return {
    callback,
    callbackReject,
    callbackCreateSuccess,
    callbackUpdateSuccess,
    callbackDeleteSuccess,
    callbackUpdateError,
    callbackCreateError,
    callbackDeleteError,
  }
}

export default useCallbackToast
