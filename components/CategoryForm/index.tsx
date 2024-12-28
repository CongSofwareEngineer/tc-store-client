import { Form } from 'antd'
import React from 'react'
import styled from 'styled-components'
import MySelect from '../MySelect'
import { useLanguage } from '@/zustand/useLanguage'
import { useCategoryMenu } from '@/zustand/useCategoryMenu'
const FormItem = styled(styled(Form.Item)<{ $configInput: any }>``)`
  margin-bottom: 24px !important;
  width: 100% !important;
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
type Props = {
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
  disabled?: boolean
}

const CategoryForm = ({
  label,
  name,
  classFromItem = '',
  configInput = {},
  disabled = false,
}: Props) => {
  const { language } = useLanguage()
  const { categoryMenu } = useCategoryMenu()

  const getMenu = () => {
    const data = categoryMenu.map((e) => {
      return {
        label: e?.lang?.[language.locale || 'vn'].toString() || '',
        value: e.keyName.toString() || '',
        name: e.keyName,
      }
    })
    return [
      {
        label: 'All',
        value: 'all',
      },
      ...data,
    ]
  }

  return categoryMenu ? (
    <FormItem $configInput={configInput} className={classFromItem} label={label} name={name}>
      <MySelect disabled={disabled} option={getMenu()} className='w-full' />
    </FormItem>
  ) : (
    <></>
  )
}

export default CategoryForm
