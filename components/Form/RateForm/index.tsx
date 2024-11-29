import { Form, Rate } from 'antd'
import React from 'react'
import styled from 'styled-components'
const FormItem = styled(styled(Form.Item)<{ $configInput: any }>``)`
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
  .ant-input {
    border-radius: ${(props) => props.$configInput?.borderRadius || '8px'};
    border: ${(props) => (props.$configInput.noBorder ? 0 : 1)} solid #d9d9d9 !important;
  }
`
type RateFormType = {
  label?: string
  name?: string
  message?: string
  required?: boolean
  isPass?: boolean
  classFromItem?: string
  validator?: (value?: any) => string | null
  configInput?: {
    noBorder?: boolean
    borderRadius?: number
  }
  typeBtn?: 'string' | 'number' | 'area'
  disable?: boolean
}

const RateForm = ({ label, name, classFromItem = '', configInput = {}, disable = false }: RateFormType) => {
  return (
    <FormItem $configInput={configInput} className={classFromItem} label={label} name={name}>
      <Rate disabled={disable} className='w-full' />
    </FormItem>
  )
}

export default RateForm
