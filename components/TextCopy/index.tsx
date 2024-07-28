import { copyToClipboard } from '@/utils/functions'
import { CopyOutlined } from '@ant-design/icons'
import React from 'react'
type Props = {
  textView?: string
  value?: string
  isTel?: boolean
}
const TextCopy = ({ textView = '', value = '', isTel = false }: Props) => {
  return (
    <div className="flex gap-2">
      {isTel ? (
        <a href={`tel:${value || textView}`}>{value || textView}</a>
      ) : (
        <span>{value || textView}</span>
      )}
      <CopyOutlined onClick={() => copyToClipboard(value || textView)} />
    </div>
  )
}

export default TextCopy
