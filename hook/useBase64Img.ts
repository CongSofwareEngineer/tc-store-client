import { getBase64 as getBase64Base, showNotificationError } from '../utils/functions';
import useLanguage from './useLanguage';

const useBase64Img = (maxSizeMB = 5) => {
  const { translate } = useLanguage()
  const getBase64 = (file: any, callback: (parma?: any) => void) => {
    try {
      if (file.size > maxSizeMB * 1048576) {
        const text = translate('warning.maxSizeFile').replace('{size}', `${maxSizeMB} MB`)
        showNotificationError(text)
        return
      }

      getBase64Base(file, callback)
    } catch (error) {
      showNotificationError(translate('errors.file'))
     }
  }

  return {
    getBase64
  }
}

export default useBase64Img