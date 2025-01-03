import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'
type MyButton = {
  className?: string
  children?: React.ReactNode
  onClick?: () => any
  loading?: boolean
}
const MyButton = ({ className, children, onClick, loading = false }: MyButton) => {
  const handleClick = () => {
    if (!loading) {
      onClick && onClick()
    }
  }
  return (
    <button
      className={`my-button flex justify-center items-center gap-2 ${className}`}
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
