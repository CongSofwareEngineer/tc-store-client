import React from 'react'
import { Input, InputProps } from '../ui/input'
type Props = {
  disabled?: boolean
} & InputProps
const MyInput = ({ ...props }: Props) => {
  return <Input {...props} />
}

export default MyInput
