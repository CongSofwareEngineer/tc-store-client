import { Form, FormProps } from 'antd'
import React from 'react'
import styled from 'styled-components'

const FormCustom = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .ant-form-item-margin-offset {
    margin-bottom: 0px !important;
  }
  .ant-form-item-explain-error {
    margin-bottom: 10px;
  }

  @media screen and (max-width: 768px) {
    gap: 0px;
  }
`
type FormPropsType = {
  children?: React.ReactNode | null
  formData?: Record<string, any> | null
} & FormProps
const MyForm = ({ formData, children, ...props }: FormPropsType) => {
  return formData ? (
    <FormCustom initialValues={formData} {...props}>
      {children}
    </FormCustom>
  ) : (
    <></>
  )
}

export default MyForm
