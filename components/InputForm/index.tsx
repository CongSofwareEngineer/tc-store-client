import useLanguage from '@/hook/useLanguage'
import { Form, Input } from 'antd'
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
`
type InputFormType = {
  label?: string
  name?: string
  message?: string
  required?: boolean
  isPass?: boolean
  validator?: (value?: any) => string | null
}
const InputForm = ({
  label,
  name,
  message,
  required = false,
  isPass = false,
  validator = () => '',
}: InputFormType) => {
  const { translate } = useLanguage()
  return (
    <FormItem
      label={label}
      name={name}
      rules={[
        {
          required: required,
          validator: (_, value) => {
            const errorCheck = validator(value)
            if (errorCheck) {
              return Promise.reject(new Error(errorCheck))
            }
            if (!value) {
              return Promise.reject(
                new Error(message || translate('errors.empty'))
              )
            }

            return Promise.resolve(null)
          },
        },
      ]}
    >
      {isPass ? (
        <Input.Password className="w-full" />
      ) : (
        <Input className="w-full" />
      )}
    </FormItem>
  )
}

export default InputForm
