import { Checkbox, Form } from 'antd'
import React from 'react'
import styled from 'styled-components'
const FormItem = styled(Form.Item)`
  margin-bottom: 24px !important;
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
  classFromItem?: string
  validator?: (value?: any) => string | null
}

const CheckBoxForm = ({ label, name, classFromItem = '' }: InputFormType) => {
  return (
    <FormItem className={classFromItem} label={label} name={name}>
      <Checkbox />
    </FormItem>
  )
}

export default CheckBoxForm
