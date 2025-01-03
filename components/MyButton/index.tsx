import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'

export type ButtonType = 'default' | 'primary' | 'dashed' | 'link' | 'text'

type MyButton = {
  className?: string
  children?: React.ReactNode
  onClick?: () => any
  loading?: boolean
  type?: ButtonType
}
const MyButton = ({
  className,
  children,
  onClick,
  loading = false,
  type = 'default',
}: MyButton) => {
  const handleClick = async () => {
    if (!loading) {
      onClick && (await onClick())
    }
  }

  return (
    <button
      className={`button-${type} flex justify-center items-center gap-2 ${className}`}
      onClick={handleClick}
    >
      {loading && <LoadingOutlined />}
      <span>
        {' '}
        {children} {children}
      </span>
    </button>
  )
}
export default MyButton
