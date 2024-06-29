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
  required?: boolean
  isPass?: boolean
  classFromItem?: string
  validator?: (value?: any) => string | null
}
const InputForm = ({
  label,
  name,
  message,
  required = false,
  isPass = false,
  validator = () => '',
  classFromItem = '',
}: InputFormType) => {
  const { translate } = useLanguage()
  return (
    <FormItem
      className={classFromItem}
      label={label}
      name={name}
      rules={[
        {
          required: required,
          validator: (_, value) => {
            if (!required) {
              return Promise.resolve(null)
            }
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
