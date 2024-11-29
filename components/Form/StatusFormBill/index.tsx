import MySelect from '@/components/MySelect'
import { FILTER_BILL } from '@/constant/app'
import useLanguage from '@/hook/useLanguage'
import { Form } from 'antd'
import React from 'react'
import styled from 'styled-components'

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

const StatusFormBill = ({ label, name, classFromItem = '', configInput = {}, disabled = false }: Props) => {
  const { translate } = useLanguage()

  const getStatus = (key: string) => {
    switch (key) {
      case FILTER_BILL.Processing:
        return translate('myBill.processing')

      case FILTER_BILL.Delivering:
        return translate('myBill.delivering')

      case FILTER_BILL.DeliverySuccess:
        return translate('myBill.deliverySuccess')

      case FILTER_BILL.Canceled:
        return translate('common.cancelOrder')

      default:
        return translate('textPopular.all')
    }
  }

  const menu = [
    {
      label: getStatus(FILTER_BILL.All),
      value: FILTER_BILL.All,
    },
    {
      label: getStatus(FILTER_BILL.DeliverySuccess),
      value: FILTER_BILL.DeliverySuccess,
    },
    {
      label: getStatus(FILTER_BILL.Delivering),
      value: FILTER_BILL.Delivering,
    },
    {
      label: getStatus(FILTER_BILL.Processing),
      value: FILTER_BILL.Processing,
    },
    {
      label: getStatus(FILTER_BILL.Canceled),
      value: FILTER_BILL.Canceled,
    },
  ]
  return (
    <FormItem $configInput={configInput} className={classFromItem} label={label} name={name}>
      <MySelect disabled={disabled} option={menu} className='w-full' />
    </FormItem>
  )
}

export default StatusFormBill
