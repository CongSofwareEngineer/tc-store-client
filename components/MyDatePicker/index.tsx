import { DatePicker } from 'antd'
import React from 'react'
import { formatDateTime } from '@/utils/momentFunc'
const DATE_START = formatDateTime(Date.now())
// const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY']

type Props = {
  onChange?: (param?: any) => any
  className?: string
  allowClear?: boolean
  disabled?: boolean
  defaultValue?: any
}

const MyDatePicker = ({
  className,
  onChange = () => {},
  allowClear = true,
  disabled = false,
  defaultValue = DATE_START,
}: Props) => {
  return (
    <DatePicker
      disabled={disabled}
      onChange={(e) => onChange(e)}
      defaultValue={defaultValue ? formatDateTime(defaultValue, 'DD/MM/YY') : null}
      className={`w-full ${className}`}
      format={'DD/MM/YY'}
      lang='vn'
      allowClear={allowClear}
    />
  )
}

export default MyDatePicker
