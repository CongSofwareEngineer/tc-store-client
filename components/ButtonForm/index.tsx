import { Form } from 'antd'
import React from 'react'
import PrimaryButton from '../PrimaryButton'
import SecondButton from '../SecondButton'
import useLanguage from '@/hook/useLanguage'
import useModal from '@/hook/useModal'
import useMedia from '@/hook/useMedia'
import useDrawer from '@/hook/useDrawer'
type ButtonFormType = {
  loading?: boolean
  disableClose?: boolean
  titleSubmit?: string
  titleClose?: string
  className?: string
}
const ButtonForm = ({
  loading,
  disableClose = false,
  titleSubmit = '',
  className = '',
}: ButtonFormType) => {
  const { translate } = useLanguage()
  const { closeModal } = useModal()
  const { isMobile } = useMedia()
  const { closeDrawer } = useDrawer()

  return (
    <div
      className={`w-full flex justify-center items-center gap-4 mt-2 ${className}`}
    >
      <Form.Item>
        <PrimaryButton
          className="w-[150px]"
          loading={loading}
          htmlType="submit"
        >
          {titleSubmit || translate('cart.payment')}
        </PrimaryButton>
      </Form.Item>
      {!disableClose && (
        <SecondButton
          disabled={loading}
          className="w-[150px]"
          onClick={() => (isMobile ? closeDrawer() : closeModal())}
        >
          {titleClose || translate('common.close')}
        </SecondButton>
      )}
    </div>
  )
}

export default ButtonForm
