import {
  delayTime,
  getBase642,
  getBase64 as getBase64Base,
  showNotificationError,
} from '../utils/functions'
import useLanguage from './useLanguage'

const useBase64Img = (maxSizeMB = 7) => {
  const { translate } = useLanguage()

  const reduceImageQuality = (imageFile: File, quality = 0.5) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(imageFile)
      reader.onload = (event) => {
        const imgElement = document.createElement('img')
        imgElement.src = event.target?.result + ''
        imgElement.onload = () => {
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          canvas.width = imgElement.width
          canvas.height = imgElement.height
          context?.drawImage(imgElement, 0, 0, canvas.width, canvas.height)
          canvas.toBlob(
            (blob) => {
              resolve(blob)
            },
            'image/jpeg',
            quality
          )
        }
      }
    })
  }

  const getBase64 = async (file: any, callBack: any) => {
    try {
      if (file.size > maxSizeMB * 1048576) {
        const text = translate('warning.maxSizeFile').replace(
          '{size}',
          `${maxSizeMB} MB`
        )
        showNotificationError(text)
        return
      }

      const blod = await reduceImageQuality(file)
      const base64 = await getBase642(blod)
      await delayTime(1000)
      console.log('====================================')
      console.log({
        base64: base64,
        name: file.name,
      })
      console.log('====================================')
      callBack({
        base64: base64,
        name: file.name,
      })
    } catch (error) {
      console.log('====================================')
      console.log({ error })
      console.log('====================================')
      showNotificationError(translate('errors.file'))
      return null
    }
  }

  return {
    getBase64,
  }
}

export default useBase64Img
