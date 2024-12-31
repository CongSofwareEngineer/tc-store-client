import { isIOS, isMacOs } from 'react-device-detect'
type Props = {
  typeAndroid?: string
  typeApple?: string
}
const useTypeFile = (props?: Props) => {
  const typeFile = () => {
    if (isIOS && isMacOs) {
      return props?.typeApple || 'image/*'
    }
    return props?.typeAndroid || '.png,.jpg,.jpeg,.gif,.webp,.svg+xml,.bmp'
  }

  const isValidFile = (typeFile: string) => {}
  return {
    typeFile: typeFile(),
    isValidFile,
  }
}

export default useTypeFile
