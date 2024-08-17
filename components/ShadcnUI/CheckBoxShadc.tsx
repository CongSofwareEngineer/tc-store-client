import React from 'react'
import { Checkbox } from '../ui/checkbox'
type Props = {
  checked?: boolean
  onChange?: (value?: any) => void
  children?: React.ReactNode
}
const CheckBoxShadc = ({ checked = false, children, onChange }: Props) => {
  return (
    <div onClick={onChange} className="flex items-center gap-2 cursor-pointer">
      <Checkbox checked={checked} />
      {children}
    </div>
  )
}

export default CheckBoxShadc
