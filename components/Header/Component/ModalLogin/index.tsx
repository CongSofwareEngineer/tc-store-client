import useLanguage from '@/hook/useLanguage'
import useModal from '@/hook/useModal'
import { Input } from 'antd'
import React, { useState } from 'react'
type FieldType = {
  username?: string
  password?: string
  remember?: string
}

const ModalLogin: React.FC = () => {
  const { openModal } = useModal()
  const { translate } = useLanguage()

  const [sdt, setSDT] = useState('')
  const [pass, setPass] = useState('')

  return (
    <div className="w-full flex flex-col gap-2 justify-start ">
      <div className="text-medium uppercase text-center w-full">
        {translate('common.login')}
      </div>
      <div className="w-full ">{translate('userDetail.sdt')} :</div>
      <Input className="w-full" />
    </div>
  )
}

export default ModalLogin
