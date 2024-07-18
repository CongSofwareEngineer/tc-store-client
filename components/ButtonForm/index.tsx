import { Form } from 'antd'
import React from 'react'
import PrimaryButton from '../PrimaryButton'
import SecondButton from '../SecondButton'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import styled from 'styled-components'
const FormItem = styled(Form.Item)`
  .ant-form-item-row {
    width: 100%;
  }
`
type ButtonFormType = {
  loading?: boolean
  disableClose?: boolean
  titleSubmit?: string
  titleClose?: string
  className?: string
  classNameItem?: string
  classBtnSubmit?: string
  classBtnCancel?: string
  widthBtnSubmit?: string
  widthBtnCancel?: string
  disabledSubmit?: boolean
}
const ButtonForm = ({
  loading,
  disableClose = false,
  titleSubmit = '',
  className = '',
  titleClose = '',
  classBtnSubmit = '',
  classBtnCancel = '',
  classNameItem = '',
  widthBtnSubmit = '',
  widthBtnCancel = '',
  disabledSubmit = false,
}: ButtonFormType) => {
  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()

  return (
    <div
      className={`w-full flex justify-center items-center gap-4 mt-2 ${className}`}
    >
      <FormItem className={`flex flex-1 ${classNameItem}`}>
        <PrimaryButton
          disabled={disabledSubmit}
          className={`w-full m-auto ${classBtnSubmit}`}
          widthBtn={widthBtnSubmit || '100%'}
          loading={loading}
          htmlType="submit"
        >
          {titleSubmit || translate('cart.payment')}
        </PrimaryButton>
      </FormItem>
      {!disableClose && (
        <SecondButton
          disabled={loading}
          className={`flex flex-1 ${classBtnCancel}`}
          onClick={closeModalDrawer}
          widthBtn={widthBtnCancel || '150px'}
        >
          {titleClose || translate('common.close')}
        </SecondButton>
      )}
    </div>
  )
}

export default ButtonForm
