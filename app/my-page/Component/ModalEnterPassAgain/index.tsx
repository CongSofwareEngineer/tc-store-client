import MyInput from '@/components/MyInput'
import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import { encryptData } from '@/utils/crypto'
import { Button } from 'antd'
import React, { useState, useMemo } from 'react'

const ModalEnterPassAgain = ({ callBack }: { callBack: () => void }) => {
  const { translate } = useLanguage()
  const { userData } = useUserData()

  const [passAgain, setPassAgain] = useState('')

  const isValidPass = useMemo(() => {
    return !(userData?.pass === encryptData(passAgain))
  }, [passAgain, userData])

  return (
    <div className='flex flex-col gap-2 justify-between'>
      <p className='text-medium text-center font-bold'>
        {translate('textPopular.enterPassToContinue')}
      </p>
      <div className='flex flex-col gap-2 w-full'>
        <div>{translate('userDetail.pass')} :</div>
        <MyInput
          type='password'
          value={passAgain}
          onChangeText={(e) => setPassAgain(e?.toString() || '')}
        />
        <span className='text-xs text-red-600 h-4'>
          {isValidPass && translate('warning.inValidPassWordAgain')}
        </span>
        <div className='flex justify-center w-full mt-2'>
          <Button onClick={callBack} disabled={isValidPass} className='w-full'>
            {translate('common.ok')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ModalEnterPassAgain
