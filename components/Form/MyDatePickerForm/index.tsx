import React from 'react'
import { Form } from 'antd'
import MyDatePicker from '@/components/MyDatePicker'

type InputFormType = {
  label?: string
  name?: string
  message?: string
  classFromItem?: string
  disabled?: boolean
  defaultValue?: any
  noPaddingBottom?: boolean
}

const MyDatePickerForm = ({
  classFromItem = '',
  disabled = false,
  label = '',
  name = '',
  defaultValue,
  noPaddingBottom = false,
}: InputFormType) => {
  return (
    <Form.Item
      label={label}
      name={name}
      className={`form-item-date-picker ${noPaddingBottom ? 'no-padding-bottom' : 'padding-bottom'} ${classFromItem}`}
    >
      <MyDatePicker defaultValue={defaultValue} disabled={disabled} />
    </Form.Item>
  )
}

export default MyDatePickerForm
