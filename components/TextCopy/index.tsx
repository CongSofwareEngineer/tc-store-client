import { copyToClipboard } from '@/utils/functions'
import { CopyOutlined } from '@ant-design/icons'
import Link from 'next/link'
import React from 'react'
type Props = {
  textView?: string
  value?: string
  isLink?: boolean
}
const TextCopy = ({ textView = '', value = '', isLink = false }: Props) => {
  return (
    <div className="flex gap-2">
      {isLink ? (
        <Link target="_blank" href={value || textView}>
          {value || textView}
        </Link>
      ) : (
        <span>{value || textView}</span>
      )}
      <CopyOutlined onClick={() => copyToClipboard(value || textView)} />
    </div>
  )
}

export default TextCopy
