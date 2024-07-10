import { Language, Path } from '@/constant/redux'
import { useAppSelector } from '@/redux/store'
import { useCallback } from 'react'

const useLanguage = () => {
  const { Language } = useAppSelector(state => state.app)
  const translate = useCallback((key: Path<Language>) => {
    try {
      const arrKey = key.split('.')
      let text: any = ''
      arrKey.forEach(e => {
        if (!text) {
          text = Language?.messages[e]
        } else {
          text = text[e]
        }

      })
      return text
    } catch (error) {
      return ''
    }

  }, [Language?.messages])
  return { translate, lang: Language?.locale || 'vn' }
}

export default useLanguage