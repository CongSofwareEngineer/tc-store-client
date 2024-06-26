import { Form } from 'antd'
import React from 'react'
import PrimaryButton from '../PrimaryButton'
import SecondButton from '../SecondButton'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'

type ButtonFormType = {
  loading?: boolean
  disableClose?: boolean
  titleSubmit?: string
  titleClose?: string
  className?: string
  classNameItem?: string
  classBtnSubmit?: string
  classBtnCancel?: string
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
}: ButtonFormType) => {
  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()

  return (
    <div
      className={`w-full flex justify-center items-center gap-4 mt-2 ${className}`}
    >
      <Form.Item className={classNameItem}>
        <PrimaryButton
          className={`w-[150px] ${classBtnSubmit}`}
          loading={loading}
          htmlType="submit"
        >
          {titleSubmit || translate('cart.payment')}
        </PrimaryButton>
      </Form.Item>
      {!disableClose && (
        <SecondButton
          disabled={loading}
          className={`w-[150px] ${classBtnCancel}`}
          onClick={closeModalDrawer}
        >
          {titleClose || translate('common.close')}
        </SecondButton>
      )}
    </div>
  )
}

export default ButtonForm
