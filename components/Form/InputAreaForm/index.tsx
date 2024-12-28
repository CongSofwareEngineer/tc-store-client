import MyInput from '@/components/MyInput'
import useLanguage from '@/hook/useLanguage'
import { Form } from 'antd'
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
  .ant-form-item-control {
    flex: none !important;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 31px !important;
    .ant-form-item-explain-error {
      margin-bottom: 0px !important;
    }
    .ant-form-item-label {
      padding: 0px !important;
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
  rows?: number
  className?: string
  validator?: (value?: any) => string | null
}

const InputAreaForm = ({
  label,
  name,
  message,
  required = false,
  rows = 3,
  validator = () => '',
  className = '',
}: InputFormType) => {
  const { translate } = useLanguage()
  return (
    <FormItem
      className={className}
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
              return Promise.reject(new Error(message || translate('errors.empty')))
            }

            return Promise.resolve(null)
          },
        },
      ]}
    >
      <MyInput type={'area'} rows={rows} className='w-full' />
    </FormItem>
  )
}
export default InputAreaForm
