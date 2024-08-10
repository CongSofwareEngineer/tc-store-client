import { DatePicker } from 'antd'
import React from 'react'
import dayjs from 'dayjs'
const DATE_START = dayjs(new Date(Date.now()).setDate(new Date().getDate() - 1))
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY']

type Props = {
  dateStart?: string | null
  onChange: (param?: any) => any
  className?: string
  allowClear?: boolean
}

const MyDatePicker = ({
  className,
  onChange,
  dateStart = null,
  allowClear = true,
}: Props) => {
  return (
    <DatePicker
      onChange={(e) => onChange(e)}
      defaultValue={dayjs(dateStart || DATE_START, 'DD/MM/YY')}
      className={className}
      format={dateFormatList}
      lang="vn"
      allowClear={allowClear}
    />
  )
}

export default MyDatePicker
