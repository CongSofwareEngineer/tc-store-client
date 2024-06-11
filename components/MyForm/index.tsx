import { Form, FormProps } from 'antd'
import React from 'react'
import styled from 'styled-components'

const FormCustom = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 22px;
  .ant-form-item-margin-offset {
    margin-bottom: 0px !important;
  }
  .ant-form-item-explain-error {
    margin-bottom: 10px;
  }
`
type FormPropsType = {
  children?: React.ReactNode | null
  formData?: Record<string, any>
} & FormProps
const MyForm = ({ formData, children, ...props }: FormPropsType) => {
  return (
    <FormCustom initialValues={formData} {...props}>
      {children}
    </FormCustom>
  )
}

export default MyForm
