import React from 'react'
import styled from 'styled-components'
import { Form } from 'antd'
import MyDatePicker from '@/components/MyDatePicker'

const FormItem = styled(Form.Item)`
  margin-bottom: 0px !important;
  padding-bottom: 17px !important;
  .ant-form-item-row {
    flex-direction: column !important;
    .ant-form-item-label {
      text-align: start !important;
    }
  }

  @media screen and (max-width: 768px) {
    .ant-form-item {
      .ant-form-item-explain-error {
        margin-bottom: 0px !important;
      }
    }
    margin-bottom: 0px !important;
    .ant-form-item-explain-error {
      margin-bottom: 0px !important;
    }
    .ant-form-item-label {
      padding: 0px !important;
    }
    .ant-col {
      min-height: unset !important;
    }
  }
  @media screen and (max-width: 568px) {
    margin-bottom: 0px !important;
    .ant-form-item-explain-error {
      margin-bottom: 0px !important;
    }
    .ant-form-item-label {
      padding: 0px !important;
    }
  }
`

type InputFormType = {
  label?: string
  name?: string
  message?: string
  classFromItem?: string
  disabled?: boolean
  defaultValue?: any
}

const MyDatePickerForm = ({
  classFromItem = '',
  disabled = false,
  label = '',
  name = '',
  defaultValue,
}: InputFormType) => {
  return (
    <FormItem label={label} name={name} className={classFromItem}>
      <MyDatePicker defaultValue={defaultValue} disabled={disabled} />
    </FormItem>
  )
}

export default MyDatePickerForm
