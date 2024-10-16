import { Language, Path } from '@/constant/redux'
import { useAppSelector } from '@/redux/store'
import { message } from 'antd'
import { useCallback } from 'react'

const useLanguage = () => {
  const { Language } = useAppSelector((state) => state.app)
  const { CategoryMenu } = useAppSelector((state) => state.app)

  const translate = useCallback(
    (key?: Path<Language>) => {
      try {
        const arrKey = key!.split('.')
        let text: any = ''
        arrKey.forEach((e) => {
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
    },
    [Language]
  )

  const getLabelCategory = (key: string) => {
    try {
      const data = CategoryMenu.find((e) => e.keyName === key)
      return data?.lang?.[Language.locale]
    } catch (error) {
      return key
    }
  }

  const copyToClipboard = (text: any) => {
    const tmp = document.createElement('input')
    tmp.value = text
    document.body.appendChild(tmp)
    tmp.select()
    document.execCommand('copy')
    tmp.remove()
    message.success({
      type: 'success',
      content: translate('textPopular.copied'),
    })
  }

  return {
    copyToClipboard,
    getLabelCategory,
    translate,
    lang: Language?.locale || 'vn',
  }
}

export default useLanguage
