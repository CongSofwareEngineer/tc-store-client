import { DatePicker } from 'antd'
import moment from 'moment'
import React from 'react'
import dayjs from 'dayjs'

const DATE_START = moment(Date.now()).add(-7, 'days').format('YYYY-MM-DD')
const { RangePicker } = DatePicker

type Props = {
  dateStart?: string | null
  onChange: (param?: any) => any
  className?: string
}
const MyRangePicker = ({ className, onChange, dateStart = null }: Props) => {
  return (
    <RangePicker
      className={`md:min-w-[230] min-w-full ${className}`}
      defaultValue={[dayjs(dateStart || DATE_START, 'YYYY-MM-DD'), dayjs(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD')]}
      defaultPickerValue={[
        dayjs(dateStart || DATE_START, 'YYYY-MM-DD'),
        dayjs(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD'),
      ]}
      onChange={(_, dateString) => {
        onChange(dateString)
      }}
    />
  )
}

export default MyRangePicker
